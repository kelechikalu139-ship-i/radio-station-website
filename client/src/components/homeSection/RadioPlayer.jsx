// src/components/RadioPlayer.jsx
import React from 'react';
import { useAudio } from '../context/AudioContext';

export default function RadioPlayer() {
  const { 
    playing, 
    toggle, 
    volume, 
    setVolume, 
    nowPlaying, 
    connectionState 
  } = useAudio();

  const getButtonText = () => {
    if (connectionState === 'connecting') return '⏳ Connecting...';
    if (connectionState === 'buffering') return '⏳ Buffering...';
    if (connectionState === 'reconnecting') return '🔄 Reconnecting...';
    if (connectionState === 'error') return '❌ Retry';
    return playing ? '⏸️ Pause' : '▶️ Play';
  };

  return (
    <div style={{
      padding: '20px',
      maxWidth: '400px',
      margin: '0 auto',
      textAlign: 'center',
      background: '#f5f5f5',
      borderRadius: '10px'
    }}>
      <h2>{nowPlaying.show}</h2>
      
      <div style={{ margin: '20px 0' }}>
        <div style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
          {nowPlaying.title}
        </div>
        <div style={{ color: '#666' }}>
          {nowPlaying.artist}
        </div>
      </div>

      <button 
        onClick={toggle}
        style={{
          padding: '15px 30px',
          fontSize: '1.1em',
          background: connectionState === 'error' ? '#dc3545' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          margin: '10px 0'
        }}
        disabled={connectionState === 'connecting' || connectionState === 'buffering'}
      >
        {getButtonText()}
      </button>

      <div style={{ margin: '15px 0' }}>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          style={{ width: '200px' }}
        />
      </div>

      <div style={{ fontSize: '0.9em', color: '#666' }}>
        {connectionState === 'connected' && playing && '🔊 Live'}
        {connectionState === 'error' && '❌ Connection failed'}
        {nowPlaying.listeners > 0 && ` | 👥 ${nowPlaying.listeners} listeners`}
      </div>
    </div>
  );
}