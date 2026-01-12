import React from 'react'
import ContactHero from '../components/contactSection/ContactHero'
import ContactMain from '../components/contactSection/ContactMain'
import StickyWhatsAppButton from '../components/contactSection/StickyWhatsAppButton'

const Contact = () => {
  return (
    <div>
      <ContactHero/>
      <ContactMain/>
      <StickyWhatsAppButton/>
    </div>
  )
}

export default Contact