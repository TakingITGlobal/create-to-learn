import React from 'react'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import { Link } from './../util/router'

function SettingsDataUsage(props) {
  return (
    <>
      <Box sx={{ paddingBottom: 15 }}>
        <IconButton component={Link} to="/settings/profile">
          <ArrowBackIcon />
        </IconButton>
      </Box>
      <Container>
        <List>
          <Typography variant="h6">Data Usage</Typography>
        </List>
      </Container>
    </>
  )
}

export default SettingsDataUsage
