import React from 'react'
import { useState } from 'react'
import { useAuth } from '../../util/auth'
import { useTranslation } from 'react-i18next'
import { PageHeading } from 'components/PageHeading'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemButton from '@mui/material/ListItemButton'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import HelpIcon from '@mui/icons-material/Help'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LogoutIcon from '@mui/icons-material/Logout'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import SignUp from '../SignUp'
import Stats from './SettingsStats'

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
      <PageHeading headingText={user ? displayName : t('settings.profile')} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: user ? { xs: 'center', md: 'flex-start' } : 'center',
          padding: '10px 0',
        }}
      >
        {user ? <Stats /> : <SignUp />}
      </Box>
      <nav sx={{ width: '100%' }}
        aria-labelledby="Settings Profile">
        <List>
          {settingsLinks.map(
            ({ title, link, icon }) =>
              (title !== 'My Account' || user) && (
                <ListItem disablePadding
                  key={title}
                  sx={{
                    backgroundColor: '#211E34',
                    marginBottom: '15px',
                    borderRadius: '5px',
                  }}
                >
                  <ListItemButton to={link} sx={{padding: '14px'}}>
                    <ListItemIcon sx={{minWidth: 36}}>{icon}</ListItemIcon>
                    <ListItemText sx={{ color: 'white' }}>{title}</ListItemText>
                    <ChevronRightIcon />
                  </ListItemButton>
                </ListItem>
              ),
          )}
          {user && (
            <ListItem disablePadding
              sx={{
                marginBottom: '15px',
                marginTop: '25px',
              }}
              inline
            >
              <Button variant="outlined" onClick={() => setDialog(true)} sx={{padding: '12px 36px 14px', border: '1px solid #fff', borderRadius: '2rem', width: 'auto'}}>
                <ListItemIcon sx={{minWidth: 36}}>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText sx={{ color: 'white' }}>
                  {t('settings.sign-out')}
                </ListItemText>
              </Button>
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
                <DialogTitle variant="h3">{t('settings.sign-out')}</DialogTitle>
                <Box sx={{ paddingBottom: '24px', textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary" mb="20px">
                    {t('settings.are-you-sure-sign-out')}
                  </Typography>
                </Box>
                <Grid container>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      fullWidth
                      sx = {{
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
      </nav>
    </Container>
  )
}

export default SettingsProfile
