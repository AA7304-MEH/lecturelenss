# LectureLens - AI Lecture Summarizer

Transform your lectures into structured notes with AI-powered summarization.

## ✨ Features

- **AI-Powered Summarization**: Uses Google Gemini API for intelligent text analysis
- **Easy to Use**: Simple, intuitive interface for students and professionals
- **Clean Interface**: Modern dark theme with glassmorphism effects
- **History Management**: Save and manage your lecture summaries with Supabase
- **Responsive Design**: Works perfectly on desktop and mobile
- **Copy & Share**: Easy copying and sharing of summaries

## 🚀 Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **AI**: Google Gemini API
- **Database**: Supabase
- **Deployment**: Vercel
- **Icons**: Lucide React

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/lecturelens.git
cd lecturelens
npm install
```

### 2. Set Up Google Gemini API (Free)

1. Visit [Google AI Studio](https://aistudio.google.com/)
2. Sign in with your Google account
3. Click "Get API Key" and create a new API key
4. Copy your API key

### 3. Set Up Supabase (Free)

1. Visit [Supabase](https://supabase.com/) and create a free account
2. Create a new project
3. Go to Settings > API
4. Copy your Project URL and anon/public key
5. Go to SQL Editor and run the following query:

```sql
-- Create the transcripts table
CREATE TABLE transcripts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  transcript TEXT NOT NULL,
  summary TEXT NOT NULL,
  title TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE transcripts ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations
CREATE POLICY "Enable all operations for transcripts" ON transcripts
FOR ALL USING (true);
```

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Google Gemini API Key (from step 2)
GOOGLE_AI_API_KEY=your_actual_gemini_api_key_here

# Supabase Configuration (from step 3)
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### 5. Run Locally

```bash
npm run dev
```

Visit `http://localhost:3000` to see your app!

## 🌐 Deploy to Vercel (Free)

### Option 1: Deploy with Git

1. Push your code to GitHub
2. Visit [Vercel](https://vercel.com/)
3. Sign up/in and click "New Project"
4. Import your GitHub repository
5. Add your environment variables in the Vercel dashboard
6. Deploy!

### Option 2: Deploy with Vercel CLI

```bash
npm i -g vercel
vercel
```

Follow the prompts and add your environment variables when prompted.

## 📝 How to Use

1. **Record your lecture** using any recording app
2. **Get a transcript** using your device's speech-to-text feature:
   - **iPhone**: Use the built-in dictation or Voice Memos transcription
   - **Android**: Use Google's Live Transcribe or Recorder app
   - **Computer**: Use tools like Otter.ai, Rev.com, or your OS built-in speech-to-text
3. **Paste the transcript** into LectureLens
4. **Click "Generate Summary"** and wait for the AI magic
5. **Save to history** for future reference

## 🎯 Project Structure

```
lecturelens/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── summarize/route.ts    # Gemini API integration
│   │   │   └── history/route.ts      # Supabase CRUD operations
│   │   ├── history/page.tsx          # History management page
│   │   ├── results/page.tsx          # Results display page
│   │   ├── layout.tsx                # Root layout with navigation
│   │   ├── page.tsx                  # Main landing page
│   │   └── globals.css               # Global styles + dark theme
│   └── lib/
│       └── supabase.ts               # Supabase client configuration
├── database-schema.sql               # Database setup script
├── .env.local                        # Environment variables
└── README.md                         # This file
```

## 🎨 Design Philosophy

- **Academic Focus**: Clean, professional interface suitable for students
- **Accessibility**: High contrast, readable fonts, intuitive navigation
- **Performance**: Optimized for fast loading and smooth interactions
- **Mobile-First**: Responsive design that works on all devices

## 🔒 Privacy & Security

- **No Account Required**: Use the app without signing up
- **Local Storage**: Transcripts are only stored if you choose to save them
- **Secure APIs**: All API calls are encrypted and secure
- **No Tracking**: No analytics or tracking scripts

## 🆓 Free Tier Limits

- **Google Gemini**: 60 requests per minute, generous free quota
- **Supabase**: 50MB database, 2GB bandwidth per month
- **Vercel**: 100GB bandwidth, unlimited deployments

These limits are more than sufficient for personal use and small teams.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🆘 Support

If you encounter any issues:

1. Check that your environment variables are correctly set
2. Ensure your API keys have the necessary permissions
3. Check the browser console for error messages
4. Verify your Supabase database schema is correct

## 🌟 Acknowledgments

- Google Gemini for free AI capabilities
- Supabase for free database hosting
- Vercel for free deployment
- Tailwind CSS for beautiful styling
- Lucide for clean icons

---

**Happy Learning!** 🎓✨