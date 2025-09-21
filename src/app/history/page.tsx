"use client";

import { useState, useEffect } from "react";
import { History, FileText, Calendar, Trash2, Eye, EyeOff, Copy, Check } from "lucide-react";
import { supabase, TranscriptRecord } from "@/lib/supabase";
import Link from "next/link";

export default function HistoryPage() {
  const [records, setRecords] = useState<TranscriptRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const { data, error } = await supabase
        .from("transcripts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching history:", error);
      } else {
        setRecords(data || []);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this record?")) return;

    try {
      const { error } = await supabase
        .from("transcripts")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting record:", error);
        alert("Failed to delete record");
      } else {
        setRecords(records.filter(record => record.id !== id));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to delete record");
    }
  };

  const handleCopy = async (summary: string, id: string) => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-300">Loading your history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <History className="w-8 h-8 mr-3 text-purple-400" />
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Your History
            </h1>
          </div>
          <p className="text-gray-300">
            All your saved lecture summaries in one place
          </p>
        </div>

        {/* Records */}
        {records.length === 0 ? (
          <div className="text-center py-16">
            <FileText className="w-16 h-16 mx-auto mb-4 text-gray-500" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No summaries yet</h3>
            <p className="text-gray-500 mb-6">
              Start by creating your first lecture summary!
            </p>
            <Link
              href="/"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center space-x-2"
            >
              <span>Create Summary</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {records.map((record) => (
              <div key={record.id} className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {record.title || "Untitled Summary"}
                    </h3>
                    <div className="flex items-center text-sm text-gray-400 space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(record.created_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FileText className="w-4 h-4" />
                        <span>{record.transcript.length} characters</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleCopy(record.summary, record.id)}
                      className="p-2 bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl hover:bg-white/20 rounded-lg transition-colors"
                      title="Copy summary"
                    >
                      {copiedId === record.id ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                    <button
                      onClick={() => toggleExpanded(record.id)}
                      className="p-2 bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl hover:bg-white/20 rounded-lg transition-colors"
                      title={expandedId === record.id ? "Collapse" : "Expand"}
                    >
                      {expandedId === record.id ? (
                        <EyeOff className="w-4 h-4 text-gray-400" />
                      ) : (
                        <Eye className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(record.id)}
                      className="p-2 bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl hover:bg-red-500/20 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </div>

                {/* Preview */}
                <div className="text-gray-300 text-sm mb-4">
                  {record.summary.substring(0, 200)}
                  {record.summary.length > 200 && "..."}
                </div>

                {/* Expanded Content */}
                {expandedId === record.id && (
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="grid lg:grid-cols-2 gap-6">
                      {/* Transcript */}
                      <div>
                        <h4 className="font-semibold text-white mb-3 flex items-center">
                          <FileText className="w-4 h-4 mr-2 text-blue-400" />
                          Original Transcript
                        </h4>
                        <div className="max-h-64 overflow-y-auto p-3 bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-lg">
                          <pre className="text-gray-300 whitespace-pre-wrap text-xs leading-relaxed">
                            {record.transcript}
                          </pre>
                        </div>
                      </div>

                      {/* Summary */}
                      <div>
                        <h4 className="font-semibold text-white mb-3 flex items-center">
                          <FileText className="w-4 h-4 mr-2 text-purple-400" />
                          AI Summary
                        </h4>
                        <div className="max-h-64 overflow-y-auto p-3 bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-lg">
                          <div 
                            className="text-gray-300 text-xs leading-relaxed"
                            dangerouslySetInnerHTML={{
                              __html: record.summary
                                .replace(/\n/g, '<br>')
                                .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
                                .replace(/\*(.*?)\*/g, '<em class="text-purple-300">$1</em>')
                                .replace(/^(#{1,6})\s+(.+)$/gm, (match, hashes, content) => {
                                  const level = hashes.length;
                                  return `<h${level} class="text-white font-bold text-xs mt-3 mb-1">${content}</h${level}>`;
                                })
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        {records.length > 0 && (
          <div className="mt-12">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Your Statistics</h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-purple-400 mb-1">
                    {records.length}
                  </div>
                  <div className="text-sm text-gray-400">Total Summaries</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-400 mb-1">
                    {Math.round(records.reduce((acc, record) => acc + record.transcript.length, 0) / 1000)}k
                  </div>
                  <div className="text-sm text-gray-400">Characters Processed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400 mb-1">
                    {records.length > 0 ? Math.round(records.reduce((acc, record) => acc + record.summary.length, 0) / records.length) : 0}
                  </div>
                  <div className="text-sm text-gray-400">Avg Summary Length</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}