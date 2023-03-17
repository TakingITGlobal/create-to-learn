import React from 'react'
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import Container from '@material-ui/core/Container'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom'

import { useAuth } from './../util/auth'
import { Link } from './../util/router'

function SettingsProfile() {
  const auth = useAuth()

  const settingsLinks = [
    { title: 'My Account', link: '/settings/my-account' },
    { title: 'Notifications', link: '/settings/notifications' },
    { title: 'Data Usage', link: '/settings/data-usage' },
    { title: 'Help and Support', link: '/settings/help-and-support' },

    { title: 'Legal and About', link: '/settings/legal-and-about' },
  ]

  return (
    <Container>
      <Typography variant="h5">
        {auth?.user ? auth.user.name : 'My Profile'}
      </Typography>
      {auth.user ? <Stats /> : <SignUp />}
      <List
        sx={{ width: '100%', maxWidth: 360 }}
        component="nav"
        aria-labelledby="settings-profile"
      >
        {settingsLinks.map(
          ({ title, link }) =>
            (title !== 'My Account' || auth.user) && (
              <ListItem button component={Link} to={link} key={title}>
                <ListItemText>{title}</ListItemText>
                <ListItemSecondaryAction>
                  <IconButton component={Link} to={link}>
                    <ChevronRightIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ),
        )}
      </List>

      {auth.user && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="outlined"
            onClick={(event) => {
              auth.signout()
            }}
            startIcon={<MeetingRoomIcon />}
          >
            Sign out
          </Button>
        </Box>
      )}
    </Container>
  )
}

export default SettingsProfile

function SignUp() {
  return (
    <Box align="center" sx={{ padding: '30px 10px 10px 10px' }}>
      <Box sx={{ padding: 5 }}>
        <Typography variant="h6">Sign up or Sign in</Typography>
      </Box>
      <Box sx={{ padding: 10 }}>
        <Typography>
          It helps us know you better, show you things you like, and track your
          progress
        </Typography>
      </Box>
      <Button variant="outlined" component={Link} to="/auth/signin">
        Start Now
      </Button>
    </Box>
  )
}

function Stats() {
  return (
    <Box sx={{ padding: '40px 10px 10px 10px' }}>
      <Paper elevation={12}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Box align="center">
              <Typography variant="h5">10</Typography>
              <Typography variant="p">Courses taken</Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box align="center">
              <Typography variant="h5">1053</Typography>
              <Typography variant="p">Minutes watched</Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box align="center">
              <Typography variant="h5">5</Typography>
              <Typography variant="p">Videos completed</Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}
