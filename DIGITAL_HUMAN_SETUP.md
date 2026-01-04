# Real-Time Digital Human Integration

This document explains how to set up and use the LiveKit and Tavus API integration for real-time digital human interaction.

## Features

- **LiveKit Integration**: Real-time audio streaming with minimal latency
- **Tavus Persona API**: Real-time 2D/3D avatar rendering with low-latency TTS and lip-sync
- **Real-Time Synchronization**: Audio-video synchronization with minimal delay
- **Text-to-Speech**: Convert text input to real-time avatar speech

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# LiveKit Configuration
LIVEKIT_API_KEY=your-livekit-api-key
LIVEKIT_API_SECRET=your-livekit-api-secret
NEXT_PUBLIC_LIVEKIT_URL=wss://your-livekit-server.livekit.cloud

# Tavus API Configuration
TAVUS_API_KEY=your-tavus-api-key
TAVUS_PERSONA_ID=your-tavus-persona-id
```

### 2. LiveKit Setup

#### Option A: LiveKit Cloud (Recommended for Production)

1. Sign up for LiveKit Cloud at https://cloud.livekit.io
2. Create a new project
3. Get your API key and secret from the project settings
4. Set `NEXT_PUBLIC_LIVEKIT_URL` to your LiveKit cloud URL

#### Option B: Local Development

1. Install LiveKit server:
   ```bash
   # macOS
   brew install livekit
   
   # Linux
   curl -sSL https://get.livekit.io | bash
   ```

2. Start LiveKit server:
   ```bash
   livekit-server --dev
   ```

3. Use default credentials:
   - API Key: `devkey`
   - API Secret: `secret`
   - URL: `ws://localhost:7880`

### 3. Tavus API Setup

1. Sign up for Tavus at https://tavus.io
2. Create a persona (2D or 3D avatar)
3. Get your API key from the dashboard
4. Get your Persona ID from the persona settings
5. Add both to your `.env.local` file

## API Routes

### `/api/livekit/token`

Generates a LiveKit access token for connecting to a room.

**Request:**
```json
{
  "roomName": "digital-human-room",
  "participantName": "user-123"
}
```

**Response:**
```json
{
  "token": "eyJ...",
  "url": "wss://your-livekit-server.livekit.cloud"
}
```

### `/api/tavus/generate`

Sends text to Tavus API and receives avatar video/audio stream.

**Request:**
```json
{
  "text": "Hello, how can I help you today?"
}
```

**Response:**
```json
{
  "videoUrl": "https://...",
  "audioStream": "...",
  "sessionId": "...",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Usage

1. Navigate to `/digital-human` in your application
2. Click "Connect to Session" to establish LiveKit connection
3. Enter text in the text area
4. Click "Send Message" to see the avatar speak in real-time
5. The avatar will respond with synchronized lip-sync and audio

## Architecture

- **Frontend**: React component using `livekit-client` for real-time communication
- **Backend**: Next.js API routes for token generation and Tavus API integration
- **Streaming**: LiveKit handles audio streaming, Tavus handles video/avatar rendering
- **Synchronization**: Both services are configured for low-latency, real-time delivery

## Performance Optimization

- LiveKit room configured with `adaptiveStream: false` and `dynacast: false` for minimal latency
- Tavus API called with `stream: true` for real-time response
- Video and audio tracks are attached directly to DOM elements for immediate playback

## Troubleshooting

### Connection Issues

- Verify LiveKit credentials are correct
- Check that LiveKit server is running (if using local setup)
- Ensure `NEXT_PUBLIC_LIVEKIT_URL` is correctly set

### Tavus API Issues

- Verify Tavus API key and Persona ID are correct
- Check Tavus API status and quotas
- Review browser console for detailed error messages

### Audio/Video Sync Issues

- Ensure both LiveKit and Tavus are properly connected
- Check network latency and connection quality
- Verify video and audio elements are properly initialized

## Next Steps

- Implement WebSocket streaming for real-time Tavus responses
- Add error handling and retry logic
- Implement user authentication for rooms
- Add support for multiple personas
- Implement conversation history and context

