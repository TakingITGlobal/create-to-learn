import React from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Section from '../Section'
import { PageHeading } from 'components/PageHeading'
import Typography from '@mui/material/Typography'

function HeroSection2(props) {
  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container>
        <Box>
          <PageHeading
            headingText={props.title}
            sx={{paddingBottom: '10px'}}
          />
          <Typography sx={{maxWidth: '860px'}}>{props.subtitle}</Typography>
        </Box>
      </Container>
    </Section>
  )
}

export default HeroSection2
