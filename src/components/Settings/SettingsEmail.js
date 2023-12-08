import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

import { useTranslation } from 'react-i18next'

function SettingsEmail({ auth, showComponent, setShowComponent }) {
  const { t } = useTranslation()

  const [email, setEmail] = useState('auth.user.email')

  return (
    showComponent === 'email' && (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '700px',
        }}
      >
        <Box sx={{ padding: '1.5rem 0' }}>
          <Typography variant="h6">{t('settings.change-email')}</Typography>
        </Box>
        <TextField
          id="Email"
          label="Email"
          variant="outlined"
          defaultValue={auth.user.email}
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
            sx={{ borderRadius: '25px' }}
            onChange={() => auth.updateProfile({ email: email })}
          >
            {t('settings.update')}
          </Button>
        </Box>
      </Box>
    )
  )
}

export default SettingsEmail
