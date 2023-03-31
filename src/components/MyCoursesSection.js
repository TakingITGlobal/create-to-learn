import React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import Section from './Section'

function MyCoursesSection(props) {
  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Box mt={5}>
        <Container>My Courses</Container>
      </Box>
    </Section>
  )
}

export default MyCoursesSection
