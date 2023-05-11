import React, { useEffect,useContext, useState } from 'react'
import Navbar from './../components/Navbar'
import IndexPage from './index'
import AboutPage from './about'
import FaqPage from './faq'
import ContactPage from './contact'
import PricingPage from './pricing'
import DashboardPage from './dashboard'
import BrowsePage from './browse'
import MyCoursesPage from './myCourses'
import AuthPage from './auth'
import SettingsPage from './settings'
import LegalPage from './legal'
import { Switch, Route, Router, useLocation } from './../util/router'
import Auth0Callback from './auth0-callback'
import Verified from './verified'
import NotFoundPage from './404'
import Footer from './../components/Footer'
import './../util/analytics'
import Chat from './../components/Chat'
import { AuthProvider } from './../util/auth'
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import { c2learn  } from './../util/theme'
import CssBaseline from '@mui/material/CssBaseline'
import { StyledEngineProvider } from '@mui/material/styles'
import { QueryClientProvider } from './../util/db'
import { DataProvider } from './../util/dataProvider'
import BottomNavbar from '../components/BottomNavbar'
import Hidden from '@mui/material/Hidden'
import { Box } from '@mui/material'
import SignUpPage from './signUp'
import CoursePage from './course'
import CreatorPage from './creator'


const LocationProvider = ({children}) => {
  const {pathname} = useLocation()
  // useEffect(() => {
  //   if(pathname.includes('/course/')){
  //     var id = localStorage.getItem('courseId')
  //     var progress = localStorage.getItem('courseProgress')
  //     console.log('id: ' + id)
  //     console.log('progress: ' + progress)

  //     localStorage.removeItem('courseId')
  //     localStorage.removeItem('courseProgress')
  //   }
  // },[pathname])
  return(<>{children}</>)
}

function App(props) {
  const theme = useTheme();
  const darkTheme = createTheme(c2learn('dark'));

  return (
    <QueryClientProvider>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <DataProvider>
            <AuthProvider>
              <Chat />
              <Router>
                <LocationProvider>
                  <Hidden mdDown>
                    <Navbar
                      color="default"
                      logo="https://uploads.divjoy.com/logo.svg"
                      logoInverted="https://uploads.divjoy.com/logo-white.svg"
                    />
                  </Hidden>
                  <Switch>
                    <Route exact path="/" component={IndexPage} />

                    <Route exact path="/about" component={AboutPage} />

                    <Route exact path="/faq" component={FaqPage} />

                    <Route exact path="/contact" component={ContactPage} />

                    <Route exact path="/pricing" component={PricingPage} />

                    <Route exact path="/dashboard" component={DashboardPage} />

                    <Route exact path="/auth/:type" component={AuthPage} />

                    <Route exact path="/browse" component={BrowsePage} />

                    <Route exact path="/my-courses" component={MyCoursesPage} />

                    <Route exact path="/sign-up" component={SignUpPage} />

                    <Route
                      exact
                      path="/course/:courseId"
                      component={CoursePage}
                    />

                    <Route
                      exact
                      path="/creator/:creatorId"
                      component={CreatorPage}
                    />

                    <Route
                      exact
                      path="/settings/:section"
                      component={SettingsPage}
                    />

                    <Route exact path="/legal/:section" component={LegalPage} />

                    <Route
                      exact
                      path="/auth0-callback"
                      component={Auth0Callback}
                    />
                    <Route
                      exact
                      path="/verified"
                      component={Verified}
                    />

                    <Route component={NotFoundPage} />
                  </Switch>
                  <Hidden mdDown>
                    <Footer
                      bgColor="light"
                      size="normal"
                      bgImage=""
                      bgImageOpacity={1}
                      description="A short description of what you do here"
                      copyright={`© ${new Date().getFullYear()} Company`}
                      logo="https://uploads.divjoy.com/logo.svg"
                      logoInverted="https://uploads.divjoy.com/logo-white.svg"
                      sticky={true}
                    />
                  </Hidden>
                  <Hidden mdUp>
                    <BottomNavbar />
                  </Hidden>
                </LocationProvider>
              </Router>
            </AuthProvider>
          </DataProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </QueryClientProvider>
  )
}

export default App
