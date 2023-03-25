import React from 'react'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Link } from './../util/router'

function SignUp({ setDismissed = null, showDismissButton = false }) {
  return (
    <Box align="center" sx={{ padding: '30px 10px 10px 10px' }}>
      <Box sx={{ padding: 5 }}>
        <Typography variant="h6">Sign up or Sign in</Typography>
      </Box>
      <Box sx={{ padding: 10 }}>
        <Typography>
          It helps us know you better, show you things you like, and track your
          progress
        </Typography>
      </Box>
      <Box sx={{ padding: 5 }}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/auth/signin"
        >
          Start Now
        </Button>
      </Box>
      <Box sx={{ padding: 5 }}>
        {showDismissButton && (
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setDismissed(true)}
          >
            Dismiss
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default SignUp
