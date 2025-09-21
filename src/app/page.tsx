"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Brain, Sparkles, FileText, ArrowRight, Mic, Type, Wand2, Star, Zap, BookOpen, Copy, Check, AlertCircle, TrendingUp, Users, Award, Clock, Play, ChevronDown, Lightbulb, Rocket, Shield } from "lucide-react";

export default function Home() {
  const [transcript, setTranscript] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showDemo, setShowDemo] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
    setCharCount(transcript.length);
    
    // Auto-rotate slides
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 4000);
    
    return () => clearInterval(interval);
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

  const demoTranscript = "Today we're going to discuss the fundamentals of machine learning. Machine learning is a subset of artificial intelligence that enables computers to learn and make decisions from data without being explicitly programmed. There are three main types of machine learning: supervised learning, unsupervised learning, and reinforcement learning. Supervised learning uses labeled data to train algorithms, while unsupervised learning finds patterns in unlabeled data. Reinforcement learning involves an agent learning through trial and error by receiving rewards or penalties.";

  const handleDemo = () => {
    setTranscript(demoTranscript);
    setShowDemo(true);
    setTimeout(() => {
      document.querySelector('form')?.requestSubmit();
    }, 1000);
  };

  const scrollToInput = () => {
    document.querySelector('textarea')?.scrollIntoView({ behavior: 'smooth' });
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
      <section className="relative py-12 sm:py-20 lg:py-32 px-4 text-center overflow-hidden">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}>
          <div className="relative mb-8 lg:mb-12">
            <div className="animate-float sparkle glow relative">
              <Brain className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-6 text-purple-400" />
              <div className="absolute -inset-4 bg-purple-500/20 rounded-full blur-xl animate-pulse-slow"></div>
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
            <span className="gradient-text block animate-slide-in-up stagger-1">LectureLens</span>
          </h1>
          
          <div className="mb-6 lg:mb-8">
            <p className="text-lg sm:text-xl lg:text-3xl text-gray-300 mb-4 max-w-4xl mx-auto leading-relaxed animate-slide-in-up stagger-2">
              Transform your lectures into 
              <span className="gradient-text font-bold"> structured notes </span>
              with AI-powered summarization
            </p>
            
            <div className="flex items-center justify-center space-x-3 text-purple-300 mb-8 animate-pulse-slow animate-slide-in-up stagger-3">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-base sm:text-lg lg:text-xl font-medium">Powered by AI</span>
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12 animate-slide-in-up stagger-4">
            <button
              onClick={scrollToInput}
              className="btn-primary text-lg px-8 py-4 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Get Started Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button
              onClick={handleDemo}
              className="btn-secondary text-lg px-8 py-4 group flex items-center"
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Try Demo
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="animate-bounce">
            <ChevronDown className="w-8 h-8 mx-auto text-purple-400 opacity-60" />
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-16">
            <div className="text-center glass-card p-4 rounded-lg group hover:scale-105 transition-all duration-500">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-5 h-5 text-purple-400 mr-2 group-hover:rotate-12 transition-transform" />
                <span className="text-2xl font-bold text-white">10K+</span>
              </div>
              <p className="text-sm text-gray-400">Students Helped</p>
            </div>
            <div className="text-center glass-card p-4 rounded-lg group hover:scale-105 transition-all duration-500">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-5 h-5 text-green-400 mr-2 group-hover:rotate-12 transition-transform" />
                <span className="text-2xl font-bold text-white">98%</span>
              </div>
              <p className="text-sm text-gray-400">Accuracy Rate</p>
            </div>
            <div className="text-center glass-card p-4 rounded-lg group hover:scale-105 transition-all duration-500">
              <div className="flex items-center justify-center mb-2">
                <Clock className="w-5 h-5 text-blue-400 mr-2 group-hover:rotate-12 transition-transform" />
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
      <section id="input-section" className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-8 lg:p-12 relative overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-blue-500/5 animate-pulse-slow"></div>
            
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="flex items-center">
                <div className="relative">
                  <FileText className="w-7 h-7 mr-3 text-purple-400" />
                  <div className="absolute -inset-2 bg-purple-500/20 rounded-full blur-md animate-pulse-slow"></div>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-white">Paste Your Lecture Transcript</h2>
              </div>
              <div className="relative">
                <button
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  className="text-gray-400 hover:text-white transition-colors group"
                >
                  <AlertCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
                {showTooltip && (
                  <div className="tooltip show absolute -top-12 left-1/2 transform -translate-x-1/2 w-64 z-20">
                    Get a transcript by recording your lecture and using your device&apos;s speech-to-text feature
                  </div>
                )}
              </div>
            </div>
            
            {/* Demo Banner */}
            {showDemo && (
              <div className="mb-6 p-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg border border-purple-500/30 animate-slide-in-up">
                <div className="flex items-center">
                  <Play className="w-5 h-5 text-purple-400 mr-2" />
                  <span className="text-purple-300 font-medium">Demo Mode: </span>
                  <span className="text-gray-300">Sample lecture transcript loaded</span>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="relative group">
                <textarea
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Paste your lecture transcript here... Try pasting any text content to see the AI summarization in action!"
                  className={`enhanced-textarea h-64 relative z-10 ${
                    isFocused ? 'ring-4 ring-purple-500/30 scale-[1.02]' : ''
                  } ${
                    showDemo ? 'border-purple-400/50' : ''
                  }`}
                  required
                />
                {/* Textarea Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {isFocused && (
                  <div className="absolute top-4 right-4 text-xs text-purple-400 opacity-70 animate-slide-in-right z-20">
                    <div className="flex items-center">
                      <Sparkles className="w-3 h-3 mr-1" />
                      AI-powered analysis
                    </div>
                  </div>
                )}
                
                {/* Character Progress Bar */}
                {charCount > 0 && (
                  <div className="absolute bottom-4 left-4 right-4 z-20">
                    <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((charCount / 1000) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center space-x-4">
                  <p className={`char-counter ${charCount > 0 ? 'active' : ''} flex items-center`}>
                    <span className="font-semibold">{charCount.toLocaleString()}</span> 
                    <span className="ml-1">characters</span>
                    {charCount > 500 && (
                      <span className="ml-2 text-green-400 text-xs flex items-center">
                        <Check className="w-3 h-3 mr-1" />
                        Good length
                      </span>
                    )}
                  </p>
                  <div className="h-4 w-px bg-gray-600"></div>
                  <p className="text-sm text-gray-400 flex items-center">
                    <Brain className="w-4 h-4 mr-1" />
                    Powered by Google Gemini AI
                  </p>
                </div>
                
                <div className="flex items-center space-x-3">
                  {!showDemo && (
                    <button
                      type="button"
                      onClick={handleDemo}
                      className="btn-secondary text-sm px-4 py-2 flex items-center group"
                    >
                      <Play className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform" />
                      Try Demo
                    </button>
                  )}
                  
                  <button
                    type="submit"
                    disabled={!transcript.trim() || isLoading}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-3 group relative overflow-hidden"
                  >
                    {isLoading ? (
                      <>
                        <div className="loading-spinner" />
                        <span>Generating Summary...</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                      </>
                    ) : (
                      <>
                        <span>Generate Summary</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Why Choose LectureLens?
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Discover the features that make LectureLens the ultimate tool for students and professionals
          </p>
          
          {/* Rotating Feature Showcase */}
          <div className="relative mb-16">
            <div className="glass-card p-8 lg:p-12 text-center min-h-[300px] flex flex-col justify-center">
              {currentSlide === 0 && (
                <div className="animate-slide-in-up">
                  <Brain className="w-16 h-16 mx-auto mb-6 text-purple-400 animate-pulse-slow" />
                  <h3 className="text-2xl font-bold mb-4 text-white">AI-Powered Intelligence</h3>
                  <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
                    Our advanced AI understands context, identifies key concepts, and creates structured summaries that capture the essence of your lectures with remarkable accuracy.
                  </p>
                </div>
              )}
              {currentSlide === 1 && (
                <div className="animate-slide-in-up">
                  <Rocket className="w-16 h-16 mx-auto mb-6 text-blue-400 animate-pulse-slow" />
                  <h3 className="text-2xl font-bold mb-4 text-white">Lightning Fast Processing</h3>
                  <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
                    Transform hours of lecture content into organized notes in seconds. Our optimized AI processes even the longest transcripts quickly and efficiently.
                  </p>
                </div>
              )}
              {currentSlide === 2 && (
                <div className="animate-slide-in-up">
                  <Shield className="w-16 h-16 mx-auto mb-6 text-green-400 animate-pulse-slow" />
                  <h3 className="text-2xl font-bold mb-4 text-white">Secure & Private</h3>
                  <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
                    Your academic content is protected with enterprise-grade security. We never store your data permanently and all processing is encrypted.
                  </p>
                </div>
              )}
            </div>
            
            {/* Slide Indicators */}
            <div className="flex justify-center space-x-2 mt-6">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index ? 'bg-purple-500 scale-125' : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-6 group hover:scale-105 transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-300 relative z-10">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-white relative z-10">AI-Powered</h3>
              <p className="text-gray-300 text-sm leading-relaxed relative z-10">Advanced AI summarization using Google Gemini with high accuracy</p>
            </div>
            <div className="glass-card p-6 group hover:scale-105 transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-300 relative z-10">
                <Lightbulb className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-white relative z-10">Smart Analysis</h3>
              <p className="text-gray-300 text-sm leading-relaxed relative z-10">Intelligent content analysis that identifies key concepts and themes</p>
            </div>
            <div className="glass-card p-6 group hover:scale-105 transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-300 relative z-10">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-white relative z-10">Structured Notes</h3>
              <p className="text-gray-300 text-sm leading-relaxed relative z-10">Get organized summaries with key points and definitions</p>
            </div>
            <div className="glass-card p-6 group hover:scale-105 transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-orange-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-300 relative z-10">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-white relative z-10">Instant Results</h3>
              <p className="text-gray-300 text-sm leading-relaxed relative z-10">Get your summary in seconds with lightning-fast processing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              What Students Say
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Join thousands of students who are already transforming their learning experience
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-6 text-center group hover:scale-105 transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
              <div className="flex justify-center mb-4 relative z-10">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
              <p className="text-gray-300 mb-4 italic relative z-10">&quot;This tool saved me hours of note-taking. The summaries are incredibly accurate and well-structured!&quot;</p>
              <div className="flex items-center justify-center space-x-3 relative z-10">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <div className="text-left">
                  <p className="text-purple-400 font-semibold">Sarah</p>
                  <p className="text-gray-500 text-sm">Medical Student</p>
                </div>
              </div>
            </div>
            <div className="glass-card p-6 text-center group hover:scale-105 transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
              <div className="flex justify-center mb-4 relative z-10">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
              <p className="text-gray-300 mb-4 italic relative z-10">&quot;Perfect for my online courses. The structured format makes studying so much easier and more efficient.&quot;</p>
              <div className="flex items-center justify-center space-x-3 relative z-10">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">M</span>
                </div>
                <div className="text-left">
                  <p className="text-blue-400 font-semibold">Mike</p>
                  <p className="text-gray-500 text-sm">Computer Science</p>
                </div>
              </div>
            </div>
            <div className="glass-card p-6 text-center group hover:scale-105 transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
              <div className="flex justify-center mb-4 relative z-10">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
              <p className="text-gray-300 mb-4 italic relative z-10">&quot;Amazing AI technology that actually understands context. Exactly what every student needs for academic success!&quot;</p>
              <div className="flex items-center justify-center space-x-3 relative z-10">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">E</span>
                </div>
                <div className="text-left">
                  <p className="text-pink-400 font-semibold">Emma</p>
                  <p className="text-gray-500 text-sm">Psychology Major</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card p-12 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 animate-pulse-slow"></div>
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-10 left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl animate-float"></div>
              <div className="absolute bottom-10 right-10 w-16 h-16 bg-blue-500/20 rounded-full blur-xl animate-float-delayed"></div>
              <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-pink-500/15 rounded-full blur-lg animate-float"></div>
            </div>
            
            <div className="relative z-10">
              <div className="mb-8">
                <div className="relative inline-block">
                  <Award className="w-16 h-16 mx-auto mb-4 text-yellow-400 animate-pulse-slow" />
                  <div className="absolute -inset-4 bg-yellow-500/20 rounded-full blur-xl animate-pulse-slow"></div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
                  Ready to Transform Your Learning?
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Join thousands of students who are already using LectureLens to excel in their studies and save valuable time
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <button
                  onClick={() => {
                    document.querySelector('#input-section')?.scrollIntoView({ behavior: 'smooth' });
                    setTimeout(() => {
                      document.querySelector('textarea')?.focus();
                    }, 500);
                  }}
                  className="btn-primary text-lg px-8 py-4 group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    Start Summarizing Now
                    <Rocket className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </span>
                </button>
                
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center">
                    <Check className="w-4 h-4 mr-1 text-green-400" />
                    <span>Instant Results</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 mr-1 text-blue-400" />
                    <span>Secure & Private</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
