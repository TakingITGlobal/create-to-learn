import React, { useState } from 'react'
import Container from '@mui/material/Container'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import Typography from '@mui/material/Typography'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ArrowBack from './ArrowBack'
import { useAuth } from './../util/auth'
import { requireAuth } from './../util/auth'

import SettingsInterests from './SettingsInterests'

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
          <DisplayName auth={auth} setShowComponent={setShowComponent} />
        )}

        {showComponent === 'email' && (
          <Email auth={auth} setShowComponent={setShowComponent} />
        )}

        {showComponent === 'school' && <div>I'm attending...</div>}

        {showComponent === 'interests' && <SettingsInterests />}
        {showComponent === 'language' && <div>My language is...</div>}

        {showComponent === 'communities' && <div>I am ...</div>}
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
      userInfo: auth.user.name,
    },
    { id: 'email', title: 'Email', userInfo: auth.user.email },
    { id: 'school', title: 'School' },
    { id: 'interests', title: 'Interests' },
    { id: 'language', title: 'Language' },
    { id: 'communities', title: 'Communities' },
  ]

  return (
    <>
      <List
        sx={{ width: '100%', maxWidth: 400 }}
        component="nav"
        aria-labelledby="settings-my-account"
      >
        {myAccountLinks.map((accLink) => (
          <ListItem
            button
            onClick={() => {
              setShowComponent(accLink.id)
            }}
            key={accLink.title}
          >
            <ListItemText>{accLink.title}</ListItemText>
            {accLink.userInfo && <Typography> {accLink.userInfo}</Typography>}

            <ListItemSecondaryAction edge="end">
              <ChevronRightIcon />
            </ListItemSecondaryAction>
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

function DisplayName({ auth }) {
  const [name, setName] = useState(auth.user.name)
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ padding: '1.5rem 0' }}>
        <Typography variant="h6">Change Display Name</Typography>
      </Box>
      <TextField
        id="displayName"
        label="DisplayName"
        variant="outlined"
        defaultValue={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Box sx={{ padding: '1.5rem 0' }}>
        <Button
          fullWidth
          variant="outlined"
          onChange={() => auth.updateProfile({ name: name })}
        >
          Update
        </Button>
      </Box>
    </Box>
  )
}

function Email({ auth }) {
  const [email, setEmail] = useState('auth.user.email')
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ padding: '1.5rem 0' }}>
        <Typography variant="h6">Change Email</Typography>
      </Box>
      <TextField
        id="Email"
        label="Email"
        variant="outlined"
        defaultValue={auth.user.email}
        onChange={(e) => setEmail(e.targetValue)}
      />
      <Box
        sx={{
          padding: '1.5rem 0',
        }}
      >
        <Button
          variant="outlined"
          fullWidth
          onChange={() => auth.updateProfile({ email: email })}
        >
          Update
        </Button>
      </Box>
    </Box>
  )
}
