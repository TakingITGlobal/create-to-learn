import React, { useState } from 'react';

import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

import { updateUser } from '../../util/db'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../util/auth'

import Slide from '@mui/material/Slide'

function SettingsDisplayName({ showComponent, setShowComponent }) {
  const { t } = useTranslation()
  const auth = useAuth()

  const [name, setName] = useState(auth.user.displayName ?? auth.user.name)


  return (
    showComponent === 'displayName' && (
      <Slide
      direction="left"
      in={showComponent === 'displayName'}
      timeout={600}
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
          id="displayName"
          label={t('settings.change-display-name')}
          variant="outlined"
          defaultValue={name}
          InputLabelProps={{
            shrink: true,
          }}
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
            sx = {{
              padding: "16px 24px"
            }}
            onClick={() => {
              updateUser(auth.user.uid, { displayName: name })
              setShowComponent('nav')
            }}
          >
            {t('settings.update')}
          </Button>
        </Box>
      </Box>
    </Slide>
    )
  )
}

export default SettingsDisplayName
