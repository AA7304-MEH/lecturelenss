import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function POST(request: NextRequest) {
  try {
    const { transcript } = await request.json();

    if (!transcript || typeof transcript !== 'string') {
      return NextResponse.json(
        { error: 'Transcript is required and must be a string' },
        { status: 400 }
      );
    }

    if (!process.env.GOOGLE_AI_API_KEY || process.env.GOOGLE_AI_API_KEY === 'your_google_ai_api_key_here') {
      return NextResponse.json(
        { error: 'Google AI API key not configured. Please set GOOGLE_AI_API_KEY environment variable.' },
        { status: 500 }
      );
    }

    // Initialize Google AI only when we have a valid API key
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `You are an expert academic assistant. Please take the following lecture transcript and provide:

1. A complete, well-formatted summary with key topics, main points, and important definitions
2. Use clear headings, bullet points, and section breaks for readability
3. Organize the content in a logical, hierarchical structure
4. Highlight key concepts, terms, and important information
5. Make it easy to study from and review

Please format your response using markdown syntax for better readability.

Transcript:
${transcript}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();

    return NextResponse.json({ summary });
  } catch (error) {
    console.error('Error generating summary:', error);
    return NextResponse.json(
      { error: 'Failed to generate summary' },
      { status: 500 }
    );
  }
}