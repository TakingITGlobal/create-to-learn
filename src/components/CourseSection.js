import React from 'react'
import Container from '@mui/material/Container'
import Section from './Section'


function CourseSection(props) {

  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container>
        <h1>{props.data?.seriesName}</h1>
      </Container>
      
    </Section>
  )
}

export default CourseSection
