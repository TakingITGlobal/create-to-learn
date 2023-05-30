import React from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Link } from './../util/router'

function ArrowBack({ showComponent, setShowComponent }) {
  return showComponent === 'nav' ? (
    <Box>
      <IconButton
        aria-label="back to settings page"
        component={Link}
        to="/settings/profile"
      >
        <ArrowBackIcon />
      </IconButton>
    </Box>
  ) : (
    <Box>
      <IconButton
        aria-label="back to previous page"
        onClick={() => setShowComponent('nav')}
      >
        <ArrowBackIcon />
      </IconButton>
    </Box>
  )
}

export default ArrowBack
