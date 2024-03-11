import React, { useState } from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import { Typography } from '@mui/material'
import ArrowBack from '../ArrowBack'
import Slide from '@mui/material/Slide'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
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

  const myAccountLinks = [
    {
      id: 'verifyEmail',
      title: 'Verify Email for new account',
    },
    { 
      id: 'findCourse', 
      title: 'Find specific course'
    },
    { 
      id: 'requestCourse', 
      title: 'Request a new course' 
    },
    { 
      id: 'createCourse', 
      title: 'Want to create a course myself' 
    },
    { 
      id: 'faqs', 
      title: 'Frequently Asked Questions' 
    },
    { 
      id: 'bugReport', 
      title: 'Report a Bug' 
    },
    { 
      id: 'provideFeedback', 
      title: 'Provide Feedback' 
    },

  ]

  return (
    <Container>
      <Box sx={{
        display: 'flex', 
        justifyContent:'space-between',
        alignItems: 'center',
        padding: '20px 0 34px 0'
        }}>
        <ArrowBack
          showComponent={showComponent}
          setShowComponent={setShowComponent}
        />

        <Typography fontWeight={700} variant="h7">{myAccountLinks.find(link => link.id === showComponent)?.title || "Help and Support"}</Typography>
        <div>
        </div>
      </Box>
      <Slide
      direction="left"
      in={showComponent}
      timeout={600}
      mountOnEnter
      unmountOnExit
      >
        <div>
          {showComponent === 'nav' && (
            <>
              <SupportNav auth={auth} setShowComponent={setShowComponent} />
            </>
          )}
          {showComponent === 'verifyEmail' && <div>Verify email support...</div>}
          {showComponent === 'findCourse' && <div>Find a course support...</div>}
          {showComponent === 'createCourse' && <div>Create a course..</div>}
          
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
        </div>
      </Slide>
    </Container>
  )
}

export default SettingsSupport
