import React, { useCallback } from 'react'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { Link } from './../util/router'

function ArrowBack({ showComponent, setShowComponent }) {
  return showComponent === 'nav' ? (
    <Box sx={{ paddingBottom: 5 }}>
      <IconButton component={Link} to="/settings/profile">
        <ArrowBackIcon />
      </IconButton>
    </Box>
  ) : (
    <Box sx={{ paddingBottom: 5 }}>
      <IconButton onClick={() => setShowComponent('nav')}>
        <ArrowBackIcon />
      </IconButton>
    </Box>
  )
}

export default ArrowBack
