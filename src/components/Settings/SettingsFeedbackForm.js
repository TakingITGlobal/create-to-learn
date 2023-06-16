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
        <FormControl
          sx={{ width: '100%', gap: '10px' }}
          name="provide-feedback"
          action="/settings/help-and-support"
          method="POST"
          netlify
          data-netlify="true"
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
          <TextField id="feedback-message" multiline rows={8} />
        </FormControl>
        <Button
          color="info"
          sx={{
            backgroundColor: 'white !important',
            color: 'black !important',
          }}
          type="submit"
        >
          {t('btn.submit')}
        </Button>
      </Box>
    </>
  )
}
