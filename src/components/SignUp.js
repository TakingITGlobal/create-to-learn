import React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { Link } from './../util/router'
import { useTranslation } from 'react-i18next'

function SignUp({ setDismissed = null, showDismissButton = false }) {
  const { t } = useTranslation()

  return (
    <Paper 
      variant="elevation" 
      elevation="1">
      <Box sx={{ paddingBottom: '10px' }}>
        <Typography variant="h3">
          {t('sign-up')}
        </Typography>
      </Box>
      <Box sx={{ paddingBottom: '20px' }}>
        <Typography variant="body2" color="text.secondary">{t('help-us-know-you')}</Typography>
      </Box>
      <Stack direction="row" justifyContent="center" spacing={1}>
        <Button
          variant="contained"
          size='large'
          component={Link}
          to="/sign-up"
        >
          {t('start')}
        </Button>
        {showDismissButton && (
          <Button
            variant="text"
            size='large'
            onClick={() => setDismissed(true)}
          >
            Dismiss
          </Button>
        )}
      </Stack>
    </Paper>
  )
}

export default SignUp
