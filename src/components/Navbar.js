import React from 'react';
import { useLocation } from 'react-router-dom';
import { useState } from 'react'
// MUI
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Hidden from '@mui/material/Hidden';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
// Icons
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import MovieIcon from '@mui/icons-material/Movie';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LogoutIcon from '@mui/icons-material/Logout'
// Other
import Section from './Section';
import { Link } from './../util/router';
import { useAuth } from './../util/auth';
import useClasses from '../hooks/useClasses';
import { useTranslation } from 'react-i18next';

const styles = (theme) => ({
  logo: {
    fontFamily: '"Manrope", "Helvetica", "Arial", sans-serif',
    height: 28,
    color: '#B4ABF8',
    fontSize: 30,
    fontWeight: 700,
    whiteSpace: 'nowrap',
    textDecoration: 'none',
  },

  link: {
    color: '#B4ABF8',
    textDecoration: 'None',
    lineHeight: 1,
    '&:not(:last-of-type)': {
      marginRight: '1.2rem',
    },
  },

})

function Navbar(props) {
  const classes = useClasses(styles)
  const auth = useAuth()
  const drawerWidth = 360;
  const location = useLocation()
  const { t } = useTranslation()

  const hideDrawerOnPages = ['/', '/sign-up']
  const shouldHideDrawer = hideDrawerOnPages.includes(location.pathname)

  const [dialog, setDialog] = useState(false)

  // Lower Nav Links
  const secondNavItems = [
    { text: 'About', link: '/about' },
    { text: 'Lesson Plans', link: '/lesson-plans' },
    { text: 'FAQ', link: '/faq' },
    { text: 'Contact', link: '/contact' }
  ];


  return (
    <Section bgColor={props.color} size="auto">
        <Container disableGutters={true}>
          {!shouldHideDrawer && (
            <Drawer
              sx={{
                width: drawerWidth,
                borderRadius: 0, 
                '& .MuiDrawer-paper': {
                  width: drawerWidth,
                  boxSizing: 'border-box',
                  backgroundColor: '#2a2936',
                  borderRadius: '0'
                },
              }}
              variant="permanent"
              anchor="left"
            >
              <Link to="/dashboard" style={{ textDecoration: 'none', padding: '12px 24px' }}>
                {/* <img src={logo} alt="Logo" className={classes.logo} /> */}
                <span className={classes.logo}>
                  CREATE TO LEARN
                </span>
              </Link>

              {/* Primary Nav Items */}
              <List
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '20px 0',
                }}
              >
                {auth.user ? (
                  <>
                    <Button 
                      component={Link} 
                      to="/dashboard"
                      sx = {{
                        display: 'flex',
                        justifyContent: 'left',
                        gap: '10px',
                      }}
                    >
                      <HomeIcon />
                      Dashboard
                    </Button>
                  </>
                ) : (
                  <></>
                )}

                <Button 
                  component={Link} 
                  to="/browse"
                  sx = {{
                    display: 'flex',
                    justifyContent: 'left',
                    gap: '10px',
                  }}
                >
                  <SearchIcon />
                  Browse
                </Button>

                {auth.user ? (
                  <>
                    <Button 
                      component={Link} 
                      to="/my-courses"
                      sx = {{
                        display: 'flex',
                        justifyContent: 'left',
                        gap: '10px',
                      }}
                    >
                      <MovieIcon />
                      My Courses
                    </Button>

                    <Button 
                      component={Link} 
                      to="/settings/profile"
                      sx = {{
                        display: 'flex',
                        justifyContent: 'left',
                        gap: '10px',
                      }}
                    >
                      <PersonIcon />
                      My Profile
                    </Button>

                    <Button 
                      component={Link} 
                      to="/settings/"
                      sx = {{
                        display: 'flex',
                        justifyContent: 'left',
                        gap: '10px',
                      }}
                    >
                      <SettingsIcon />
                      Settings
                    </Button>
                  </>
                
                ) : (
                  <></>
                )}
              </List>
                
              <Divider color={'white'}/>
                
              {/* Secondary Nav Items */}
              <List sx = {{ marginTop: '20px'}}>
              {secondNavItems.map((item, index) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton component={Link} to={item.link} sx={{ padding: '6px 24px'}}>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
              </List>

              {/* Social Media Icons */}
              <div style={{ marginTop: 'auto' }}>
                <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  paddingBottom: '20px',
                }}>
                {auth.user ? (
                  <>
                  <Button
                        onClick={() => setDialog(true)}
                        component={Link} 
                        to="/settings/profile"
                        sx = {{
                          gap: '10px',
                          background: '#6956F1',
                          borderRadius: '100px',
                          marginBottom: '20px',
                        }}
                      >
                        <LogoutIcon />
                        {t('settings.sign-out')}
                  </Button>
                  <Dialog 
                  onClose={() => setDialog(false)} 
                  open={dialog}
                  fullWidth={ true }
                  maxWidth= { "xs" }
                  >
                  <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: "16px 0",
                    justifyContent: 'center',
                    alignItems:'center'
                  }}
                  >
                    <Box sx={{ paddingBottom: '16px' }}>
                      <Typography variant="h3">{t('settings.sign-out')}</Typography>
                    </Box>
                    <Box sx={{ paddingBottom: '24px', textAlign: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        {t('settings.are-you-sure-sign-out')}
                      </Typography>
                    </Box>
                    <Grid container>
                      <Grid item xs={6}>
                        <Button
                          variant="contained"
                          fullWidth
                          sx = {{
                            padding: "8px",
                            textTransform: "none"
                          }}
                          onClick={() => {
                            auth.signout()
                          }}
                        >
                          {t('settings.yes-sign-out')}
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          variant="text"
                          size="large"
                          sx = {{
                            padding: "8px",
                            borderRadius: "25px"
                          }}
                          fullWidth
                          onClick={() => setDialog(false)}
                        >
                          {t('cancel')}
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Dialog> 
                </>   
                  ) : (
                    <>
                    <Button 
                        component={Link} 
                        to="/sign-up"
                        sx = {{
                          background: '#6956F1',
                          borderRadius: '100px',
                          marginBottom: '20px',
                        }}
                      >
                        {t('sign-up')}
                      </Button>
                      <Button 
                        component={Link} 
                        to="/auth/signin"
                        sx = {{
                          background: 'white',
                          borderRadius: '100px',
                          color: 'black',
                          marginBottom: '20px',
                        }}
                      >
                        {t('sign-in')}
                      </Button>
                    </>                
                    )}
                </div>
                <a
                  href="https://facebook.com/takingitglobal"
                  target="_blank"
                  rel="noreferrer"
                  className={classes.link}
                >
                  <FacebookIcon fontSize="large" />
                </a>
                <a
                  href="https://www.instagram.com/create2learn"
                  target="_blank"
                  rel="noreferrer"
                  className={classes.link}
                >
                  <InstagramIcon fontSize="large" />
                </a>

                <a
                  href="https://www.youtube.com/user/takeitglobal"
                  target="_blank"
                  rel="noreferrer"
                  className={classes.link}
                >
                  <YouTubeIcon fontSize="large" />
                </a>
                
                <a
                  href="https://twitter.com/takingitglobal"
                  target="_blank"
                  rel="noreferrer"
                  className={classes.link}
                >
                  <XIcon fontSize="large" />
                </a>
              </div>

            </Drawer>
          )}
        </Container>
    </Section>
  )
}

export default Navbar
