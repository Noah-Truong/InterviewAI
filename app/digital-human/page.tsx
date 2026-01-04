'use client';

import { useState, useRef, useEffect } from 'react';
import { Room, RoomEvent, Track } from 'livekit-client';
import Layout from '../../components/Layout';
import Header from '../../components/Header';

export default function DigitalHumanPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Array<{ text: string; timestamp: Date }>>([]);
  const roomRef = useRef<Room | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize LiveKit room connection
  const connectToRoom = async () => {
    try {
      // Get access token from backend
      const response = await fetch('/api/livekit/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomName: 'digital-human-room',
          participantName: 'user-' + Date.now(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.details || `HTTP ${response.status}: Failed to get access token`);
      }

      const { token, url } = await response.json();

      if (!token || !url) {
        throw new Error('Invalid response from token endpoint');
      }

      console.log('Connecting to LiveKit:', { url, hasToken: !!token });

      // Validate URL format
      if (!url.startsWith('ws://') && !url.startsWith('wss://')) {
        throw new Error(`Invalid LiveKit URL format: ${url}. Must start with ws:// or wss://`);
      }

      // Test if server is reachable (for debugging)
      try {
        const testUrl = url.replace('ws://', 'http://').replace('wss://', 'https://');
        const healthCheck = await fetch(`${testUrl}/twirp/livekit.RoomService/ListRooms`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        }).catch(() => null);
        
        if (healthCheck === null) {
          console.warn('LiveKit server health check failed - server may not be running');
        }
      } catch (e) {
        console.warn('Could not verify LiveKit server connectivity:', e);
      }

      const room = new Room({
        // Configure for low latency
        adaptiveStream: false,
        dynacast: false,
      });
      
      roomRef.current = room;

      // Handle track subscriptions before connecting
      room.on(RoomEvent.TrackSubscribed, (track: Track, publication: any, participant: any) => {
        console.log('Track subscribed:', track.kind);
        if (track.kind === 'video' && videoRef.current) {
          track.attach(videoRef.current);
        } else if (track.kind === 'audio' && audioRef.current) {
          track.attach(audioRef.current);
        }
      });

      room.on(RoomEvent.TrackUnsubscribed, (track: Track) => {
        track.detach();
      });

      room.on(RoomEvent.Disconnected, (reason) => {
        console.log('Disconnected from room:', reason);
        setIsConnected(false);
      });

      room.on(RoomEvent.Connected, () => {
        console.log('Connected to room successfully');
        setIsConnected(true);
      });

      room.on(RoomEvent.ConnectionQualityChanged, (quality, participant) => {
        console.log('Connection quality changed:', quality);
      });

      // Add error handler
      room.on(RoomEvent.RoomMetadataChanged, (metadata) => {
        console.log('Room metadata changed:', metadata);
      });

      // Connect to room with timeout
      const connectPromise = room.connect(url, token);
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Connection timeout after 10 seconds')), 10000)
      );

      await Promise.race([connectPromise, timeoutPromise]);
    } catch (error) {
      console.error('Failed to connect to LiveKit room:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      let detailedMessage = `Failed to connect: ${errorMessage}\n\n`;
      
      if (errorMessage.includes('Failed to fetch') || errorMessage.includes('signal connection')) {
        detailedMessage += 'Possible issues:\n';
        detailedMessage += '1. LiveKit server is not running\n';
        detailedMessage += '2. Check if LiveKit server is accessible at the configured URL\n';
        detailedMessage += '3. For local dev, run: livekit-server --dev\n';
        detailedMessage += '4. Verify NEXT_PUBLIC_LIVEKIT_URL in .env.local\n';
        detailedMessage += '5. Check browser console for CORS errors\n';
      } else {
        detailedMessage += 'Please check:\n';
        detailedMessage += '1. LiveKit server is running\n';
        detailedMessage += '2. Environment variables are set correctly\n';
        detailedMessage += '3. Network connectivity';
      }
      
      alert(detailedMessage);
      setIsConnected(false);
    }
  };

  // Send text to Tavus API for real-time avatar generation
  const sendTextToAvatar = async (text: string) => {
    if (!text.trim() || isSpeaking) return;

    setIsSpeaking(true);
    const messageText = text.trim();
    setInputText('');
    setMessages(prev => [...prev, { text: messageText, timestamp: new Date() }]);

    try {
      // Call Tavus API to generate avatar response
      const response = await fetch('/api/tavus/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: messageText }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate avatar response');
      }

      const data = await response.json();

      // If we have a video URL, display it
      if (data.videoUrl && videoRef.current) {
        videoRef.current.src = data.videoUrl;
        videoRef.current.play().catch(console.error);
      }

      // Handle streaming response if available
      if (data.audioStream) {
        // Process audio stream
        // This would integrate with LiveKit for real-time audio streaming
      }

      setIsSpeaking(false);
    } catch (error) {
      console.error('Error generating avatar response:', error);
      setIsSpeaking(false);
      alert(`Failed to generate response: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() && !isSpeaking && isConnected) {
      sendTextToAvatar(inputText);
    }
  };

  const disconnect = async () => {
    if (roomRef.current) {
      await roomRef.current.disconnect();
      roomRef.current = null;
      setIsConnected(false);
    }
  };

  useEffect(() => {
    return () => {
      if (roomRef.current) {
        roomRef.current.disconnect();
      }
    };
  }, []);

  return (
    <Layout>
      <Header
        activeFilter="Matched"
        onFilterChange={() => {}}
        likedCount={0}
        appliedCount={0}
      />
      <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Real-Time Digital Human</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Avatar Display Area */}
              <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center overflow-hidden relative">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted={false}
                  className="w-full h-full object-contain"
                />
                <audio ref={audioRef} autoPlay />
                {!isConnected && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
                    <div className="text-white text-center">
                      <p className="text-lg mb-2">Avatar will appear here</p>
                      <p className="text-sm text-gray-300">Connect to start the session</p>
                    </div>
                  </div>
                )}
                {isSpeaking && isConnected && (
                  <div className="absolute top-4 left-4 bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                    Speaking...
                  </div>
                )}
              </div>

              {/* Control Panel */}
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Connection Status
                  </label>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                    <span className="text-sm text-gray-600">
                      {isConnected ? 'Connected' : 'Disconnected'}
                    </span>
                  </div>
                </div>

                {!isConnected ? (
                  <button
                    onClick={connectToRoom}
                    className="w-full bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors"
                    style={{ borderRadius: '9999px' }}
                  >
                    Connect to Session
                  </button>
                ) : (
                  <button
                    onClick={disconnect}
                    className="w-full bg-red-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors"
                    style={{ borderRadius: '9999px' }}
                  >
                    Disconnect
                  </button>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="textInput" className="block text-sm font-medium text-gray-700 mb-2">
                      Enter text for avatar to speak
                    </label>
                    <textarea
                      id="textInput"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Type your message here..."
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                      disabled={!isConnected || isSpeaking}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!isConnected || isSpeaking || !inputText.trim()}
                    className="w-full bg-black text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isSpeaking ? 'Speaking...' : 'Send Message'}
                  </button>
                </form>

                {/* Messages History */}
                {messages.length > 0 && (
                  <div className="bg-gray-50 rounded-lg p-4 max-h-40 overflow-y-auto">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Recent Messages
                    </label>
                    <div className="space-y-2">
                      {messages.slice(-5).reverse().map((msg, idx) => (
                        <div key={idx} className="text-sm text-gray-600 truncate">
                          {msg.text}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">How to use:</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>1. Click "Connect to Session" to establish LiveKit connection</li>
                <li>2. Enter text in the text area</li>
                <li>3. Click "Send Message" to see the avatar speak in real-time via Tavus API</li>
                <li>4. The avatar will respond with synchronized lip-sync and low-latency audio</li>
              </ul>
              <div className="mt-3 pt-3 border-t border-purple-200">
                <p className="text-xs text-gray-600">
                  <strong>Note:</strong> Configure LIVEKIT_API_KEY, LIVEKIT_API_SECRET, TAVUS_API_KEY, and TAVUS_PERSONA_ID in your environment variables.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

