import React from 'react'
import ContactHero from '../components/contactSection/ContactHero'
import ContactMain from '../components/contactSection/ContactMain'
import StickyWhatsAppButton from '../components/contactSection/StickyWhatsAppButton'
import NowPlayingCard from '../components/homeSection/NowPlayingCard'

const Contact = () => {
  return (
    <div>
      <ContactHero/>
      <ContactMain/>
      <StickyWhatsAppButton/>
      <NowPlayingCard/>
    </div>
  )
}

export default Contact