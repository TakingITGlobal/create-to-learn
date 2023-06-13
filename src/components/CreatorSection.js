import React, { useState } from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import ShareIcon from '@mui/icons-material/ShareRounded'
import CloseIcon from '@mui/icons-material/Close'
import FacebookLink from '@mui/icons-material/FacebookRounded'
import InstagramIcon from '@mui/icons-material/Instagram'
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from 'react-share'
import Section from './Section'
import CourseCard from './CourseCard'

function CreatorSection({ coursesByCreator, creator }) {
  const [openShareDrawer, setOpenShareDrawer] = useState(false)

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
              <FacebookLink fontSize="large" />
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
        {coursesByCreator.length && (
          <Box>
            <Typography variant="h6">More from {creator.name}</Typography>
            <CourseCard course={coursesByCreator[0]} />
          </Box>
        )}
        <SwipeableDrawer
          anchor="bottom"
          open={openShareDrawer}
          onClose={() => setOpenShareDrawer(false)}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}
          >
            <IconButton
              aria-label="close-icon"
              onClick={() => setOpenShareDrawer(false)}
            >
              <CloseIcon sx={{ color: 'white' }} />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              padding: '10px 20px 20px 20px',
            }}
          >
            <Typography variant="h3">Share {creator.name}'s page</Typography>
          </Box>
          <Stack
            direction={'row'}
            spacing={4}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              paddingBottom: '20px',
            }}
          >
            <FacebookShareButton
              url={`https://create-to-learn.netlify.app/${creator.uid}`}
              quote={'Share on facebook'}
              hashtag="#create-to-learn"
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton
              url={`https://create-to-learn.netlify.app/${creator.uid}`}
              quote={'Share on twitter'}
              hashtag="#create-to-learn"
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <WhatsappShareButton
              url={`https://create-to-learn.netlify.app/${creator.uid}`}
              quote={'Share on Whatsapp'}
              hashtag="#create-to-learn"
            >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <LinkedinShareButton
              url={`https://create-to-learn.netlify.app/${creator.uid}`}
              quote={'Share on linkedin'}
              hashtag="#create-to-learn"
            >
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
          </Stack>
        </SwipeableDrawer>
      </Container>
    </Section>
  )
}

export default CreatorSection
