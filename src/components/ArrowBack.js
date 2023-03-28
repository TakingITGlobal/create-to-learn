import React from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Link } from './../util/router'

function ArrowBack({ showComponent, setShowComponent }) {
  return showComponent === 'nav' ? (
    <Box sx={{ paddingBottom: '5px' }}>
      <IconButton component={Link} to="/settings/profile" size="large">
        <ArrowBackIcon />
      </IconButton>
    </Box>
  ) : (
    <Box sx={{ paddingBottom: '5px'  }}>
      <IconButton onClick={() => setShowComponent('nav')} size="large">
        <ArrowBackIcon />
      </IconButton>
    </Box>
  );
}

export default ArrowBack
