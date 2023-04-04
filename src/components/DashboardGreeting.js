import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import HandshakeIcon from '@mui/icons-material/Handshake'

import { useAuth } from './../util/auth'

function DashboardGreeting(props) {
  const auth = useAuth()

  return (
    <Stack direction="row" spacing={1} sx={{ padding: '80px 0 10px 0' }}>
      <HandshakeIcon
        fontSize="large"
        sx={{
          backgroundColor: '#0B0919',
          padding: '5px',
          borderRadius: '30%',
          color: 'yellow',
        }}
      />
      <Box sx={{ paddingBottom: '7px' }}>
        {auth.user ? (
          <Box>
            <Typography variant="h4"> Tân'si </Typography>{' '}
            <Typography variant="h4"> {auth.user.name} </Typography>{' '}
          </Box>
        ) : (
          <Typography variant="h4">Hello</Typography>
        )}
      </Box>
    </Stack>
  )
}

export default DashboardGreeting
