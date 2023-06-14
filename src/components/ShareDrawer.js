import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import CloseIcon from '@mui/icons-material/Close'
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

function ShareDrawer({ url, title, openShareDrawer, setOpenShareDrawer }) {
  return (
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
        <Typography variant="h3">{title}</Typography>
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
          url={url}
          quote={'Share on facebook'}
          hashtag="#create-to-learn"
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TwitterShareButton
          url={url}
          quote={'Share on twitter'}
          hashtag="#create-to-learn"
        >
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <WhatsappShareButton
          url={url}
          quote={'Share on Whatsapp'}
          hashtag="#create-to-learn"
        >
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
        <LinkedinShareButton
          url={url}
          quote={'Share on linkedin'}
          hashtag="#create-to-learn"
        >
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
      </Stack>
    </SwipeableDrawer>
  )
}

export default ShareDrawer
