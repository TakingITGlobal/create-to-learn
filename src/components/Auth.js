import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import AuthForm from './AuthForm'
import AuthSocial from './AuthSocial'
import { useAuthForm } from '../hooks/use-auth-form.hook'
import { useAuthTypeOptions } from '../hooks/use-auth-type-options.hook'
import { PROVIDERS } from '../constants/providers'
import { AUTH_ROUTE_TYPES } from '../constants/route-types'

function Auth() {
  const { formAlert, handleAuth, handleFormAlert } = useAuthForm()
  const { options, type } = useAuthTypeOptions()

  return (
    <>
      {formAlert && (
        <Box mb={3} data-testid="auth-form-alert">
          <Alert severity={formAlert.type}>{formAlert.message}</Alert>
        </Box>
      )}

      <AuthForm
        type={type}
        buttonAction={options.buttonAction}
        onAuth={handleAuth}
        onFormAlert={handleFormAlert}
      />

      {AUTH_ROUTE_TYPES.includes(type) && (
        <>
          {PROVIDERS && PROVIDERS.length && (
            <>
              <Box textAlign="center" fontSize={12} my={2}>
                OR
              </Box>
              <AuthSocial
                buttonAction={options.buttonAction}
                providers={PROVIDERS}
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
