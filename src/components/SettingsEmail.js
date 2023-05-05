import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

import { useTranslation } from 'react-i18next'
import useClasses from '../hooks/useClasses'

const styles = (theme) => ({
  primaryButton: {
    backgroundColor: 'white !important',
    borderRadius: '35px !important',
    width: '100%',
    height: '50px',
    textTransform: 'capitalize !important',
    color: 'black',
  },
})

function SettingsEmail({ auth }) {
  const { t } = useTranslation()
  const classes = useClasses(styles)

  const [email, setEmail] = useState('auth.user.email')

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '650px',
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
          className={classes.primaryButton}
          onChange={() => auth.updateProfile({ email: email })}
        >
          {t('settings.update')}
        </Button>
      </Box>
    </Box>
  )
}

export default SettingsEmail
