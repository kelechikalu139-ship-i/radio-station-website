import React from 'react'
import NewsHero from '../components/newseventsection/NewsHero'
import FeaturedNews from '../components/newseventsection/FeaturedNews'
import NewsList from '../components/newseventsection/NewsList'
import EventsList from '../components/newseventsection/eventsList'

const NewsEventPage = () => {
  return (
    <>
    <NewsHero/>
    <FeaturedNews/>
    <NewsList/>
    <EventsList/>
    </>
  )
}

export default NewsEventPage