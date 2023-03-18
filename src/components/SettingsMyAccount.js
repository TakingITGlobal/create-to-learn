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
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { Link } from './../util/router'
import { useAuth } from './../util/auth'
import { requireAuth } from './../util/auth'

function SettingsMyAccount(props) {
  const [showComponent, setShowComponent] = useState('nav')

  return (
    <Container>
      {showComponent === 'displayName' && (
        <>
          <Arrowback setShowComponent={setShowComponent} />
          <div>Change Display Name</div>
        </>
      )}

      {showComponent === 'email' && (
        <>
          <Arrowback setShowComponent={setShowComponent} />
          <div>Change email</div>
        </>
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
        <SettingsNav setShowComponent={setShowComponent} />
      )}
    </Container>
  )
}

export default requireAuth(SettingsMyAccount)

function SettingsNav({ setShowComponent }) {
  const auth = useAuth()

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
