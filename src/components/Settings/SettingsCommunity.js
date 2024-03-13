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
  const [disable, setDisable] = useState(communities.includes(PREFER_NOT_TO_SAY));
  //To Do- make this simpler!
  const handleCommunities = (id) => {
    const isSelected = communities.includes(id);
    if (isSelected) {
      setCommunities(currentItems => currentItems.filter(item => item !== id));  
    } else {
      setCommunities(currentItems => [...currentItems, id]);
    }
  }
  const handleNone = () => {
    if(communities.includes(PREFER_NOT_TO_SAY)){
      setDisable(false);
      setCommunities([]);
    } else {
      setDisable(true);
      setCommunities([PREFER_NOT_TO_SAY]);
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
            <h1 variant="h3" fontWeight={700} color={'lavender'} sx={{ paddingBottom: '10px' }}>
              I am ...
            </h1>
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
                disablePadding
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
                <ListItemButton onClick={() => handleCommunities(community)} sx={{padding: '16px 20px'}} disabled={disable}>
                  <ListItemText>{community}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem
              disablePadding
              sx={{
                backgroundColor: communities.includes(NONE_OF_THE_ABOVE) ? '#6956F1' : '#211E34',
                marginBottom: '15px',
                borderRadius: '5px',
              }}
              secondaryAction={
                communities.includes(NONE_OF_THE_ABOVE) && (
                  <IconButton size="large">
                    <CheckCircleIcon />
                  </IconButton>
                )
              }
            >
              <ListItemButton onClick={() => handleCommunities(NONE_OF_THE_ABOVE)} sx={{padding: '16px 20px'}} disabled={disable}>
                <ListItemText>{t('settings.none-of-the-above')}</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem
            disablePadding
              sx={{
                backgroundColor: communities.includes(PREFER_NOT_TO_SAY) ? '#E57373' : '#211E34',
                marginBottom: '15px',
                borderRadius: '5px',
              }}
              secondaryAction={
                communities.includes(PREFER_NOT_TO_SAY) && (
                  <IconButton size="large">
                    <CheckCircleIcon />
                  </IconButton>
                )
              }
            >
              <ListItemButton onClick={() => handleNone()} sx={{padding: '16px 20px'}}>
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
