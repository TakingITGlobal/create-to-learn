import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import Button from '@mui/material/Button'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import BugReportIcon from '@mui/icons-material/BugReport'
import EmailIcon from '@mui/icons-material/Email'
import ForumIcon from '@mui/icons-material/Forum'
import LinkComp from '@mui/material/Link'

import ArrowBack from '../ArrowBack'

import { useAuth } from '../../util/auth'

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
