import React from 'react'
import AboutHero from '../components/aboutSection/AboutHero'
import OurStory from '../components/aboutSection/OurStory'
import MissionVision from '../components/aboutSection/MissionVision'
import Stats from '../components/aboutSection/Stats'
import TeamGrid from '../components/aboutSection/TeamGrid'
import Testimonials from '../components/aboutSection/Testimonials'
import CTAJoin from '../components/aboutSection/CTAJoin'
// import OAPProfiles from '../components/aboutSection/OAPProfiles'

const About = () => {
  return (
    <div>
      <AboutHero/>
      <OurStory/>
      <MissionVision/>
      <Stats/>
      <TeamGrid/>
      <Testimonials/>
      <CTAJoin/>
      {/* <OAPProfiles/> */}
    </div>
  )
}

export default About