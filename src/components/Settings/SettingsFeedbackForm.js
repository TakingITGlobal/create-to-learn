import React from 'react'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/FormHelperText'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'

export default function SettingsFeedbackForm({
  setShowComponent,
  setOpenSnackbar,
  setSnackbarMessage,
}) {
  const { t } = useTranslation()

  const handleSubmit = (e) => {
    const formData = new FormData(e.target)

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        setShowComponent('nav')
        setOpenSnackbar(true)
        setSnackbarMessage('Thank you for your feedback!')
      })
      .catch((error) => alert(error))
    e.preventDefault()
  }

  return (
    <>
      <Typography variant="decorative">
        {t('settings.provide-feedback')}
      </Typography>
      <Typography variant="secondary">
        {t('settings.feedback-subtitle')}
      </Typography>
      <Box>
        <form
          name="form-feedback"
          method="POST"
          netlify="true"
          onSubmit={(e) => handleSubmit(e)}
          style={{
            paddingTop: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '550px',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input type="hidden" name="form-name" value="form-feedback" />

            <InputLabel htmlFor="name">{t('settings.my-name')}</InputLabel>
            <TextField
              name="feedback-name"
              required
              id="feedback-name"
              variant="outlined"
              fullWidth
            />
            <InputLabel htmlFor="email">{t('settings.my-email')}</InputLabel>
            <TextField
              required
              id="feedback-email"
              name="feedback-email"
              type="email"
              variant="outlined"
              fullWidth
            />
            <InputLabel htmlFor="message">{t('settings.message')}</InputLabel>
            <TextField
              fullWidth
              id="feedback-message"
              name="feedback-message"
              multiline
              rows={8}
              inputProps={{ maxLength: 500 }}
            />
          </Box>

          <Button fullWidth color="info" type="submit">
            {t('btn.submit')}
          </Button>
        </form>
      </Box>
    </>
  )
}
