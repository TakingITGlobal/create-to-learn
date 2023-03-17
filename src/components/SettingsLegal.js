import React from 'react'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { Link } from './../util/router'

function SettingsLegal(props) {
  return (
    <>
      <Box sx={{ paddingBottom: 15 }}>
        <IconButton component={Link} to="/settings/profile">
          <ArrowBackIcon />
        </IconButton>
      </Box>
      <Container>
        <List>
          <Typography variant="h6">Legal</Typography>
          <ListItem>
            <ListItemText>Privacy Policy</ListItemText>
            <ListItemSecondaryAction>
              <IconButton>
                <ChevronRightIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemText>Terms of Service</ListItemText>
            <ListItemSecondaryAction>
              <IconButton>
                <ChevronRightIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Typography variant="h6">About</Typography>
          <ListItem>
            <ListItemText>About Create to Learn</ListItemText>
            <ListItemSecondaryAction>
              <IconButton>
                <ChevronRightIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemText>About the organization</ListItemText>
            <ListItemSecondaryAction>
              <IconButton>
                <ChevronRightIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Container>
    </>
  )
}

export default SettingsLegal
