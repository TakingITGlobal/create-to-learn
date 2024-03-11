import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

import { useTranslation } from 'react-i18next'

import Slide from '@mui/material/Slide'

function SettingsEmail({ auth, showComponent, setShowComponent }) {
  const { t } = useTranslation()

  const [email, setEmail] = useState('auth.user.email')

  return (
    showComponent === 'email' && (
    <Slide
      direction="left"
      in={showComponent}
      timeout={500}
      mountOnEnter
      unmountOnExit
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '700px',
        }}
      >
        <TextField
          id="Email"
          variant="outlined"
          label={t('settings.change-email')}
          defaultValue={auth.user.email}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setEmail(e.targetValue)}
        />
        <Box
          sx={{
            display: 'flex',
            padding: '1.5rem 0',
            flexGrow: 1,
            alignItems: 'flex-end',
          }}
        >
          <Button
            fullWidth
            color="primary"
            variant="contained"
            sx = {{
              padding: "16px 24px"
            }}
            onChange={() => auth.updateProfile({ email: email })}
          >
            {t('settings.update')}
          </Button>
        </Box>
      </Box>
    </Slide>
    )
  )
}

export default SettingsEmail
