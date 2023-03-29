import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

const BrowseEmptyState = (search) => {
  return (
    <Box mt={5}>
      <Box>
        <Typography variant="subtitle1">
          Sorry we could find any matches for{' '}
          {search !== '' ? `${search.search} and ` : ''} your chosen filters.
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

export default BrowseEmptyState
