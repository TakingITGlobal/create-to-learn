import React from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import ShareIcon from '@mui/icons-material/ShareRounded'
import FacebookIcon from '@mui/icons-material/FacebookRounded'
import InstagramIcon from '@mui/icons-material/Instagram'
import Section from './Section'
import BrowseCourseCard from './BrowseCourseCard'

function CreatorSection({ coursesByCreator, creator }) {
  return (
    <Section>
      <Container>
        <Box
          alt={`creator-${creator.name}`}
          component="img"
          width="100%"
          height="275px"
          sx={{ objectFit: 'cover' }}
          src={
            creator.image && creator.image.length
              ? creator.image[0].downloadURL
              : ''
          }
        />
        <Typography variant="h5" sx={{ fontWeight: '700' }}>
          {creator.name}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: '20px 0',
          }}
        >
          <Box>
            <IconButton href={creator.facebookProfile ?? ''}>
              <FacebookIcon fontSize="large" />
            </IconButton>
            <IconButton
              href={
                'https://www.instagram.com/' +
                creator.instagramHandle.replace('@', '')
              }
            >
              <InstagramIcon fontSize="large" />
            </IconButton>
          </Box>
          <Box>
            <IconButton>
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
        {coursesByCreator.length && (
          <Box>
            <Typography variant="h6">More from {creator.name}</Typography>
            <BrowseCourseCard course={coursesByCreator[0]} />
          </Box>
        )}
      </Container>
    </Section>
  )
}

export default CreatorSection
