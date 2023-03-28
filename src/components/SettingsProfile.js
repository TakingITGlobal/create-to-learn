import React, { useState } from 'react'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'
import Container from '@mui/material/Container'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'
import SignUp from './SignUp'

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
        {auth.user ? auth.user.name : 'My Profile'}
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
                  <IconButton component={Link} to={link} size="large">
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
  );
}

export default SettingsProfile

// function SignUp() {
//   return (
//     <Box align="center" sx={{ padding: '30px 10px 10px 10px' }}>
//       <Box sx={{ padding: 5 }}>
//         <Typography variant="h6">Sign up or Sign in</Typography>
//       </Box>
//       <Box sx={{ padding: 10 }}>
//         <Typography>
//           It helps us know you better, show you things you like, and track your
//           progress
//         </Typography>
//       </Box>
//       <Button variant="outlined" component={Link} to="/auth/signin">
//         Start Now
//       </Button>
//     </Box>
//   )
// }

function Stats() {
  return (
    <Box sx={{ padding: '40px 10px 10px 10px' }}>
      <Paper elevation={12}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Box align="center">
              <Typography variant="h5">10</Typography>
              <Typography variant="body2">Courses taken</Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box align="center">
              <Typography variant="h5">1053</Typography>
              <Typography variant="body2">Minutes watched</Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box align="center">
              <Typography variant="h5">5</Typography>
              <Typography variant="body2">Videos completed</Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}
