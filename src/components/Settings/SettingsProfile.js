import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemButton from '@mui/material/ListItemButton'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import HelpIcon from '@mui/icons-material/Help'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LogoutIcon from '@mui/icons-material/Logout'
import { useState } from 'react'

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'

import SignUp from '../SignUp'
import Stats from './SettingsStats'

import { useAuth } from '../../util/auth'
import { Link } from '../../util/router'
import { useTranslation } from 'react-i18next'
import { PageHeading } from 'components/PageHeading'

function SettingsProfile() {
  const auth = useAuth()
  const { t } = useTranslation()


  const [dialog, setDialog] = useState(false)

  const settingsLinks = [
    {
      title: 'My Account',
      link: '/settings/',
      icon: <AccountCircleIcon />,
    },
    // { title: 'Notifications', link: '/settings/notifications', icon:  },
    /*
    {
      title: 'Data Usage',
      link: '/settings/data-usage',
      icon: <DataUsageIcon />,
    },
    */
    {
      title: 'Help and Support',
      link: '/settings/help-and-support',
      icon: <HelpIcon />,
    },
    {
      title: 'Legal and About',
      link: '/settings/legal-and-about',
      icon: <PrivacyTipIcon />,
    },
  ]

  const { user } = auth

  const displayName = user && (user.displayName ?? user.name)

  return (
    <Container>
      <PageHeading 
      sx ={{
        paddingTop: '52px'
      }}
      headingText={user ? displayName : t('settings.profile')} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: { xs: 'center', md: 'flex-start' },
          padding: '10px 0',
        }}
      >
        {user ? <Stats /> : <SignUp />}
      </Box>
      <List
        sx={{ width: '100%' }}
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
                  <ListItemIcon sx={{ }}>{icon}</ListItemIcon>
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
            <ListItemButton onClick={() => setDialog(true)}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText sx={{ color: 'white' }}>
                {t('settings.sign-out')}
              </ListItemText>
            </ListItemButton>
          <Dialog 
            onClose={() => setDialog(false)} 
            open={dialog}
            fullWidth={ true }
            maxWidth= { "xs" }
          >
            <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: "16px 0",
              justifyContent: 'center',
              alignItems:'center'
            }}
            >
              <Box sx={{ paddingBottom: '16px' }}>
                <Typography variant="h3">{t('settings.sign-out')}</Typography>
              </Box>
              <Box sx={{ paddingBottom: '24px', textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  {t('settings.are-you-sure-sign-out')}
                </Typography>
              </Box>
              <Grid container>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    fullWidth
                    sx = {{
                      padding: "8px",
                      textTransform: "none"
                    }}
                    onClick={() => {
                      auth.signout()
                    }}
                  >
                    {t('settings.yes-sign-out')}
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="text"
                    size="large"
                    sx = {{
                      padding: "8px",
                      borderRadius: "25px"
                    }}
                    fullWidth
                    onClick={() => setDialog(false)}
                  >
                    {t('cancel')}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Dialog>

          </ListItem>
        )}
      </List>
    </Container>
  )
}

export default SettingsProfile
