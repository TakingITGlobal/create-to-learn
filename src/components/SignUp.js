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
    padding: '16px',
    alignItems: 'flex-start',
    backgroundColor: '#413F4C',
    borderRadius: '12px',
    width: '100%',
    height: '192px',
  },
  title: {
    paddingBottom: '20px',
  },
  stack: {
    flexGrow: 1,
    alignItems: 'flex-end',
  },
  primaryButton: {
    backgroundColor: '#6956F1 !important',
    borderRadius: '35px !important',
    width: '153.5px',
    height: '40px',
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
        <Typography variant="h5" className={classes.title}>
          {t('sign-up')}
        </Typography>
      </Box>
      <Box>
        <Typography>{t('help-us-know-you')}</Typography>
      </Box>
      <Stack direction="row" spacing={1} className={classes.stack}>
        <Button
          variant="contained"
          className={classes.primaryButton}
          component={Link}
          to="/auth/signin"
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
