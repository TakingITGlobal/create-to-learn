import React from 'react'
import Box from '@material-ui/core/Box'
import Alert from '@material-ui/lab/Alert'
import AuthForm from './AuthForm'
import AuthSocial from './AuthSocial'
import { useAuthForm } from '../hooks/use-auth-form.hook'

function Auth(props) {
  const { formAlert, handleAuth, handleFormAlert } = useAuthForm()

  return (
    <>
      {formAlert && (
        <Box mb={3}>
          <Alert severity={formAlert.type}>{formAlert.message}</Alert>
        </Box>
      )}

      <AuthForm
        type={props.type}
        buttonAction={props.buttonAction}
        onAuth={() => handleAuth(props.afterAuthPath)}
        onFormAlert={handleFormAlert}
      />

      {['signup', 'signin'].includes(props.type) && (
        <>
          {props.providers && props.providers.length && (
            <>
              <Box textAlign="center" fontSize={12} my={2}>
                OR
              </Box>
              <AuthSocial
                buttonAction={props.buttonAction}
                providers={props.providers}
                showLastUsed={true}
                onAuth={() => handleAuth(props.afterAuthPath)}
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
