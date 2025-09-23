"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Copy, Save, ArrowLeft, FileText, Sparkles, Check } from "lucide-react";

export default function Results() {
  const [transcript, setTranscript] = useState("");
  const [summary, setSummary] = useState("");
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedTranscript = sessionStorage.getItem("transcript");
    const storedSummary = sessionStorage.getItem("summary");

    if (!storedTranscript || !storedSummary) {
      router.push("/");
      return;
    }

    setTranscript(storedTranscript);
    setSummary(storedSummary);
  }, [router]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transcript,
          summary,
          title: `Lecture Summary - ${new Date().toLocaleDateString()}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save");
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error("Error saving:", error);
      alert("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (!transcript || !summary) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4" />
          <p className="text-gray-300">Loading your summary...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push("/")}
            className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl hover:bg-white/20 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 border border-white/30 mb-4 flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
            Your Summary is Ready!
          </h1>
          <p className="text-gray-300">
            AI-powered analysis of your lecture transcript
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={handleCopy}
            className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl hover:bg-white/20 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 border border-white/30 flex items-center space-x-2"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? "Copied!" : "Copy Summary"}</span>
          </button>
          <button
            onClick={handleSave}
            disabled={saving || saved}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center space-x-2"
          >
            {saving ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                <span>Saving...</span>
              </>
            ) : saved ? (
              <>
                <Check className="w-4 h-4" />
                <span>Saved to History!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save to History</span>
              </>
            )}
          </button>
        </div>

        {/* Two-Panel Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Original Transcript */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl p-6">
            <div className="flex items-center mb-4">
              <FileText className="w-5 h-5 mr-2 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Original Transcript</h2>
            </div>
            <div className="max-h-96 overflow-y-auto p-4 bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-lg">
              <pre className="text-gray-300 whitespace-pre-wrap text-sm leading-relaxed">
                {transcript}
              </pre>
            </div>
            <div className="mt-4 text-sm text-gray-400">
              {transcript.length} characters
            </div>
          </div>

          {/* Right Panel - AI Summary */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl p-6">
            <div className="flex items-center mb-4">
              <Sparkles className="w-5 h-5 mr-2 text-purple-400" />
              <h2 className="text-xl font-semibold text-white">AI-Generated Summary</h2>
            </div>
            <div className="max-h-96 overflow-y-auto p-4 bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-lg">
              <div 
                className="text-gray-300 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: summary
                    .replace(/\n/g, '<br>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em class="text-purple-300">$1</em>')
                    .replace(/^(#{1,6})\s+(.+)$/gm, (match, hashes, content) => {
                      const level = hashes.length;
                      return `<h${level} class="text-white font-bold text-${level === 1 ? 'lg' : level === 2 ? 'base' : 'sm'} mt-4 mb-2">${content}</h${level}>`;
                    })
                }}
              />
            </div>
            <div className="mt-4 text-sm text-gray-400">
              Powered by Google Gemini AI
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-white mb-4">What&apos;s Next?</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
              <div>
                <h4 className="font-semibold text-white mb-2">Study Tips:</h4>
                <ul className="text-left space-y-1">
                  <li>• Review key concepts regularly</li>
                  <li>• Create flashcards from definitions</li>
                  <li>• Practice with example problems</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Share & Export:</h4>
                <ul className="text-left space-y-1">
                  <li>• Copy summary to your notes app</li>
                  <li>• Save to history for future reference</li>
                  <li>• Share with study groups</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}