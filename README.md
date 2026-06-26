# Whisper Chat App

A real-time chat application built with Node.js, Express, and Socket.io. Users can join named rooms, exchange messages instantly, and share their current location.

## Features

- Real-time messaging powered by WebSockets (Socket.io)
- Multiple chat rooms with live participant lists
- Location sharing via Google Maps links
- Profanity filtering with [`bad-words`](https://www.npmjs.com/package/bad-words)
- Duplicate username protection within a room
- System notifications when users join or leave

## Tech Stack

- **Runtime:** Node.js
- **Server:** Express 5
- **Real-time:** Socket.io 4
- **Frontend:** Static HTML, CSS, and vanilla JavaScript

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (which includes npm)

### Installation

```bash
npm install
```

### Running the App

Start the server:

```bash
npm start
```

For development with automatic reloads (via `nodemon`):

```bash
npm run dev
```

By default the server runs on [http://localhost:3000](http://localhost:3000). Set the `PORT` environment variable to use a different port.

## Usage

1. Open [http://localhost:3000](http://localhost:3000) in your browser.
2. Navigate to the join page (`/join`) and enter a username and room name.
3. Start chatting in real time with others in the same room.
4. Use the location button to share your current position as a Google Maps link.

## Project Structure

```
.
├── public/             # Static frontend assets (HTML, CSS, JS, images)
├── src/
│   ├── index.js        # Express + Socket.io server entry point
│   └── utils/
│       ├── messages.js # Message generation helpers
│       └── users.js    # In-memory user/room management
└── package.json
```

## License

ISC
