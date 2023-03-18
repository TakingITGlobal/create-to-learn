import React, { useCallback, useState } from 'react'
import Container from '@material-ui/core/Container'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Typography from '@material-ui/core/Typography'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import DeleteIcon from '@material-ui/icons/Delete'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { Link } from './../util/router'
import { useAuth } from './../util/auth'
import { requireAuth } from './../util/auth'
import { DialerSip } from '@material-ui/icons'

function SettingsMyAccount(props) {
  const auth = useAuth()

  const [showComponent, setShowComponent] = useState('nav')

  return (
    <Container>
      {showComponent === 'displayName' && (
        <DisplayName auth={auth} setShowComponent={setShowComponent} />
      )}

      {showComponent === 'email' && (
        <Email auth={auth} setShowComponent={setShowComponent} />
      )}

      {showComponent === 'school' && (
        <>
          <Arrowback setShowComponent={setShowComponent} />
          <div>I'm attending</div>
        </>
      )}

      {showComponent === 'interests' && (
        <>
          <Arrowback setShowComponent={setShowComponent} />
          <div>I'm interested in...</div>
        </>
      )}

      {showComponent === 'language' && (
        <>
          <Arrowback setShowComponent={setShowComponent} />
          <div>My language is...</div>
        </>
      )}

      {showComponent === 'communities' && (
        <>
          <Arrowback setShowComponent={setShowComponent} />
          <div>I am ...</div>
        </>
      )}
      {showComponent === 'nav' && (
        <SettingsNav auth={auth} setShowComponent={setShowComponent} />
      )}
    </Container>
  )
}

export default requireAuth(SettingsMyAccount)

function SettingsNav({ setShowComponent, auth }) {
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
      <Box sx={{ paddingBottom: 15 }}>
        <IconButton component={Link} to="/settings/profile">
          <ArrowBackIcon />
        </IconButton>
      </Box>
      <Container>
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
      </Container>
    </>
  )
}

function Arrowback({ setShowComponent }) {
  const handleArrowClick = useCallback(() => {
    setShowComponent('nav')
  }, [])
  return (
    <Box sx={{ paddingBottom: 15 }}>
      <IconButton onClick={handleArrowClick}>
        <ArrowBackIcon />
      </IconButton>
    </Box>
  )
}

function DisplayName({ setShowComponent, auth }) {
  const [name, setName] = useState(auth.user.name)
  return (
    <>
      <Arrowback setShowComponent={setShowComponent} />
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
    </>
  )
}

function Email({ setShowComponent, auth }) {
  const [email, setEmail] = useState('auth.user.email')
  return (
    <>
      <Arrowback setShowComponent={setShowComponent} />
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
    </>
  )
}
