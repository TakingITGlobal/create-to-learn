import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Alert from '@mui/material/Alert'
import Section from '../Section'
import ReauthModal from '../ReauthModal'
import SettingsProfile from './SettingsProfile'
import SettingsMyAccount from './SettingsMyAccount'
import SettingsPassword from './SettingsPassword'
import SettingsNotifications from './SettingsNotifications'
import SettingsDataUsage from './SettingsDataUsage'
import SettingsSupport from './SettingsSupport'
import SettingsLegal from './SettingsLegal'

import { useAuth } from '../../util/auth'

function SettingsSection(props) {
  const auth = useAuth()
  const [formAlert, setFormAlert] = useState(null)

  // State to control whether we show a re-authentication flow
  // Required by some security sensitive actions, such as changing password.
  const [reauthState, setReauthState] = useState({
    show: false,
  })

  const validSections = {
    profile: true,
    'my-account': true,
    password: true,
    notifications: true,
    'data-usage': true,
    'help-and-support': true,
    'legal-and-about': true,
  }

  const section = validSections[props.section] ? props.section : 'my-account'

  // Handle status of type "success", "error", or "requires-recent-login"
  // We don't treat "requires-recent-login" as an error as we handle it
  // gracefully by taking the user through a re-authentication flow.
  const handleStatus = ({ type, message, callback }) => {
    if (type === 'requires-recent-login') {
      // First clear any existing message
      setFormAlert(null)
      // Then update state to show re-authentication modal
      setReauthState({
        show: true,
        // Failed action to try again after reauth
        callback: callback,
      })
    } else {
      // Display message to user (type is success or error)
      setFormAlert({
        type: type,
        message: message,
      })
    }
  }

  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      {reauthState.show && (
        <ReauthModal
          callback={reauthState.callback}
          provider={auth.user.providers[0]}
          onDone={() => setReauthState({ show: false })}
        />
      )}

      <Box mt={5} sx={{ paddingBottom: 15 }}>
        <Container maxWidth="850px" sx={{padding: '0'}}>
          {formAlert && (
            <Box mb={4}>
              <Alert severity={formAlert.type}>{formAlert.message}</Alert>
            </Box>
          )}

          {section === 'profile' && <SettingsProfile onStatus={handleStatus} />}
          {section === 'my-account' && (
            <SettingsMyAccount onStatus={handleStatus} />
          )}

          {section === 'password' && (
            <SettingsPassword onStatus={handleStatus} />
          )}

          {section === 'notifications' && (
            <SettingsNotifications onStatus={handleStatus} />
          )}

          {section === 'data-usage' && (
            <SettingsDataUsage onStatus={handleStatus} />
          )}
          {section === 'help-and-support' && (
            <SettingsSupport onStatus={handleStatus} />
          )}

          {section === 'legal-and-about' && (
            <SettingsLegal onStatus={handleStatus} />
          )}
        </Container>
      </Box>
    </Section>
  )
}

export default SettingsSection
