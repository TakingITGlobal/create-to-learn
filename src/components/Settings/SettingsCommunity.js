import React, { useState } from 'react'

import Typography from '@mui/material/Typography'
import Slide from '@mui/material/Slide'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import IconButton from '@mui/material/IconButton'
import { culturalGroups } from '../../assets/options/filters'

import { updateUser } from '../../util/db'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../util/auth'

const PREFER_NOT_TO_SAY = 'Prefer not to say'
const NONE_OF_THE_ABOVE = 'None of the above'

function SettingsCommunity({ showComponent, setShowComponent }) {
  const { t } = useTranslation()
  const auth = useAuth()

  const [communities, setCommunities] = useState(auth?.user?.fnmi)

  //To Do- make this simpler!
  const handleCommunity = (comm) => {
    if (comm === PREFER_NOT_TO_SAY) {
      setCommunities([''])
      return
    }
    if (comm === PREFER_NOT_TO_SAY) {
      setCommunities([])
      return
    } else {
      const isInCommunities = communities.some(
        (community) => community === comm,
      )
      if (isInCommunities) {
        setCommunities(communities.filter((community) => community !== comm))
      } else {
        setCommunities([...communities, comm].filter((comm) => comm !== ''))
      }
    }
  }

  return (
    showComponent === 'communities' && (
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
          <Box sx={{ padding: '1.5rem 0' }}>
            <Typography variant="h5" fontWeight={700} color={'lavender'} sx={{ paddingBottom: '10px' }}>
              I am ...
            </Typography>
            <Typography>
              Tell us more about you, so we can personalize your experience.
            </Typography>
          </Box>
          <List
            sx={{ width: '100%' }}
            component="nav"
            aria-labelledby="settings-profile"
          >
            {culturalGroups.map((community, index) => (
              <ListItem
                key={index}
                sx={{
                  backgroundColor: communities.includes(community)
                    ? '#6956F1'
                    : '#211E34',
                  marginBottom: '15px',
                  borderRadius: '5px',
                }}
                secondaryAction={
                  communities.includes(community) && (
                    <IconButton size="large">
                      <CheckCircleIcon />
                    </IconButton>
                  )
                }
              >
                <ListItemButton onClick={() => handleCommunity(community)}>
                  <ListItemText>{community}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem
              sx={{
                backgroundColor: communities.includes('') ? '#6956F1' : '#211E34',
                marginBottom: '15px',
                borderRadius: '5px',
              }}
              secondaryAction={
                communities.includes('') && (
                  <IconButton size="large">
                    <CheckCircleIcon />
                  </IconButton>
                )
              }
            >
              <ListItemButton onClick={() => handleCommunity(NONE_OF_THE_ABOVE)}>
                <ListItemText>{t('settings.none-of-the-above')}</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem
              sx={{
                backgroundColor: !communities.length ? '#6956F1' : '#211E34',
                marginBottom: '15px',
                borderRadius: '5px',
              }}
              secondaryAction={
                !communities.length && (
                  <IconButton size="large">
                    <CheckCircleIcon />
                  </IconButton>
                )
              }
            >
              <ListItemButton onClick={() => handleCommunity(PREFER_NOT_TO_SAY)}>
                <ListItemText>{t('settings.prefer-not-to-say')}</ListItemText>
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
              color="primary"
              variant="contained"
              sx = {{
                padding: "16px 24px"
              }}
              onClick={() => {
                updateUser(auth.user.uid, { fnmi: communities })
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

export default SettingsCommunity
