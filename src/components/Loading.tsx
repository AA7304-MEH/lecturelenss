"use client";

import { Brain } from "lucide-react";

export default function Loading({ message = "Processing..." }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="glass-card p-8 max-w-sm mx-4 text-center">
        <div className="relative mb-6">
          <Brain className="w-16 h-16 mx-auto text-purple-400 animate-pulse glow" />
        </div>
        
        <div className="flex justify-center space-x-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-6 bg-gradient-to-t from-purple-500 to-blue-500 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>

        <h3 className="text-xl font-semibold text-white mb-2">AI Working</h3>
        <p className="text-gray-300">{message}</p>
      </div>
    </div>
  );
}