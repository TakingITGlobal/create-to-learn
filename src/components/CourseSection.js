import React from 'react'
import Container from '@material-ui/core/Container'
import Section from './Section'


function CourseSection(props) {

  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <h2>Test {props.data?.seriesName}</h2>
    </Section>
  )
}

export default CourseSection
