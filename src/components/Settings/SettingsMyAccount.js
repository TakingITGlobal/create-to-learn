import React, { useState } from 'react'
import Container from '@mui/material/Container'

import ArrowBack from '../ArrowBack'
import MyAccountNav from './SettingsMyAccountNav'
import SettingsInterests from './SettingsInterests'
import SettingsDisplayName from './SettingsDisplayName'
import SettingsCommunity from './SettingsCommunity'
import SettingsEmail from './SettingsEmail'
import SettingsLanguage from './SettingsLanguage'
import SettingsSchools from './SettingsSchools'
import SettingsDeleteAccount from './SettingsDeleteAccount'
import { Typography } from '@mui/material'

import { useAuth } from '../../util/auth'
import { requireAuth } from '../../util/auth'

function SettingsMyAccount(props) {
  const auth = useAuth()

  const [showComponent, setShowComponent] = useState('nav');

  const myAccountLinks = [
    {
      id: 'displayName',
      title: 'Display Name',
    },
    { 
      id: 'email', 
      title: 'Email' 
    },
    { 
      id: 'school', 
    title: 'School'
    },
    {
      id: 'interests',
      title: 'Interests',
    },
    {
      id: 'language',
      title: 'Language',
    },
    {
      id: 'communities',
      title: 'Communities',
    },
    {
      id: 'deleteAccount',
      title: 'Delete Account',
    },
  ];

  //ToDo: Make showComponent a custom hook so that we don't have to pass it in like this to each component.

  return (
    <>
      <Container sx={{
        display: 'flex', 
        justifyContent:'space-between',
        alignItems: 'center',
        padding: '52px 0 34px 0'
        }}>
        <ArrowBack
          showComponent={showComponent}
          setShowComponent={setShowComponent}
        />
          <Typography fontWeight={700} variant="h7">{myAccountLinks.find(link => link.id === showComponent)?.title || "My Account"}</Typography>
        <div>
        </div>
      </Container>
      
      <Container>
        <MyAccountNav
          auth={auth}
          showComponent={showComponent}
          setShowComponent={setShowComponent}
        />
        <SettingsDisplayName
          auth={auth}
          showComponent={showComponent}
          setShowComponent={setShowComponent}
        />
        <SettingsEmail
          auth={auth}
          showComponent={showComponent}
          setShowComponent={setShowComponent}
        />
        <SettingsSchools
          showComponent={showComponent}
          setShowComponent={setShowComponent}
        />
        <SettingsInterests
          showComponent={showComponent}
          setShowComponent={setShowComponent}
        />
        <SettingsLanguage
          showComponent={showComponent}
          setShowComponent={setShowComponent}
        />
        <SettingsCommunity
          showComponent={showComponent}
          setShowComponent={setShowComponent}
        />
        <SettingsDeleteAccount
          auth={auth}
          showComponent={showComponent}
          setShowComponent={setShowComponent}
        />
      </Container>
    </>
  )
}

export default requireAuth(SettingsMyAccount)
