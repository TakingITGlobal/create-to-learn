import React, { useState } from 'react'
import Container from '@mui/material/Container'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import { Typography } from '@mui/material'
import ArrowBack from '../ArrowBack'

import { useAuth } from '../../util/auth'

import SettingsFeedbackForm from './SettingsFeedbackForm'
import SettingsBugReportForm from './SettingsBugReportForm'
import SupportNav from './SettingsSupportNav'

function SettingsSupport(props) {
  const auth = useAuth()
  const [showComponent, setShowComponent] = useState('nav')
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState(
    'Thank you for your feedback!',
  )

  return (
    <>
      <Container sx={{
        display: 'flex', 
        justifyContent:'space-between',
        alignItems: 'center',
        padding: '52px 0 34px 0'
        }}>
        <ArrowBack
          showComponent={showComponent}
          setShowComponent={setShowComponent}
        />

        <Typography fontWeight={700} variant="h7">Help and Support</Typography>
        <div>
        </div>
      </Container>
      <Container>
        {showComponent === 'nav' && (
          <>
            <SupportNav auth={auth} setShowComponent={setShowComponent} />
          </>
        )}
        {showComponent === 'verifyEmail' && <div>Verify email support...</div>}
        {showComponent === 'findCourse' && <div>Find a course support...</div>}
        {showComponent === 'createCourse' && <div>Create a course..</div>}
        {showComponent === 'faqs' && <div>Faqs</div>}
        <SettingsFeedbackForm
          showComponent={showComponent}
          setShowComponent={setShowComponent}
          setOpenSnackbar={setOpenSnackbar}
          setSnackbarMessage={setSnackbarMessage}
        />
        <SettingsBugReportForm
          showComponent={showComponent}
          setShowComponent={setShowComponent}
          setOpenSnackbar={setOpenSnackbar}
          setSnackbarMessage={setSnackbarMessage}
        />
        <Snackbar
          open={openSnackbar}
          autoHideDuration={1200}
          onClose={() => setOpenSnackbar(false)}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={() => setOpenSnackbar(false)}
            severity={'success'}
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </Container>
    </>
  )
}

export default SettingsSupport
