import React from 'react'
import ProgramHero from '../components/programsSection/ProgramHero'
import LiveProgramsList from '../components/LiveProgramsList'
import ScheduleGrid from '../components/programsSection/ScheduleGrid'

const Programs = () => {
  return (
    <>
    <ProgramHero/>
    <LiveProgramsList/>
    <ScheduleGrid/>
    </>
  )
}

export default Programs