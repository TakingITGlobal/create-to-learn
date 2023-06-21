import React from 'react'
import List from '@mui/material/List'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Link } from '../util/router'

function SettingsNav() {
  return (
    <List
      sx={{ width: '100%', bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItem>
        <Button component={Link} to="/settings/my-account">
          <ListItemText>My Account</ListItemText>
        </Button>

        <ListItemSecondaryAction>
          <IconButton size="large">
            <ChevronRightIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>

      <ListItem>
        <Button>
          <ListItemText>Notifications</ListItemText>
        </Button>

        <ListItemSecondaryAction>
          <IconButton size="large">
            <ChevronRightIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>

      <ListItem>
        <Button>
          <ListItemText>Data Usage</ListItemText>
        </Button>

        <ListItemSecondaryAction>
          <IconButton size="large">
            <ChevronRightIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>

      <ListItem>
        <Button>
          <ListItemText>Legal and About</ListItemText>
        </Button>

        <ListItemSecondaryAction>
          <IconButton size="large">
            <ChevronRightIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  )
}

export default SettingsNav
