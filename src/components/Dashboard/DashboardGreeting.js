import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import HandshakeIcon from '@mui/icons-material/Handshake'
import { useTranslation } from 'react-i18next'

import { useAuth } from '../../util/auth'
import { PageHeading } from 'components/PageHeading'

const greetingList = [
  'Tansi',
  'Aaniin',
  'Ullaakuut',
  'Boozhoo',
  'Waachiyaa',
  "Dänch'ea",
]

const getRandomGreeting = () =>
  greetingList[Math.floor(Math.random() * greetingList.length)]

const getUserGreetingText = (user, fallback) => {
  const greetingText = []
  greetingText.push(getRandomGreeting())

  if (user?.displayName) greetingText.push(user?.displayName)
  else if (user?.name) greetingText.push(user?.name)
  else greetingText.push(fallback)

  return greetingText.join(' ')
}

function DashboardGreeting(props) {
  const auth = useAuth()
  const { t } = useTranslation()
  const headingText = getUserGreetingText(auth?.user, t('hello'))

  return (
    <PageHeading
      headingText={
        <Box component="span" display="flex" alignItems="center" gap="0.35em">
          <HandshakeIcon
            alt=""
            fontSize="large"
            sx={{
              backgroundColor: '#0B0919',
              color: 'yellow',
            }}
          />
          <Typography variant="span">{headingText}</Typography>
        </Box>
      }
    />
  )
}

export default DashboardGreeting
