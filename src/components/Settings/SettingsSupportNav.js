import React from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import Button from '@mui/material/Button'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import BugReportIcon from '@mui/icons-material/BugReport'
import EmailIcon from '@mui/icons-material/Email'
import LinkComp from '@mui/material/Link'

import { useTranslation } from 'react-i18next'
import { ListItemButton } from '@mui/material'

export default function SupportNav({ setShowComponent }) {
  const { t } = useTranslation()

  const myAccountLinks = [
    {
      id: 'verifyEmail',
      title: 'Verify Email for new account',
    },
    { id: 'findCourse', title: 'Find specific course' },
    { id: 'requestCourse', title: 'Request a new course' },
    { id: 'createCourse', title: 'Want to create a course myself' },
  ]

  return (
    <>
      <Box sx={{ padding: '.5rem 0 0' }}>
        <h2 variant="h3">Common Questions</h2>
      </Box>
      <List
        sx={{
          width: '100%',
        }}
        component="nav"
        aria-labelledby="settings-support"
      >
        {myAccountLinks.map((accLink) => (
          <ListItem
            disablePadding
            sx={{ borderBottom: '1px solid #333'}}
          >
            <ListItemButton 
              onClick={() => {
                setShowComponent(accLink.id)
              }}
              sx={{padding: '18px 10px 18px 10px'}}
              key={accLink.title}>
              <ListItemText>{accLink.title}</ListItemText>

              <ListItemSecondaryAction edge="end">
                <ChevronRightIcon />
              </ListItemSecondaryAction>
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton 
            to="/faq"
            sx={{padding: '18px 10px 18px 10px'}}
          >
            See all FAQs
          </ListItemButton>
        </ListItem>
      </List>
      <Box sx={{ padding: '.5rem 1rem' }}>
        <h2 variant="h3">Support</h2>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '10px',
          padding: '0 1rem',
        }}
      >
        <Button
          variant="outlined"
          startIcon={<BugReportIcon />}
          onClick={() => setShowComponent('bugReport')}
          sx={{
            padding: '12px 20px 15px',
            maxWidth: '350px'
          }}
        >
          {t('settings.report-bug')}
        </Button>
        <Button
          variant="outlined"
          startIcon={<EmailIcon />}
          onClick={() => setShowComponent('provideFeedback')}
          sx={{
            padding: '12px 20px 15px',
            maxWidth: '350px'
          }}
        >
          {t('settings.provide-feedback')}
        </Button>
      </Box>
    </>
  )
}
