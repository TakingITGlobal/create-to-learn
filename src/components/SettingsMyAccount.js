import React from 'react'
import Container from '@material-ui/core/Container'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Typography from '@material-ui/core/Typography'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import DeleteIcon from '@material-ui/icons/Delete'
import Button from '@material-ui/core/Button'

import Box from '@material-ui/core/Box'

import { useAuth } from './../util/auth'
import { Link } from './../util/router'

function SettingsMyAccount(props) {
  const auth = useAuth()
  const { name, email } = auth.user

  return (
    <Container>
      <List
        sx={{ width: '100%', maxWidth: 360 }}
        component="nav"
        aria-labelledby="settings-profile"
      >
        <ListItem
          button
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <ListItemText>Display Name</ListItemText>
          <Typography> {name}</Typography>

          <ListItemSecondaryAction>
            <ChevronRightIcon />
          </ListItemSecondaryAction>
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/settings/password"
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <ListItemText>Email </ListItemText>
          <Typography> {email}</Typography>
          <ListItemSecondaryAction>
            <ChevronRightIcon />
          </ListItemSecondaryAction>
        </ListItem>

        <ListItem button>
          <ListItemText>School</ListItemText>
          <ListItemSecondaryAction>
            <ChevronRightIcon />
          </ListItemSecondaryAction>
        </ListItem>

        <ListItem button>
          <ListItemText>Interests</ListItemText>
          <ListItemSecondaryAction>
            <ChevronRightIcon />
          </ListItemSecondaryAction>
        </ListItem>

        <ListItem button>
          <ListItemText>Language</ListItemText>
          <ListItemSecondaryAction>
            <ChevronRightIcon />
          </ListItemSecondaryAction>
        </ListItem>

        <ListItem button>
          <ListItemText>Communites</ListItemText>
          <ListItemSecondaryAction>
            <ChevronRightIcon />
          </ListItemSecondaryAction>
        </ListItem>
      </List>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="outlined" startIcon={<DeleteIcon />}>
          Delete Account
        </Button>
      </Box>
    </Container>
  )
}

export default SettingsMyAccount
