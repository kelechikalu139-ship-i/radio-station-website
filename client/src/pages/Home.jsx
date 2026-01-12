import React from 'react'
import HomeRadio from '../components/homeSection/HeroRadio'
import LiveProgramsSection from '../components/homeSection/LiveProgramsSection'
import LatestEpisodes from '../components/homeSection/LatestEpisodes'
import NewsletterCTA from '../components/homeSection/NewsletterCTA'
import Testimonials from '../components/homeSection/Testimonials'
import SponsorsCarousel from '../components/homeSection/SponsorsCarousel'
import StickyListenButton from '../components/homeSection/StickyListenButton'
import NowPlayingCard from '../components/homeSection/NowPlayingCard'

const Home = () => {
  return (
    <div className="mx-auto">
        <HomeRadio/>
        <LiveProgramsSection/>
        <LatestEpisodes/>
        <NewsletterCTA/>
        <Testimonials/>
        <SponsorsCarousel/>
        <StickyListenButton/>
        <NowPlayingCard/>
    </div>
  )
}

export default Home