import React, { useState } from 'react'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/FormHelperText'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { useTranslation } from 'react-i18next'

export default function SettingsBugReportForm({
  showComponent,
  setShowComponent,
  setOpenSnackbar,
  setSnackbarMessage,
}) {
  const { t } = useTranslation()
  const [issueOption, setIssueOption] = useState('default')

  const handleSubmit = (e) => {
    const formData = new FormData(e.target)

    console.log(formData, e.target)

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        setShowComponent('nav')
        setOpenSnackbar(true)
        setSnackbarMessage('Thank you for your report!')
      })
      .catch((error) => alert(error))
    e.preventDefault()
  }

  return (
    showComponent === 'bugReport' && (
      <>
        <Typography variant="decorative">{t('settings.report-bug')}</Typography>
        <Typography variant="secondary">
          {t('settings.feedback-subtitle')}
        </Typography>
        <form
          name="form-bug-report"
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
          <Box>
            <input type="hidden" name="form-name" value="form-bug-report" />
            <InputLabel htmlFor="name">{t('settings.my-name')}</InputLabel>
            <TextField
              name="bug-report-name"
              required
              id="bug-report-name"
              variant="outlined"
              fullWidth
            />
            <InputLabel htmlFor="email">{t('settings.my-email')}</InputLabel>
            <TextField
              required
              id="bug-report-email"
              name="bug-report-email"
              type="email"
              variant="outlined"
              fullWidth
            />
            <InputLabel id="issue-select">Issue type</InputLabel>

            <Select
              labelId="issue-select"
              name="bug-report-issue"
              id="issue-select"
              value={issueOption}
              onChange={(e) => setIssueOption(e.target.value)}
              label=""
              fullWidth
            >
              <MenuItem value={'default'}>Choose an issue type...</MenuItem>
              <MenuItem value={'issue-1'}>Issue type 1</MenuItem>
              <MenuItem value={'issue-2'}>Issue type 2 </MenuItem>
              <MenuItem value={'issue-3'}>Issue type 3</MenuItem>
            </Select>
            <InputLabel htmlFor="tell-us-more">
              {t('settings.tell-us-more')}
            </InputLabel>
            <TextField
              fullWidth
              id="bug-report-message"
              name="bug-report-message"
              multiline
              rows={8}
              inputProps={{ maxLength: 500 }}
            />
          </Box>
          <Button fullWidth color="info" type="submit">
            {t('btn.submit')}
          </Button>
        </form>
      </>
    )
  )
}
