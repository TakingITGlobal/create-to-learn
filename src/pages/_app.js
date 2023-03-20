import React from 'react'
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
import { Switch, Route, Router } from './../util/router'
import Auth0Callback from './auth0-callback'
import NotFoundPage from './404'
import Footer from './../components/Footer'
import './../util/analytics'
import Chat from './../components/Chat'
import { AuthProvider } from './../util/auth'
import { ThemeProvider } from './../util/theme'
import { QueryClientProvider } from './../util/db'
import BottomNavbar from '../components/BottomNavbar'
import Hidden from '@material-ui/core/Hidden'
import { useTheme } from '@material-ui/core/styles'

function App(props) {
  //Default to dark theme for now
  const theme = useTheme()
  return (
    <QueryClientProvider>
      <ThemeProvider theme={theme.dark}>
        <AuthProvider>
          <Chat />
          <Router>
            <>
              <Hidden smDown={true}>
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

                <Route
                  exact
                  path="/settings/:section"
                  component={SettingsPage}
                />

                <Route exact path="/legal/:section" component={LegalPage} />

                <Route exact path="/auth0-callback" component={Auth0Callback} />

                <Route component={NotFoundPage} />
              </Switch>
              <Hidden smDown>
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
              <Hidden smUp>
                <BottomNavbar />
              </Hidden>
            </>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
