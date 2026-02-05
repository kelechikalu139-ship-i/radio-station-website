import React from 'react'
import HomeRadio from '../components/homeSection/HeroRadio'
import LiveProgramsSection from '../components/homeSection/LiveProgramsSection'
import LatestEpisodes from '../components/homeSection/LatestEpisodes'
import NewsletterCTA from '../components/homeSection/NewsletterCTA'
import Testimonials from '../components/homeSection/Testimonials'
// import SponsorsCarousel from '../components/homeSection/SponsorsCarousel'
import StickyListenButton from '../components/homeSection/StickyListenButton'
import NowPlayingCard from '../components/homeSection/NowPlayingCard'
import OnAirOAP from '../components/homeSection/OnAirOAP'
import NewsAndEventsSection from '../components/homeSection/NewsAndEventsSection'
import RadioVideoSection from '../components/homeSection/RadioVideoSection'
// import NewsEventPage from './NewsEventPage'

const Home = () => {
  return (
    <div className="mx-auto">
        <HomeRadio/>
        <OnAirOAP/>
        <LiveProgramsSection/>
        <NewsAndEventsSection/>
        <RadioVideoSection/>
        <LatestEpisodes/>
        <NewsletterCTA/>
        <Testimonials/>
        {/* <SponsorsCarousel/> */}
        {/* <NewsEventPage/> */}
        <StickyListenButton/>
        <NowPlayingCard/>
    </div>
  )
}

export default Home