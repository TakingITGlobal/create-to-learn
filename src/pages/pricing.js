import React from 'react'
import Meta from './../components/Meta'
import PricingSection from '../components/Unused/PricingSection'

function PricingPage(props) {
  return (
    <>
      <Meta title="Pricing | Create to Learn" />
      <PricingSection
        bgColor="default"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Pricing"
        subtitle="Choose the plan that makes sense for you. All plans include a 14-day free trial."
      />
    </>
  )
}

export default PricingPage
