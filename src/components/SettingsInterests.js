import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'

import { categories } from '../assets/options/categories'
import { useAuth } from './../util/auth'
import useClasses from '../hooks/useClasses'
import { updateUser } from '../util/db'

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
function SettingsInterests() {
  const auth = useAuth()

  const [interests, setInterests] = useState(auth.user.interests)
  const classes = useClasses(styles)

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
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Box sx={{ padding: '1.5rem 0' }}>
          <Typography variant="h6">I'm interested in...</Typography>
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
                  fontSize: 20,
                  marginLeft: 0,
                  padding: '10px',
                  backgroundColor: clicked ? '#6956F1' : '#211E34',
                }}
                variant="default"
              />
            )
          })}
        </Stack>
      </Box>
      <Box sx={{ flexGrow: 1, padding: '20px 0' }}>
        <Button
          fullWidth
          className={classes.primaryButton}
          onClick={() => updateUser(auth.user.uid, { interests: interests })}
        >
          Update
        </Button>
      </Box>
    </Box>
  )
}

export default SettingsInterests
