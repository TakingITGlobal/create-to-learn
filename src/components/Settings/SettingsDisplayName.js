import React, { useState } from 'react'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

import { updateUser } from '../../util/db'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../util/auth'

function SettingsDisplayName({ showComponent, setShowComponent }) {
  const { t } = useTranslation()
  const auth = useAuth()

  const [name, setName] = useState(auth.user.displayName ?? auth.user.name)

  return (
    showComponent === 'displayName' && (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '700px',
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
            color="primary"
            variant="contained"
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
  )
}

export default SettingsDisplayName
