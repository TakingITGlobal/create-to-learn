import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import HandshakeIcon from '@mui/icons-material/Handshake'
import { useTranslation } from 'react-i18next'

import { useAuth } from '../../util/auth'

function DashboardGreeting(props) {
  const auth = useAuth()
  const { t } = useTranslation()

  const greetingList = [
    'Tansi',
    'Aaniin',
    'Ullaakuut',
    'Boozhoo',
    'Waachiyaa',
    "Dänch'ea",
  ]

  const randomGreeting =
    greetingList[Math.floor(Math.random() * greetingList.length)]

  return (
    <>
      <Stack direction="row" spacing={1}>
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
        <Typography variant="h1"> {randomGreeting}</Typography>
      </Stack>
      <Box>
        {auth.user ? (
          <>
            <Typography variant="h1">
              {auth.user.displayName ?? auth.user.name}
            </Typography>
          </>
        ) : (
          <Typography variant="h1">{t('hello')}</Typography>
        )}
      </Box>
    </>
  )
}

export default DashboardGreeting
