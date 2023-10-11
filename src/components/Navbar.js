import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Container from '@material-ui/core/Container'
import Toolbar from '@material-ui/core/Toolbar'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Button from '@material-ui/core/Button'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/core/styles'
import Section from './Section'
import { Link } from './../util/router'
import { useAuth } from './../util/auth'

const useStyles = makeStyles((theme) => ({
  logo: {
    height: 28,
    marginRight: theme.spacing(2),
    paddingTop: 0,
    fontFamily: 'Bebas Neue,sans-serif',
    color: theme.primary,
    fontSize: 30,
    fontWeight: 700,
    whiteSpace: 'nowrap',
    textDecoration: 'none',
  },
  drawerList: {
    width: 250,
  },
  spacer: {
    flexGrow: 1,
  },
  toolbar: {
    zIndex: 100,
  },
}))

function Navbar(props) {
  const classes = useStyles()

  const auth = useAuth()
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <Section bgColor={props.color} size="auto">
      <AppBar position="static" color="transparent" elevation={0}>
        <Container disableGutters={true}>
          <Toolbar className={classes.toolbar}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              {/* <img src={logo} alt="Logo" className={classes.logo} /> */}
              <span className={classes.logo}>CREATE TO LEARN</span>
            </Link>
            <Button component={Link} to="/dashboard">
              Dashboard
            </Button>
            <Button component={Link} to="/browse">
              Browse
            </Button>
            <Button component={Link} to="/my-courses">
              My Courses
            </Button>
            {auth.user ? <>
              <Button component={Link} to="/settings/profile">
                My Profile 
              </Button>
            </> : <></>}
            <div className={classes.spacer} />
            <Hidden smUp={true} implementation="css">
              <IconButton
                onClick={() => {
                  setDrawerOpen(true)
                }}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Hidden xsDown={true} implementation="css">
              {!auth.user && (
                <Button component={Link} to="/auth/signin" color="inherit">
                  Sign in
                </Button>
              )}

            </Hidden>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <List
          className={classes.drawerList}
          onClick={() => setDrawerOpen(false)}
        >
          {!auth.user && (
            <ListItem component={Link} to="/auth/signin" button={true}>
              <ListItemText>Sign in</ListItemText>
            </ListItem>
          )}

          {auth.user && (
            <>
              <ListItem component={Link} to="/dashboard" button={true}>
                <ListItemText>Dashboard</ListItemText>
              </ListItem>
              <ListItem component={Link} to="/settings/general" button={true}>
                <ListItemText>Settings</ListItemText>
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </Section>
  )
}

export default Navbar
