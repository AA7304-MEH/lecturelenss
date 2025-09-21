"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Brain, Sparkles, FileText, ArrowRight, Mic, Type, Wand2, Star, Zap, BookOpen, Copy, Check, AlertCircle, TrendingUp, Users, Award, Clock } from "lucide-react";

export default function Home() {
  const [transcript, setTranscript] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
    setCharCount(transcript.length);
  }, [transcript]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transcript.trim()) return;

    setIsLoading(true);
    
    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ transcript }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate summary");
      }

      const data = await response.json();
      
      sessionStorage.setItem("transcript", transcript);
      sessionStorage.setItem("summary", data.summary);
      
      router.push("/results");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to generate summary. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Animated background elements with more variety */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-pink-600/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/2 right-10 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-40 right-1/3 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl animate-float-delayed" />
        
        {/* Floating icons */}
        <div className="absolute top-20 right-1/4 animate-float opacity-20">
          <Brain className="w-8 h-8 text-purple-400" />
        </div>
        <div className="absolute bottom-32 left-1/4 animate-float-delayed opacity-15">
          <BookOpen className="w-6 h-6 text-blue-400" />
        </div>
        <div className="absolute top-1/3 left-20 animate-float opacity-10">
          <Sparkles className="w-7 h-7 text-pink-400" />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-20 lg:py-32 px-4 text-center">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}>
          <div className="relative mb-8 lg:mb-12">
            <div className="animate-float sparkle glow">
              <Brain className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-6 text-purple-400" />
            </div>
            <div className="absolute -top-2 -left-2 animate-float-delayed">
              <Star className="w-6 h-6 text-yellow-400 opacity-70" />
            </div>
            <div className="absolute -top-1 -right-1 animate-float">
              <Zap className="w-5 h-5 text-blue-400 opacity-60" />
            </div>
            <div className="absolute -bottom-2 -left-1 animate-float-delayed">
              <Sparkles className="w-4 h-4 text-pink-400 opacity-50" />
            </div>
            <div className="absolute -bottom-1 -right-2 animate-float">
              <Star className="w-4 h-4 text-purple-400 opacity-60" />
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold mb-6 lg:mb-8">
            <span className="gradient-text block">LectureLens</span>
          </h1>
          
          <p className="text-lg sm:text-xl lg:text-3xl text-gray-300 mb-8 lg:mb-12 max-w-4xl mx-auto leading-relaxed">
            Transform your lectures into 
            <span className="gradient-text font-bold"> structured notes </span>
            with AI-powered summarization
          </p>
          
          <div className="flex items-center justify-center space-x-3 text-purple-300 mb-8 lg:mb-16 animate-pulse-slow">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-base sm:text-lg lg:text-xl font-medium">Powered by AI</span>
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-12">
            <div className="text-center glass-card p-4 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-5 h-5 text-purple-400 mr-2" />
                <span className="text-2xl font-bold text-white">10K+</span>
              </div>
              <p className="text-sm text-gray-400">Students Helped</p>
            </div>
            <div className="text-center glass-card p-4 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-5 h-5 text-green-400 mr-2" />
                <span className="text-2xl font-bold text-white">98%</span>
              </div>
              <p className="text-sm text-gray-400">Accuracy Rate</p>
            </div>
            <div className="text-center glass-card p-4 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Clock className="w-5 h-5 text-blue-400 mr-2" />
                <span className="text-2xl font-bold text-white">&lt;30s</span>
              </div>
              <p className="text-sm text-gray-400">Processing Time</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-8 text-center group hover:scale-105 transition-all duration-500">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                <Mic className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">1. Record</h3>
              <p className="text-gray-300 leading-relaxed">Record your lecture using any device or recording app of your choice</p>
            </div>
            <div className="glass-card p-8 text-center group hover:scale-105 transition-all duration-500">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                <Type className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">2. Transcribe</h3>
              <p className="text-gray-300 leading-relaxed">Use your device&apos;s speech-to-text feature to get a transcript</p>
            </div>
            <div className="glass-card p-8 text-center group hover:scale-105 transition-all duration-500">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                <Wand2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">3. Summarize</h3>
              <p className="text-gray-300 leading-relaxed">Paste here and get AI-powered structured notes instantly</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Input Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-8 lg:p-12">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <FileText className="w-7 h-7 mr-3 text-purple-400" />
                <h2 className="text-2xl lg:text-3xl font-bold text-white">Paste Your Lecture Transcript</h2>
              </div>
              <div className="relative">
                <button
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <AlertCircle className="w-5 h-5" />
                </button>
                {showTooltip && (
                  <div className="tooltip show absolute -top-12 left-1/2 transform -translate-x-1/2 w-64">
                    Get a transcript by recording your lecture and using your device&apos;s speech-to-text feature
                  </div>
                )}
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <textarea
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Paste your lecture transcript here... Try pasting any text content to see the AI summarization in action!"
                  className={`enhanced-textarea h-64 ${isFocused ? 'ring-4 ring-purple-500/30' : ''}`}
                  required
                />
                {isFocused && (
                  <div className="absolute top-4 right-4 text-xs text-purple-400 opacity-70">
                    ✨ AI-powered analysis
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center space-x-4">
                  <p className={`char-counter ${charCount > 0 ? 'active' : ''}`}>
                    <span className="font-semibold">{charCount.toLocaleString()}</span> characters
                  </p>
                  <div className="h-4 w-px bg-gray-600"></div>
                  <p className="text-sm text-gray-400 flex items-center">
                    <Brain className="w-4 h-4 mr-1" />
                    Powered by Google Gemini AI
                  </p>
                </div>
                
                <button
                  type="submit"
                  disabled={!transcript.trim() || isLoading}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-3 group"
                >
                  {isLoading ? (
                    <>
                      <div className="loading-spinner" />
                      <span>Generating Summary...</span>
                    </>
                  ) : (
                    <>
                      <span>Generate Summary</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Why Choose LectureLens?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-6 group hover:scale-105 transition-all duration-500">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-300">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-white">AI-Powered</h3>
              <p className="text-gray-300 text-sm leading-relaxed">Advanced AI summarization using Google Gemini with high accuracy</p>
            </div>
            <div className="glass-card p-6 group hover:scale-105 transition-all duration-500">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-300">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-white">Easy to Use</h3>
              <p className="text-gray-300 text-sm leading-relaxed">Simple interface designed for students and professionals</p>
            </div>
            <div className="glass-card p-6 group hover:scale-105 transition-all duration-500">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-300">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-white">Structured Notes</h3>
              <p className="text-gray-300 text-sm leading-relaxed">Get organized summaries with key points and definitions</p>
            </div>
            <div className="glass-card p-6 group hover:scale-105 transition-all duration-500">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-300">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-white">Instant Results</h3>
              <p className="text-gray-300 text-sm leading-relaxed">Get your summary in seconds with lightning-fast processing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            What Students Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-6 text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-4 italic">&quot;This tool saved me hours of note-taking. The summaries are incredibly accurate!&quot;</p>
              <p className="text-purple-400 font-semibold">- Sarah, Medical Student</p>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-4 italic">&quot;Perfect for my online courses. The structured format makes studying so much easier.&quot;</p>
              <p className="text-blue-400 font-semibold">- Mike, Computer Science</p>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-4 italic">&quot;Amazing AI technology and completely free. Exactly what every student needs!&quot;</p>
              <p className="text-pink-400 font-semibold">- Emma, Psychology Major</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card p-12">
            <div className="mb-8">
              <Award className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
                Ready to Transform Your Learning?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of students who are already using LectureLens to ace their studies
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button
                onClick={() => document.querySelector('textarea')?.focus()}
                className="btn-primary text-lg px-8 py-4"
              >
                Start Summarizing Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
