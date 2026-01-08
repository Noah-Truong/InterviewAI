import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text || !text.trim()) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    const tavusApiKey = process.env.TAVUS_API_KEY;
    const personaId = process.env.TAVUS_PERSONA_ID;

    if (!tavusApiKey || !personaId) {
      // For demo purposes, return mock data
      // In production, you would call the actual Tavus API
      return NextResponse.json({
        videoUrl: null,
        audioStream: null,
        message: 'Tavus API key and Persona ID need to be configured',
        // Mock response for demo
        mockData: {
          text,
          timestamp: new Date().toISOString(),
        },
      });
    }

    try {
      // Call Tavus Realtime API
      // Documentation: https://docs.tavus.io/realtime/overview
      const response = await fetch('https://api.tavus.io/realtime/personas/v2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': tavusApiKey,
        },
        body: JSON.stringify({
          persona_id: personaId,
          text: text,
          stream: true, // Enable streaming for real-time response
        }),
        // Add timeout to prevent hanging
        signal: AbortSignal.timeout(10000), // 10 second timeout
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Tavus API error: ${error}`);
      }

      const data = await response.json();

      return NextResponse.json({
        videoUrl: data.video_url || data.stream_url,
        audioStream: data.audio_stream,
        sessionId: data.session_id,
        timestamp: new Date().toISOString(),
      });
    } catch (fetchError) {
      // If API call fails (timeout, network error, etc.), fall back to mock data
      console.warn('Tavus API unavailable, falling back to mock response:', fetchError instanceof Error ? fetchError.message : 'Unknown error');

      return NextResponse.json({
        videoUrl: null,
        audioStream: null,
        message: 'Tavus API is currently unavailable, using demo mode',
        mockData: {
          text,
          timestamp: new Date().toISOString(),
          note: 'This is a mock response because the Tavus API is unreachable'
        },
      });
    }
  } catch (error) {
    console.error('Error calling Tavus API:', error);
    return NextResponse.json(
      { error: 'Failed to generate avatar response', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

