import React from 'react'
import Meta from './../components/Meta'
import HeroSection2 from './../components/Unused/HeroSection2'
import TeamBiosSection from '../components/Unused/TeamBiosSection'

function AboutPage(props) {
  return (
    <>
      <Meta title="About" description="Learn about our company and team" />
      <HeroSection2
        bgColor="primary"
        size="large"
        bgImageOpacity={0.2}
        title="About Create to Learn"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum consequatur numquam aliquam tenetur ad amet inventore hic beatae, quas accusantium perferendis sapiente explicabo, corporis totam!"
      />
      
    </>
  )
}

export default AboutPage
