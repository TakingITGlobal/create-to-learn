import React, { useState } from 'react'
import Container from '@mui/material/Container'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import EastIcon from '@mui/icons-material/East'

import ArrowBack from '../ArrowBack'
import SettingsInterests from './SettingsInterests'
import SettingsDisplayName from './SettingsDisplayName'
import SettingsCommunity from './SettingsCommunity'
import SettingsEmail from './SettingsEmail'
import SettingsLanguage from './SettingsLanguage'
import SettingsSchools from './SettingsSchools'
import SettingsDeleteAccount from './SettingsDeleteAccount'

import { useTranslation } from 'react-i18next'
import { useAuth } from '../../util/auth'
import { requireAuth } from '../../util/auth'

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

        {showComponent === 'school' && (
          <SettingsSchools setShowComponent={setShowComponent} />
        )}

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
        {showComponent === 'deleteAccount' && (
          <SettingsDeleteAccount
            auth={auth}
            setShowComponent={setShowComponent}
          />
        )}
      </Container>
    </>
  )
}

export default requireAuth(SettingsMyAccount)

function MyAccountNav({ setShowComponent, auth }) {
  const { t } = useTranslation()

  const myAccountLinks = [
    {
      id: 'displayName',
      title: 'Display Name',
      userInfo: auth?.user?.displayName ?? auth.user?.name,
    },
    { id: 'email', title: 'Email', userInfo: auth?.user?.email },
    { id: 'school', title: 'School', userInfo: auth?.user?.school },
    {
      id: 'interests',
      title: 'Interests',
      userInfo: auth?.user?.interests.join(','),
    },
    {
      id: 'language',
      title: 'Language',
      userInfo: auth?.user?.language && auth?.user?.language.join(','),
    },
    {
      id: 'communities',
      title: 'Communities',
      userInfo: auth?.user?.fnmi && auth?.user?.fnmi.join(','),
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
        <ListItem>
          <ListItemButton
            onClick={() => {
              setShowComponent('deleteAccount')
            }}
          >
            <ListItemText>{t('settings.delete-account')}</ListItemText>
            <EastIcon />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  )
}
