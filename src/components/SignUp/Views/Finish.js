import React, { useEffect } from 'react'
import useClasses from 'hooks/useClasses'
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material'
import { useAuth } from 'util/auth'
import { useRouter } from 'util/router'
import { styles } from './Styles'
import { updateUser } from 'util/db'
import { useData } from 'util/signupProvider'
import { useSwiperSlide } from 'swiper/react'
import { clearTimeout,setTimeout } from 'timers-browserify'
import { useTranslation } from 'react-i18next'


export default function FinishView(props) {
  const classes = useClasses(styles)
  const router = useRouter()
  const swiperSlide = useSwiperSlide();

  const isActive = swiperSlide.isActive;
  const auth = useAuth()
  const { t } = useTranslation();
  const { data } = useData();
  const email = localStorage.getItem('email')

  
  useEffect(() => {
    let timeoutId;
    
    if(isActive){
      updateUser(auth.user.sub, data);
      timeoutId = setTimeout(() => {
        handleExit();
      }, 5000);
    }
    return () => {
      if(timeoutId) {
        clearTimeout(timeoutId);
      }
    }
  }, [isActive])

  function handleExit() {
    router.push('/dashboard')
  }
  

  return (
    <Box sx={{ padding: '50px 1em 1em 1em' }}>
      <Grid container item className={classes.gridColumn} fullWidth>
        {!auth.user ? (
          <>
            <p>
              We’ve sent a confirmation email to {email}. Please check your
              email to complete account registration
            </p>
          </>
        ) : (
          <>
            <Box fullWidth sx={{marginX: 'auto', width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '4rem'}}>
              <CircularProgress size="33%"/>

            </Box>
            <Box fullWidth sx={{width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '2rem'}}>
              <Typography variant="decorative">
                {t(`onboarding.final.header`)}
              </Typography>
              <Typography variant="secondary" sx={{ color: '#D2CCFB' }}>
                {t(`onboarding.final.header2`)}
              </Typography>
            </Box>
            {/* <Button
              variant="contained"
              component="button"
              size="lg"
              fullWidth
              onClick={handleClick}
            >
              Finish Setup
            </Button> */}
          </>
        )}
      </Grid>
    </Box>
  )
}