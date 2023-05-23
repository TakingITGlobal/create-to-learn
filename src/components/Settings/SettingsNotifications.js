import React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import { Link } from '../../util/router'

function SettingsNotifications(props) {
  return (
    <>
      <Box sx={{ paddingBottom: 15 }}>
        <IconButton component={Link} to="/settings/profile" size="large">
          <ArrowBackIcon />
        </IconButton>
      </Box>
      <Container>
        <List>
          <Typography variant="h6">Notifications</Typography>
        </List>
      </Container>
    </>
  )
}

export default SettingsNotifications
