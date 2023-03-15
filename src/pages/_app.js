import React from 'react'
import Navbar from './../components/Navbar'
import IndexPage from './index'
import AboutPage from './about'
import FaqPage from './faq'
import ContactPage from './contact'
import PricingPage from './pricing'
import DashboardPage from './dashboard'
import BrowsePage from './browse'
import MyCoursesPage from './mycourses'
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
import { ThemeProvider, useDarkMode } from './../util/theme'
import { QueryClientProvider } from './../util/db'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

function App(props) {
  const theme = useTheme()
  const darkMode = useDarkMode()
  const matches = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <QueryClientProvider>
      <ThemeProvider theme={darkMode}>
        <AuthProvider>
          <Chat />
          <Router>
            <>
              <Navbar
                color="default"
                logo="https://uploads.divjoy.com/logo.svg"
                logoInverted="https://uploads.divjoy.com/logo-white.svg"
              />

              <Switch>
                <Route exact path="/" component={IndexPage} />

                <Route exact path="/about" component={AboutPage} />

                <Route exact path="/faq" component={FaqPage} />

                <Route exact path="/contact" component={ContactPage} />

                <Route exact path="/pricing" component={PricingPage} />

                <Route exact path="/dashboard" component={DashboardPage} />

                <Route exact path="/auth/:type" component={AuthPage} />

                <Route exact path="/browse" component={BrowsePage} />

                <Route exact path="/mycourses" component={MyCoursesPage} />

                <Route
                  exact
                  path="/settings/:section"
                  component={SettingsPage}
                />

                <Route exact path="/legal/:section" component={LegalPage} />

                <Route exact path="/auth0-callback" component={Auth0Callback} />

                <Route component={NotFoundPage} />
              </Switch>

              {matches && (
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
              )}
            </>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
