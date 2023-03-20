import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowBack from './ArrowBack'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { useAuth } from './../util/auth'
import { Link } from './../util/router'

function SettingsSupport(props) {
  const auth = useAuth()
  const [showComponent, setShowComponent] = useState('nav')

  return (
    <>
      <ArrowBack
        showComponent={showComponent}
        setShowComponent={setShowComponent}
      />
      <Container>
        {showComponent === 'nav' && (
          <SupportNav auth={auth} setShowComponent={setShowComponent} />
        )}
        {showComponent === 'verifyEmail' && <div>Verify email support...</div>}

        {showComponent === 'findCourse' && <div>Find a course support...</div>}

        {showComponent === 'createCourse' && <div>Create a course..</div>}
      </Container>
    </>
  )
}

export default SettingsSupport

function SupportNav({ setShowComponent }) {
  const myAccountLinks = [
    {
      id: 'verifyEmail',
      title: 'Verify Email for new account',
    },
    { id: 'findCourse', title: 'Find specific course' },
    { id: 'requestCourse', title: 'Request a new course' },
    { id: 'createCourse', title: 'Want to create a course myself' },
  ]

  return (
    <>
      <Box sx={{ padding: '.5rem 1rem' }}>
        <Typography variant="h6">Common Questions</Typography>
      </Box>
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

            <ListItemSecondaryAction edge="end">
              <ChevronRightIcon />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
  )
}
