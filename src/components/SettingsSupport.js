import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Button from '@material-ui/core/Button'
import ArrowBack from './ArrowBack'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import BugReportIcon from '@material-ui/icons/BugReport'
import EmailIcon from '@material-ui/icons/Email'
import ForumIcon from '@material-ui/icons/Forum'
import LinkComp from '@material-ui/core/Link'

import { useAuth } from './../util/auth'

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
        sx={{
          width: '100%',
          maxWidth: 400,
        }}
        component="nav"
        aria-labelledby="settings-support"
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
        <ListItem>
          <LinkComp>See all FAQs </LinkComp>
        </ListItem>
      </List>
      <Box sx={{ padding: '.5rem 1rem' }}>
        <Typography variant="h6">Support</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '10px',
          padding: '0 1rem',
        }}
      >
        <Button variant="outlined" startIcon={<BugReportIcon />}>
          Report a Bug
        </Button>
        <Button variant="outlined" startIcon={<EmailIcon />}>
          Provide Feedback
        </Button>
        <Button variant="outlined" startIcon={<ForumIcon />}>
          Chat Support
        </Button>
      </Box>
    </>
  )
}
