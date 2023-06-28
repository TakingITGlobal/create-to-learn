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
import DataUsageIcon from '@mui/icons-material/DataUsage'
import HelpIcon from '@mui/icons-material/Help'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LogoutIcon from '@mui/icons-material/Logout'

import SignUp from '../SignUp'
import Stats from './SettingsStats'

import { useAuth } from '../../util/auth'
import { Link } from '../../util/router'
import { useTranslation } from 'react-i18next'

function SettingsProfile() {
  const auth = useAuth()
  const { t } = useTranslation()

  const settingsLinks = [
    {
      title: 'My Account',
      link: '/settings/my-account',
      icon: <AccountCircleIcon />,
    },
    // { title: 'Notifications', link: '/settings/notifications', icon:  },
    {
      title: 'Data Usage',
      link: '/settings/data-usage',
      icon: <DataUsageIcon />,
    },
    {
      title: 'Help and Support',
      link: '/settings/help-and-support',
      icon: <HelpIcon />,
    },
    {
      title: 'Legal and About',
      link: '/settings/legal-and-about',
      icon: <DataUsageIcon />,
    },
  ]

  const { user } = auth

  const displayName = user && (user.displayName ?? user.name)

  return (
    <Container>
      <Typography variant="h5" sx={{ fontWeight: '700' }}>
        {user ? displayName : t('settings.profile')}
      </Typography>
      <Box
        sx={{ display: 'flex', justifyContent: {xs: 'center' , md: 'flex-start'}, padding: '10px 0' }}
      >
        {user ? <Stats /> : <SignUp />}
      </Box>
      <List
        sx={{ width: '100%'}}
        component="nav"
        aria-labelledby="settings-profile"
      >
        {settingsLinks.map(
          ({ title, link, icon }) =>
            (title !== 'My Account' || user) && (
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
                    <ChevronRightIcon />
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
        {user && (
          <ListItem
            sx={{
              backgroundColor: '#211E34',
              marginBottom: '15px',
              borderRadius: '5px',
            }}
          >
            <ListItemButton onClick={() => auth.signout()}>
              <ListItemIcon>
                <LogoutIcon />
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
