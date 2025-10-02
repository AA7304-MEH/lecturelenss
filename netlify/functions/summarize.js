exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Allow-Methods': 'POST, OPTIONS' }, body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: { 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const json = (status, body) => ({ statusCode: status, headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }, body: JSON.stringify(body) });

  try {
    const { transcript } = JSON.parse(event.body || '{}');
    const text = typeof transcript === 'string' ? transcript.trim() : '';
    if (!text) return json(400, { error: 'Transcript is required' });

    // Prefer Gemini if available
    const gKey = process.env.GOOGLE_AI_API_KEY;
    if (gKey) {
      const endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';
      const prompt = `Summarize the following lecture into structured, study-ready notes with headings and bullet points.\n\nTranscript:\n${text.slice(0, 8000)}`;
      const res = await fetch(`${endpoint}?key=${encodeURIComponent(gKey)}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: prompt }] }] }) });
      const rText = await res.text(); let data = {}; try { data = JSON.parse(rText); } catch {}
      if (!res.ok) return json(res.status || 500, { error: 'Gemini API error', details: data || rText });
      const summary = data?.candidates?.[0]?.content?.parts?.map(p => p.text).join('\n') || '';
      if (!summary) return json(502, { error: 'No summary returned from Gemini', raw: data || rText });
      return json(200, { summary });
    }

    // Fallback to Hugging Face with chunking
    const hfKey = process.env.HUGGINGFACE_API_KEY;
    if (hfKey) {
      const chunkText = (str, size) => { const chunks = []; for (let i = 0; i < str.length; i += size) chunks.push(str.slice(i, i + size)); return chunks; };
      const CHUNK_SIZE = 3000;
      const chunks = chunkText(text, CHUNK_SIZE).slice(0, 20);
      const summarizeChunk = async (content) => {
        const model = 'sshleifer/distilbart-cnn-12-6';
        const url = `https://api-inference.huggingface.co/models/${model}?wait_for_model=true`;
        const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${hfKey}` }, body: JSON.stringify({ inputs: content }) });
        const txt = await res.text(); let data = {}; try { data = JSON.parse(txt); } catch {}
        if (!res.ok) throw new Error(`HF ${res.status}: ${txt}`);
        const cand = Array.isArray(data) ? data[0] : data; const s = cand?.summary_text || cand?.generated_text || '';
        if (!s) throw new Error('HF: empty summary');
        return s;
      };
      const partials = [];
      for (const c of chunks) {
        try { partials.push(await summarizeChunk(c)); }
        catch (e1) { await new Promise(r => setTimeout(r, 1200)); partials.push(await summarizeChunk(c)); }
      }
      const merged = partials.join('\n');
      const final = await summarizeChunk(`Combine and refine these notes into a concise, well-structured summary with headings and bullet points.\n\n${merged.slice(0, 5000)}`);
      return json(200, { summary: final });
    }

    return json(500, { error: 'No provider configured: set GOOGLE_AI_API_KEY or HUGGINGFACE_API_KEY' });
  } catch (error) {
    return json(500, { error: 'Failed to generate summary', details: String(error && (error.message || error)) });
  }
};