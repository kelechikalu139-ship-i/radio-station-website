import React from 'react'
import ContactForm from './ContactForm'
import LocationMap from './LocationMap'

const ContactMain = () => {
  return (
    <div>
        <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          {/* Contact form (wider) */}
          <div className="lg:col-span-2">
            <ContactForm/>
          </div>

          {/* Map / Location */}
          <div>
            <LocationMap/>
          </div>
        </div>

        {/* About / extra content */}
        {/* <div className="mt-12">
          <AboutUs />
        </div> */}
      </main>
    </div>
  )
}

export default ContactMain