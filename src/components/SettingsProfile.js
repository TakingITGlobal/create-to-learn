import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemButton from '@mui/material/ListItemButton'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import SignUp from './SignUp'
import DataUsageIcon from '@mui/icons-material/DataUsage'
import HelpIcon from '@mui/icons-material/Help'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LogoutIcon from '@mui/icons-material/Logout'

import Stats from './SettingsStats'

import { useAuth } from './../util/auth'
import { Link } from './../util/router'
import { useTranslation } from 'react-i18next'

function SettingsProfile() {
  const auth = useAuth()
  const { t } = useTranslation()

  const settingsLinks = [
    {
      title: 'My Account',
      link: '/settings/my-account',
      icon: <AccountCircleIcon sx={{ color: 'white' }} />,
    },
    // { title: 'Notifications', link: '/settings/notifications', icon:  },
    {
      title: 'Data Usage',
      link: '/settings/data-usage',
      icon: <DataUsageIcon sx={{ color: 'white' }} />,
    },
    {
      title: 'Help and Support',
      link: '/settings/help-and-support',
      icon: <HelpIcon sx={{ color: 'white' }} />,
    },
    {
      title: 'Legal and About',
      link: '/settings/legal-and-about',
      icon: <DataUsageIcon sx={{ color: 'white' }} />,
    },
  ]

  return (
    <Container>
      <Typography variant="h5" sx={{ fontWeight: '700' }}>
        {auth.user ? auth.user.name : t('settings.profile')}
      </Typography>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', paddingTop: '10px' }}
      >
        {auth.user ? <Stats /> : <SignUp />}
      </Box>
      <List
        sx={{ width: '100%', maxWidth: 360 }}
        component="nav"
        aria-labelledby="settings-profile"
      >
        {settingsLinks.map(
          ({ title, link, icon }) =>
            (title !== 'My Account' || auth.user) && (
              <ListItem
                component={Link}
                to={link}
                key={title}
                sx={{
                  backgroundColor: '#211E34',
                  marginBottom: '15px',
                  borderRadius: '5px',
                }}
                secondaryAction={
                  <IconButton component={Link} to={link} size="large">
                    <ChevronRightIcon sx={{ color: 'white' }} />
                  </IconButton>
                }
              >
                <ListItemButton>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText sx={{ color: 'white' }}>{title}</ListItemText>
                </ListItemButton>
              </ListItem>
            ),
        )}
        {auth.user && (
          <ListItem
            sx={{
              backgroundColor: '#211E34',
              marginBottom: '15px',
              borderRadius: '5px',
            }}
          >
            <ListItemButton onClick={() => auth.signout()}>
              <ListItemIcon>
                <LogoutIcon sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText sx={{ color: 'white' }}>
                {t('settings.sign-out')}
              </ListItemText>
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Container>
  )
}

export default SettingsProfile
