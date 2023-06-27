import React, { useState } from 'react'
import useClasses from '../hooks/useClasses'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import Hidden from '@mui/material/Hidden'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Button from '@mui/material/Button'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Section from './Section'
import { Link } from './../util/router'
import { useAuth } from './../util/auth'

const styles = theme => ({
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
  }
});

function Navbar(props) {

  const classes = useClasses(styles)
  const auth = useAuth()
  // const darkMode = useDarkMode()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [menuState, setMenuState] = useState(null)

  // Use inverted logo if specified
  // and we are in dark mode
  // const logo =
  //   props.logoInverted && darkMode.value ? props.logoInverted : props.logo

  const handleOpenMenu = (event, id) => {
    // Store clicked element (to anchor the menu to)
    // and the menu id so we can tell which menu is open.
    setMenuState({ anchor: event.currentTarget, id })
  }

  const handleCloseMenu = () => {
    setMenuState(null)
  }

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
            <Button component={Link} to="/settings/my-profile">
              My Profile
            </Button>
            <div className={classes.spacer} />
            <Hidden smUp={true} implementation="css">
              <IconButton
                onClick={() => {
                  setDrawerOpen(true)
                }}
                color="inherit"
                size="large">
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Hidden smDown={true} implementation="css">
              {!auth.user && (
                <Button variant="contained" component={Link} to="/">
                  Sign in
                </Button>
              )}

              {auth.user && (
                <>
                  <Button
                    color="inherit"
                    aria-label="Account"
                    aria-controls="account-menu"
                    aria-haspopup="true"
                    onClick={(event) => {
                      handleOpenMenu(event, 'account-menu')
                    }}
                  >
                    Account
                    <ExpandMoreIcon className={classes.buttonIcon} />
                  </Button>
                  <Menu
                    id="account-menu"
                    open={
                      menuState && menuState.id === 'account-menu'
                        ? true
                        : false
                    }
                    anchorEl={menuState && menuState.anchor}
                    getContentAnchorEl={undefined}
                    onClick={handleCloseMenu}
                    onClose={handleCloseMenu}
                    keepMounted={true}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                  >
                    <MenuItem component={Link} to="/dashboard">
                      Dashboard
                    </MenuItem>
                    <MenuItem component={Link} to="/settings/profile">
                      Profile
                    </MenuItem>
                  </Menu>
                </>
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
            <ListItem component={Link} to="/" button={true}>
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
  );
}

export default Navbar
