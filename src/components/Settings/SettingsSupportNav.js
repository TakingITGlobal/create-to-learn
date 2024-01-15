import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import Button from '@mui/material/Button'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import BugReportIcon from '@mui/icons-material/BugReport'
import EmailIcon from '@mui/icons-material/Email'
import ForumIcon from '@mui/icons-material/Forum'
import LinkComp from '@mui/material/Link'

import { useTranslation } from 'react-i18next'

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
      <Box sx={{ padding: '.5rem 1rem' }}>
        <Typography variant="h6">Common Questions</Typography>
      </Box>
      <List
        sx={{
          width: '100%',
          maxWidth: 400,
        }}
        component="nav"
        aria-labelledby="settings-support"
      >
        {myAccountLinks.map((accLink) => (
          <ListItem
            button
            onClick={() => {
              setShowComponent(accLink.id)
            }}
            key={accLink.title}
          >
            <ListItemText>{accLink.title}</ListItemText>

            <ListItemSecondaryAction edge="end">
              <ChevronRightIcon />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
        <ListItem>
          <LinkComp onClick={() => setShowComponent('faqs')}>
            See all FAQs
          </LinkComp>
        </ListItem>
      </List>
      <Box sx={{ padding: '.5rem 1rem' }}>
        <Typography variant="h6">Support</Typography>
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
        >
          {t('settings.report-bug')}
        </Button>
        <Button
          variant="outlined"
          startIcon={<EmailIcon />}
          onClick={() => setShowComponent('provideFeedback')}
        >
          {t('settings.provide-feedback')}
        </Button>
      </Box>
    </>
  )
}
