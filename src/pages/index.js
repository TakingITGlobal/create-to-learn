import React from 'react'
import Meta from './../components/Meta'
import HeroSection from './../components/HeroSection'
import ClientsSection from './../components/ClientsSection'
import FeaturesSection from './../components/FeaturesSection'
import TestimonialsSection from './../components/TestimonialsSection'
import NewsletterSection from './../components/NewsletterSection'

function IndexPage(props) {
  return (
    <>
      <Meta />
      <HeroSection
        bgColor="default"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Create To Learn"
        subtitle="The Landing Page for Create To Learn."
        image="https://heynova.io/static/heynova-logo-new-08b74087a45ee7096b2ed1491d51e44a.png"
      />
      {/* <ClientsSection
        bgColor="light"
        size="normal"
        bgImage=""
        bgImageOpacity={1}
        title=""
        subtitle=""
      />
      <FeaturesSection
        bgColor="default"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Features"
        subtitle="All the features you need to move faster"
      />
      <TestimonialsSection
        bgColor="light"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Here's what people are saying"
        subtitle=""
      />
      <NewsletterSection
        bgColor="default"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Stay in the know"
        subtitle="Receive our latest articles and feature updates"
        buttonText="Subscribe"
        buttonColor="primary"
        inputPlaceholder="Enter your email"
        subscribedMessage="You are now subscribed!"
      /> */}
    </>
  )
}

export default IndexPage
