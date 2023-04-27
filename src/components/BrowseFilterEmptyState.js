import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const BrowseEmptyState = () => {
  return (
    <Box mt={5}>
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
