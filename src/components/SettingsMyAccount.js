import React from 'react'
import Container from '@material-ui/core/Container'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Typography from '@material-ui/core/Typography'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import DeleteIcon from '@material-ui/icons/Delete'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'

import { useAuth } from './../util/auth'
import { requireAuth } from './../util/auth'

function SettingsMyAccount(props) {
  const auth = useAuth()

  const myAccountLinks = [
    {
      title: 'Display Name',
      userInfo: auth.user.name,
      link: '',
    },
    { title: 'Notifications', userInfo: auth.user.email, link: '' },
    { title: 'School', link: '' },
    { title: 'Interests', link: '' },
    { title: 'Language', link: '' },
    { title: 'Communities', link: '' },
  ]

  return (
    <Container>
      <List
        sx={{ width: '100%', maxWidth: 400 }}
        component="nav"
        aria-labelledby="settings-my-account"
      >
        {myAccountLinks.map((accLink) => (
          <ListItem
            button
            // sx={{ display: 'flex', justifyContent: 'space-between' }}
            key={accLink.title}
          >
            <ListItemText>{accLink.title}</ListItemText>
            {accLink.userInfo && <Typography> {accLink.userInfo}</Typography>}

            <ListItemSecondaryAction edge="end">
              <ChevronRightIcon />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="outlined" startIcon={<DeleteIcon />}>
          Delete Account
        </Button>
      </Box>
    </Container>
  )
}

export default requireAuth(SettingsMyAccount)
