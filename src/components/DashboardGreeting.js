import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import HandshakeIcon from '@mui/icons-material/Handshake'
import { useTranslation } from 'react-i18next'

import { useAuth } from './../util/auth'

function DashboardGreeting(props) {
  const auth = useAuth()
  const { t } = useTranslation()

  return (
    <Stack direction="row" spacing={1} sx={{ padding: '80px 0 10px 0' }}>
      <HandshakeIcon
        fontSize="large"
        sx={{
          backgroundColor: '#0B0919',
          padding: '5px',
          borderRadius: '30%',
          color: 'yellow',
          alignSelf: 'center',
        }}
      />
      <Box sx={{ paddingBottom: '7px' }}>
        {auth.user ? (
          <Box>
            <Typography variant="h1"> Tân'si </Typography>{' '}
            <Typography variant="h1">
              {auth.user.displayName ?? auth.user.name}{' '}
            </Typography>
          </Box>
        ) : (
          <Typography variant="h1">{t('hello')}</Typography>
        )}
      </Box>
    </Stack>
  )
}

export default DashboardGreeting
