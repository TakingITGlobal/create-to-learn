import React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { Link } from './../util/router'
import { useTranslation } from 'react-i18next'
import signupIMG from '../assets/images/signup-or-signin.png';


function SignUp({ setDismissed = null, showDismissButton = false }) {
  const { t } = useTranslation()

  return (
    <Paper variant="elevation" elevation="1">
      <Box sx={{ 
        display: 'flex',
        justifyContent: 'space-between',
        paddingBottom: '8px',
        alignItems: 'center',
        }}>
        <Typography variant="h3">{t('sign-up-or')}</Typography>
        <img
          src={signupIMG}
          alt=""
          role="presentation"
          height={'56px'}
          width={'101px'}
        />
      </Box>
      <Box sx={{ paddingBottom: '20px' }}>
        <Typography variant="body2" color="text.secondary">
          {t('help-us-know-you')}
        </Typography>
      </Box>
      <Grid container>
        <Grid item xs={showDismissButton ? 6 : 12}>
          <Button
            variant="contained"
            size="large"
            component={Link}
            fullWidth
            to="/sign-up"
          >
            {t('start')}
          </Button>
        </Grid>
        {showDismissButton && (
          <Grid item xs={6} sx={{textAlign: 'center'}}>
            <Button
              variant="text"
              size="large"
              onClick={() => {
                setDismissed(true)
                localStorage.setItem('dismissSignUp', true)
              }}
            >
              {t('dismiss')}
            </Button>
          </Grid>
        )}
      </Grid>
      <Button
        variant="text"
        component={Link}
        fullWidth
        to="/auth/signin"
        sx={{marginTop: '1em', textTransform: 'none', fontWeight: '500', borderTop: '1px solid #ccc'}}
      >
        {t('or-sign-in')}
      </Button>
    </Paper>
  )
}

export default SignUp
