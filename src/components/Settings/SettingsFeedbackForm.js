import * as React from 'react'

import Drawer from '@mui/material/Drawer'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/FormHelperText'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'

export default function SettingsFeedbackDialog({ hidden }) {
  const { t } = useTranslation()

  const handleSubmit = (e) => {
    console.log('hello')
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'name:dina',
    })
      .then(() => console.log('Form successfully submitted'))
      .catch((error) => alert(error))
    e.preventDefault()
  }

  return (
    <Box hidden={hidden}>
      <Typography variant="decorative">Provide Feedback</Typography>
      <Typography variant="secondary">
        The following information will be included in your email.
      </Typography>
      <Box
        sx={{
          paddingTop: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '600px',
        }}
      >
        <form
          name="form-feedback"
          method="POST"
          data-netlify="true"
          onSubmit={(e) => handleSubmit(e)}
          data-netlify-honeypot="bot-field"
          hidden={hidden}
        >
          <InputLabel htmlFor="my-input">My name</InputLabel>
          <TextField
            name="feedback-name"
            required
            id="feedback-name"
            variant="outlined"
            fullWidth
          />
          <InputLabel htmlFor="my-input">My email</InputLabel>
          <TextField
            required
            id="feedback-email"
            name="feedback-email"
            variant="outlined"
            fullWidth
          />
          <InputLabel name="feedback-message" htmlFor="my-input">
            Message
          </InputLabel>
          <TextField
            fullWidth
            id="feedback-message"
            name="feedback-message"
            multiline
            rows={8}
          />
          <button type="submit">{t('btn.submit')}</button>
        </form>
      </Box>
    </Box>
  )
}
