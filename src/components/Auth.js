import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import AuthForm from './AuthForm'
import AuthSocial from './AuthSocial'
import { useAuthForm } from '../hooks/use-auth-form.hook'

function Auth({ buttonAction, providers }) {
  const { formAlert, handleAuth, handleFormAlert, type } = useAuthForm()

  return (
    <>
      {formAlert && (
        <Box mb={3} data-testid="auth-form-alert">
          <Alert severity={formAlert.type}>{formAlert.message}</Alert>
        </Box>
      )}

      <AuthForm
        type={type}
        buttonAction={buttonAction}
        onAuth={handleAuth}
        onFormAlert={handleFormAlert}
      />

      {['signup', 'signin'].includes(type) && (
        <>
          {providers && providers.length && (
            <>
              <Box textAlign="center" fontSize={12} my={2}>
                OR
              </Box>
              <AuthSocial
                buttonAction={buttonAction}
                providers={providers}
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
          )}
        </>
      )}
    </>
  )
}

export default Auth
