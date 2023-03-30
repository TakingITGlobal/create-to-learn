import React from 'react'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { Link } from './../util/router'

function ArrowBack({ showComponent, setShowComponent }) {
  return showComponent === 'nav' ? (
    <Box sx={{ paddingBottom: 5 }}>
      <IconButton
        aria-label="back to settings page"
        component={Link}
        to="/settings/profile"
      >
        <ArrowBackIcon />
      </IconButton>
    </Box>
  ) : (
    <Box sx={{ paddingBottom: 5 }}>
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
