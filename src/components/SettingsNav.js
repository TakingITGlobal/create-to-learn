import React from 'react'
import List from '@material-ui/core/List'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Collapse from '@material-ui/core/Collapse'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { Link } from '../util/router'

function SettingsNav() {
  const [open, setOpen] = React.useState(true)

  const handleClick = () => {
    setOpen(!open)
  }

  function generate(element) {
    return [0, 1, 2].map((value) =>
      React.cloneElement(element, {
        key: value,
      }),
    )
  }
  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItem>
        <Button component={Link} to="/settings/my-account">
          <ListItemText>My Account</ListItemText>
        </Button>

        <ListItemSecondaryAction>
          <IconButton>
            <ChevronRightIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>

      <ListItem>
        <Button>
          <ListItemText>Notifications</ListItemText>
        </Button>

        <ListItemSecondaryAction>
          <IconButton>
            <ChevronRightIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>

      <ListItem>
        <Button>
          <ListItemText>Data Usage</ListItemText>
        </Button>

        <ListItemSecondaryAction>
          <IconButton>
            <ChevronRightIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>

      <ListItem>
        <Button>
          <ListItemText>Legal and About</ListItemText>
        </Button>

        <ListItemSecondaryAction>
          <IconButton>
            <ChevronRightIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  )
}

export default SettingsNav
