import React, { useState } from 'react'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

import { updateUser } from '../util/db'
import { useTranslation } from 'react-i18next'
import useClasses from '../hooks/useClasses'
import { useAuth } from './../util/auth'

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

function SettingsDisplayName({ setShowComponent }) {
  const { t } = useTranslation()
  const classes = useClasses(styles)
  const auth = useAuth()

  const [name, setName] = useState(auth.user.displayName ?? auth.user.name)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '650px',
      }}
    >
      <Box sx={{ padding: '1.5rem 0' }}>
        <Typography variant="h6">
          {t('settings.change-display-name')}
        </Typography>
      </Box>
      <TextField
        id="displayName"
        label="DisplayName"
        variant="outlined"
        defaultValue={name}
        onChange={(e) => setName(e.target.value)}
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
          onClick={() => {
            updateUser(auth.user.uid, { displayName: name })
            setShowComponent('nav')
          }}
        >
          {t('settings.update')}
        </Button>
      </Box>
    </Box>
  )
}

export default SettingsDisplayName
