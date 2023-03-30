import React from 'react'
import List from '@mui/materialList'
import ListItemText from '@mui/materialListItemText'
import ListItem from '@mui/materialListItem'
import Container from '@mui/materialContainer'
import ListItemSecondaryAction from '@mui/materialListItemSecondaryAction'
import Box from '@mui/materialBox'
import Button from '@mui/materialButton'
import Typography from '@mui/materialTypography'
import Paper from '@mui/materialaper'
import Grid from '@mui/materialGrid'
import IconButton from '@mui/materialIconButton'
import ChevronRightIcon from '@mui/materialChevronRight'
import MeetingRoomIcon from '@mui/materialMeetingRoom'
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
