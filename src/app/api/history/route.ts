import { supabase, supabaseConfigValid } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  // Check if Supabase is properly configured
  if (!supabaseConfigValid) {
    return NextResponse.json(
      { error: 'Supabase not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.' },
      { status: 500 }
    );
  }

  try {
    const { data, error } = await supabase
      .from('transcripts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch history' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error fetching history:', error);
    return NextResponse.json(
      { error: 'Failed to fetch history' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  // Check if Supabase is properly configured
  if (!supabaseConfigValid) {
    return NextResponse.json(
      { error: 'Supabase not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.' },
      { status: 500 }
    );
  }

  try {
    const { transcript, summary, title } = await request.json();

    if (!transcript || !summary) {
      return NextResponse.json(
        { error: 'Transcript and summary are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('transcripts')
      .insert([
        {
          transcript,
          summary,
          title: title || 'Untitled Summary',
        },
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to save transcript' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: data[0] });
  } catch (error) {
    console.error('Error saving transcript:', error);
    return NextResponse.json(
      { error: 'Failed to save transcript' },
      { status: 500 }
    );
  }
}