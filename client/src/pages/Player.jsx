import React from 'react'
import PlayerHero from '../components/playerSection/PlayerHero'
import MainPlayer from '../components/playerSection/MainPlayer'
import MiniPlayer from '../components/playerSection/MiniPlayer'
import StreamHealth from '../components/playerSection/StreamHealth'
import AudioWaveform from '../components/playerSection/AudioWaveform'

const Player = () => {
  return (
    <div>
      <PlayerHero/>
      <MainPlayer/>
      <MiniPlayer/>
      <StreamHealth/>
      <AudioWaveform/>
    </div>
  )
}

export default Player