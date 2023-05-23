import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Link } from '../../util/router'

const MyCoursesEmptyState = ({ title, subtitle, buttonText, href }) => {
  return (
    <Box mt={5}>
      <Box>
        <Typography variant="h3" align="center">
          {title}
        </Typography>
      </Box>
      <Box mt={3}>
        <Typography variant="body2" align="center">
          {subtitle}
        </Typography>
      </Box>
      <Box
        mt={3}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Button variant="contained" size="large" component={Link} to={href}>
          {buttonText}
        </Button>
      </Box>
    </Box>
  )
}

export default MyCoursesEmptyState
