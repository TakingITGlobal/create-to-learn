import React from 'react'
import List from '@material-ui/core/List'
import IconButton from '@material-ui/core/IconButton'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import Container from '@material-ui/core/Container'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { useAuth } from './../util/auth'
import { Link } from './../util/router'

function SettingsProfile() {
  const auth = useAuth()

  return (
    <Container>
      <List
        sx={{ width: '100%', maxWidth: 360 }}
        component="nav"
        aria-labelledby="settings-profile"
      >
        <ListItem button component={Link} to="/settings/my-account">
          <ListItemText>My Account</ListItemText>
          <ListItemSecondaryAction>
            <ChevronRightIcon />
          </ListItemSecondaryAction>
        </ListItem>

        <ListItem button component={Link} to="/settings/notifications">
          <ListItemText>Notifications</ListItemText>
          <ListItemSecondaryAction>
            <ChevronRightIcon />
          </ListItemSecondaryAction>
        </ListItem>

        <ListItem button component={Link} to="/settings/data-usage">
          <ListItemText>Data Usage</ListItemText>
          <ListItemSecondaryAction>
            <ChevronRightIcon />
          </ListItemSecondaryAction>
        </ListItem>

        <ListItem button component={Link} to="/settings/legal-and-about">
          <ListItemText>Legal and About</ListItemText>
          <ListItemSecondaryAction>
            <ChevronRightIcon />
          </ListItemSecondaryAction>
        </ListItem>
      </List>

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
    </Container>
  )
}

export default SettingsProfile
