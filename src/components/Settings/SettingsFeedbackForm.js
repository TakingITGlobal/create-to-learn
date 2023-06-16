import * as React from 'react'

import Drawer from '@mui/material/Drawer'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/FormHelperText'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'

export default function SettingsFeedbackDialog() {
  const { t } = useTranslation()

  const handleSubmit = () => {
    console.log('hello')
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        name: 'dina',
        email: 'dina@heynova.io',
        message: 'testing',
      }).toString(),
    })
      .then(() => console.log('Form successfully submitted'))
      .catch((error) => alert(error))
  }

  return (
    <>
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
          name="provide-feedback"
          action="/settings/help-and-support"
          method="POST"
          data-netlify="true"
          onSubmit={() => handleSubmit()}
        >
          <input type="hidden" name="form-name" value="feedback" />

          <InputLabel htmlFor="my-input">My name</InputLabel>
          <TextField required id="feedback-name" variant="outlined" fullWidth />
          <InputLabel htmlFor="my-input">My email</InputLabel>
          <TextField
            required
            id="feedback-email"
            variant="outlined"
            fullWidth
          />
          <InputLabel htmlFor="my-input">Message</InputLabel>
          <TextField fullWidth id="feedback-message" multiline rows={8} />
          <button type="submit">{t('btn.submit')}</button>
        </form>
      </Box>
    </>
  )
}
