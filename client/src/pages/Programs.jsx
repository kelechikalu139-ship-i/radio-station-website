import React from 'react'
import ProgramHero from '../components/programsSection/ProgramHero'
// import LiveProgramsList from '../components/LiveProgramsList'
import ScheduleGrid from '../components/programsSection/ScheduleGrid'
import ProgramSchedule from '../components/programsSection/ProgramSchedule'
import NowPlayingCard from '../components/homeSection/NowPlayingCard'

const Programs = () => {
  return (
    <>
    <ProgramHero/>
    {/* <LiveProgramsList/> */}
    {/* <ScheduleGrid/> */}
    <ProgramSchedule/>
    <NowPlayingCard/>
    </>
  )
}

export default Programs