import React, { useState } from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import ShareIcon from '@mui/icons-material/ShareRounded'
import FacebookIcon from '@mui/icons-material/FacebookRounded'
import InstagramIcon from '@mui/icons-material/Instagram'

import Section from './Section'
import CourseCard from './CourseCard'
import ShareDrawer from './ShareDrawer'
import { PageHeading } from './PageHeading'

function CreatorSection({ coursesByCreator, creator }) {
  const [openShareDrawer, setOpenShareDrawer] = useState(false)

  return (
    <Section>
      <Container>
        <Box sx={{display: {md: 'flex'}, gap: {md: '20px'}, paddingBottom: {md: '40px'}}}>
          <Box
            alt={creator.name}
            component="img"
            width="100%"
            height={{
              xs: '350px',
              sm: '500px',
            }}
            sx={{ objectFit: 'cover', objectPosition: 'center top'}}
            src={
              creator.image && creator.image.length
                ? creator.image[0].downloadURL
                : ''
            }
          />
          <Box>
            <PageHeading headingText={creator.name} m="0.25rem 0" />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: '20px 0',
              }}
            >
              <Box>
                <IconButton 
                  href={
                    'https://www.facebook.com/' + 
                    creator.facebookProfile 
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FacebookIcon fontSize="large" />
                </IconButton>
                <IconButton
                  href={
                    'https://www.instagram.com/' +
                    creator.instagramHandle.replace('@', '')
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramIcon fontSize="large" />
                </IconButton>
              </Box>
              <Box>
                <IconButton onClick={() => setOpenShareDrawer(true)}>
                  <ShareIcon fontSize="large" />
                </IconButton>
              </Box>
            </Box>
            <Typography variant="h6">About me</Typography>
            <Box sx={{ padding: '20px 0' }}>
              <Typography>
                {
                  creator.pleaseIncludeAShort23SentenceBioThatWeCanUseWhenPromotingYourContent
                }
              </Typography>
            </Box>
          </Box>
        </Box>
          {coursesByCreator.length && (
            <Box>
              <Typography variant="h6">More from {creator.name}</Typography>
              <CourseCard course={coursesByCreator[0]} />
            </Box>
          )}
        <ShareDrawer
          url={`https://create-to-learn.netlify.app/creator/${creator.uid}`}
          title={`Share ${creator.name}'s page`}
          openShareDrawer={openShareDrawer}
          setOpenShareDrawer={setOpenShareDrawer}
        />
      </Container>
    </Section>
  )
}

export default CreatorSection
