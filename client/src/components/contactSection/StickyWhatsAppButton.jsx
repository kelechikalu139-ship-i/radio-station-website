import React from "react";
import {  MessageCircle } from 'lucide-react'

const StickyWhatsAppButton = () => {


  return (
    <div>
  
    <a 
    href="https://wa.me/2348000000000?text=Hi%20Nexter%20FM"
    aria-label="Chat on WhatsApp"
    className="fixed left-6 bottom-6 z-50 items-center gap-4 px-4 py-4 rounded-full shadow-lg bg-green-600 text-white hover:bg-green-950">
        <MessageCircle className="animate-bounce"/>
    </a>
    </div>
  )
}

export default StickyWhatsAppButton 


//  <span className="absolute -inset-1 rounded-full animate-ping bg-yellow-300/40 blur-sm" />
//                 <Radio size={14} className="text-yellow-300 relative z-10" />
//               </div>