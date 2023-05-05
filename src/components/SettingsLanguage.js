import React, { useState } from 'react'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import IconButton from '@mui/material/IconButton'
import { languages as languageOptions } from '../assets/options/filters'

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

const LANGUAGE_NOT_HERE = 'My language is not here'

function SettingsLanguage({ setShowComponent }) {
  const { t } = useTranslation()
  const classes = useClasses(styles)
  const auth = useAuth()

  const [languages, setLanguages] = useState(auth?.user?.language ?? [])

  //To Do- make this simpler!
  const handleLanguages = (lan) => {
    if (lan === LANGUAGE_NOT_HERE) {
      setLanguages([])
      return
    } else {
      const isInLanguages = languages.some((language) => language === lan)
      if (isInLanguages) {
        setLanguages(languages.filter((language) => language !== lan))
      } else {
        setLanguages([...languages, lan])
      }
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '650px',
      }}
    >
      <Box sx={{ padding: '1.5rem 0' }}>
        <Typography variant="h5" sx={{ paddingBottom: '10px' }}>
          My language is...
        </Typography>
        <Typography>Or a language I am learning</Typography>
        <Typography>
          So that we can greet and congratulate you in the future
        </Typography>
      </Box>
      <List
        sx={{ width: '100%', maxWidth: 360 }}
        component="nav"
        aria-labelledby="settings-profile"
      >
        {languageOptions.map((language, index) => (
          <ListItem
            key={index}
            sx={{
              backgroundColor: languages.includes(language)
                ? '#6956F1'
                : '#211E34',
              marginBottom: '15px',
              borderRadius: '5px',
            }}
            secondaryAction={
              languages.includes(language) && (
                <IconButton size="large">
                  <CheckCircleIcon sx={{ color: 'white' }} />
                </IconButton>
              )
            }
          >
            <ListItemButton onClick={() => handleLanguages(language)}>
              <ListItemText sx={{ color: 'white' }}>{language}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem
          sx={{
            backgroundColor: !languages.length ? '#6956F1' : '#211E34',
            marginBottom: '15px',
            borderRadius: '5px',
          }}
          secondaryAction={
            !languages.length && (
              <IconButton size="large">
                <CheckCircleIcon sx={{ color: 'white' }} />
              </IconButton>
            )
          }
        >
          <ListItemButton onClick={() => handleLanguages(LANGUAGE_NOT_HERE)}>
            <ListItemText sx={{ color: 'white' }}>
              My language is not here
            </ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
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
            updateUser(auth.user.uid, { language: languages })
            setShowComponent('nav')
          }}
        >
          {t('settings.update')}
        </Button>
      </Box>
    </Box>
  )
}

export default SettingsLanguage
