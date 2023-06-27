import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import emptyStateImage from '../../assets/images/empty-state.png'

const BrowseEmptyState = () => {
  return (
    <Box
      mt={5}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Box
        component="img"
        src={emptyStateImage}
        sx={{
          height: '225px',
          maxHeight: { xs: 300, lg: 500 },
          padding: '10px 0',
        }}
      />
      <Box>
        <Typography variant="subtitle1">
          Sorry we could find any matches for your chosen filters.
        </Typography>
      </Box>
      <Box mt={3}>
        <Typography variant="body2">
          Please try another set of filters.
        </Typography>
      </Box>
    </Box>
  )
}

export default BrowseEmptyState
