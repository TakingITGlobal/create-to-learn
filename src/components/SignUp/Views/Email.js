import React, { useEffect, useState } from 'react'
import useClasses from 'hooks/useClasses';
import { useSwiper } from 'swiper/react'
import { styles } from './Styles';
import { Alert, Box, Grid } from '@mui/material';
import AuthForm from 'components/auth/AuthForm';
import AuthSocial from 'components/auth/AuthSocial';
import { useData } from 'util/signupProvider';

export default function EmailView() {
  const classes = useClasses(styles);
  const { updateData } = useData();
  const [formAlert, setFormAlert] = useState(null);
  const [email, setEmail] = useState('');
  const swiper = useSwiper();

  useEffect(() => {
    updateData('email', email);
  }, [email, updateData]);

  const handleFormAlert = (data) => {
    setFormAlert(data)
  }

  const handleAuth = (userData) => {
    const userEmail = userData.email
    if (userEmail) {
      setEmail(userEmail);
      swiper.slideNext();
    } else {
      console.error("Email is missing in userData");
    }
  }

  return (
    <Box sx={{ 
      display: 'flex',
      justifyContent: 'center',
      padding: '50px 1em 1em 1em'
      }}>
      <Grid container item className={classes.gridColumn}>
        {formAlert && (
          <Box mb={3}>
            <Alert severity={formAlert.type}>{formAlert.message}</Alert>
          </Box>
        )}
        <AuthForm
          type="signup"
          buttonAction="Sign Up"
          onAuth={handleAuth}
          onFormAlert={handleFormAlert}
        />
        <>
          <Box textAlign="center" fontSize={12} my={2}>
            OR
          </Box>
          <AuthSocial
            buttonAction={'Sign Up'}
            providers={['google', 'facebook']}
            showLastUsed={true}
            onAuth={handleAuth}
            onError={(message) => {
              handleFormAlert({
                type: 'error',
                message: message,
              })
            }}
          />
        </>
      </Grid>
    </Box>
  )
}