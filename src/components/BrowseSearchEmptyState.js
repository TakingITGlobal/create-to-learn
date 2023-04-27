import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const BrowseSearchEmptyState = (search) => {
  return (
    <Box>
      <Box>
        Sorry we could find any matches for{' '}
        <Typography
          variant="subtitle1"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignText: 'center',
          }}
        >
          <b> {search !== '' ? `${search.search}` : ''} </b>
        </Typography>
      </Box>
      <Box mt={3}>
        <Typography variant="body2">
          Please try searching with another term.
        </Typography>
      </Box>
    </Box>
  )
}

export default BrowseSearchEmptyState
