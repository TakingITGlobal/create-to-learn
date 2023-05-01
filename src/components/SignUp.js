import React from 'react'
import useClasses from '../hooks/useClasses'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { Link } from './../util/router'
import { useTranslation } from 'react-i18next'

const styles = (theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'inherit',
    borderRadius: '12px',
    width: '100%',
    padding: '20px 0',
  },
  title: {
    paddingBottom: '20px',
  },
  helpText: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  stack: {
    alignItems: 'flex-end',
    width: '100%',
  },
  primaryButton: {
    backgroundColor: '#6956F1 !important',
    borderRadius: '35px !important',
    width: '100%',
    height: '50px',
    textTransform: 'capitalize !important',
  },
  dismissButton: {
    backgroundColor: '#413F4C!important',
    borderRadius: '35px !important',
    width: '153.5px',
    height: '40px',
    textTransform: 'capitalize !important',
    color: 'white !important',
    border: '0 !important',
  },
})

function SignUp({ setDismissed = null, showDismissButton = false }) {
  const { t } = useTranslation()

  const classes = useClasses(styles)

  return (
    <Box sx={styles.container} className={classes.container}>
      <Box>
        <Typography variant="h6" className={classes.title}>
          {t('sign-up')}
        </Typography>
      </Box>
      <Box sx={{ paddingBottom: '10px' }}>
        <Typography variant="body2">{t('help-us-know-you')}</Typography>
      </Box>
      <Stack direction="row" spacing={1} className={classes.stack}>
        <Button
          variant="contained"
          className={classes.primaryButton}
          component={Link}
          to="/sign-up"
        >
          {t('start')}
        </Button>
        {showDismissButton && (
          <Button
            variant="outlined"
            className={classes.dismissButton}
            onClick={() => setDismissed(true)}
          >
            Dismiss
          </Button>
        )}
      </Stack>
    </Box>
  )
}

export default SignUp
