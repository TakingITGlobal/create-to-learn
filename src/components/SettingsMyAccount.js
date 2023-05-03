import React, { useState } from 'react'
import Container from '@mui/material/Container'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import ListItemButton from '@mui/material/ListItemButton'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ArrowBack from './ArrowBack'
import { useAuth } from './../util/auth'
import { requireAuth } from './../util/auth'

import SettingsInterests from './SettingsInterests'
import SettingsDisplayName from './SettingsDisplayName'
import SettingsCommunity from './SettingsCommunity'
import SettingsEmail from './SettingsEmail'
import SettingsLanguage from './SettingsLanguage'

function SettingsMyAccount(props) {
  const auth = useAuth()

  const [showComponent, setShowComponent] = useState('nav')

  return (
    <>
      <ArrowBack
        showComponent={showComponent}
        setShowComponent={setShowComponent}
      />
      <Container>
        {showComponent === 'displayName' && (
          <SettingsDisplayName
            auth={auth}
            setShowComponent={setShowComponent}
          />
        )}

        {showComponent === 'email' && (
          <SettingsEmail auth={auth} setShowComponent={setShowComponent} />
        )}

        {showComponent === 'school' && <div>I'm attending...</div>}

        {showComponent === 'interests' && (
          <SettingsInterests setShowComponent={setShowComponent} />
        )}
        {showComponent === 'language' && (
          <SettingsLanguage setShowComponent={setShowComponent} />
        )}

        {showComponent === 'communities' && (
          <SettingsCommunity setShowComponent={setShowComponent} />
        )}
        {showComponent === 'nav' && (
          <MyAccountNav auth={auth} setShowComponent={setShowComponent} />
        )}
      </Container>
    </>
  )
}

export default requireAuth(SettingsMyAccount)

function MyAccountNav({ setShowComponent, auth }) {
  const myAccountLinks = [
    {
      id: 'displayName',
      title: 'Display Name',
      userInfo: auth?.user?.displayName ?? auth.user.name,
    },
    { id: 'email', title: 'Email', userInfo: auth?.user?.email },
    { id: 'school', title: 'School', userInfo: auth?.user.school },
    {
      id: 'interests',
      title: 'Interests',
      userInfo: auth?.user.interests.join(','),
    },
    {
      id: 'language',
      title: 'Language',
      userInfo: auth?.user.language.join(','),
    },
    {
      id: 'communities',
      title: 'Communities',
      userInfo: auth?.user?.fnmi.join(','),
    },
  ]

  return (
    <>
      <List
        sx={{ width: '100%', maxWidth: 450 }}
        component="nav"
        aria-labelledby="settings-my-account"
      >
        {myAccountLinks.map((accLink) => (
          <ListItem
            onClick={() => {
              setShowComponent(accLink.id)
            }}
            key={accLink.title}
            secondaryAction={<ChevronRightIcon />}
          >
            <ListItemButton>
              <Grid container>
                <Grid item xs={accLink.userInfo ? 7 : 12}>
                  <Typography>{accLink.title}</Typography>
                </Grid>
                {accLink.userInfo && (
                  <Grid item xs={5}>
                    <Typography noWrap> {accLink.userInfo}</Typography>
                  </Grid>
                )}
              </Grid>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="outlined" startIcon={<DeleteIcon />}>
          Delete Account
        </Button>
      </Box>
    </>
  )
}
