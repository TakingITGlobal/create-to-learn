import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'

import { categories } from '../../assets/options/categories'
import { useAuth } from '../../util/auth'
import { updateUser } from '../../util/db'
import { useTranslation } from 'react-i18next'

function SettingsInterests({ setShowComponent }) {
  const auth = useAuth()
  const { t } = useTranslation()

  const [interests, setInterests] = useState(auth.user.interests)

  const handleInterests = (category) => {
    if (interests.includes(category)) {
      setInterests(interests.filter((item) => item !== category))
    } else {
      setInterests([...interests, category])
    }
  }
  const clippedCategories = categories.slice(1)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '700px',
      }}
    >
      <Box>
        <Box sx={{ padding: '1.5rem 0' }}>
          <Typography variant="h5">I'm interested in...</Typography>
        </Box>
        <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
          {clippedCategories.splice(1).map((category, index) => {
            const clicked = interests.includes(category.label)
            return (
              <Chip
                key={index}
                label={category.label}
                clickable
                disabled={
                  interests.length === 3 && !interests.includes(category.label)
                }
                onClick={() => handleInterests(category.label)}
                sx={{
                  fontSize: 16,
                  marginLeft: 0,
                  padding: '10px 0',
                  backgroundColor: clicked ? '#6956F1' : '#211E34',
                }}
                variant="default"
              />
            )
          })}
        </Stack>
      </Box>
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
          color="info"
          sx={{ borderRadius: '25px' }}
          onClick={() => {
            updateUser(auth.user.uid, { interests: interests })
            setShowComponent('nav')
          }}
        >
          {t('settings.update')}
        </Button>
      </Box>
    </Box>
  )
}

export default SettingsInterests
