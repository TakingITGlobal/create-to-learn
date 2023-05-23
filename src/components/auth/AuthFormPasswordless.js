import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../util/auth'

function AuthFormPasswordless(props) {
  const auth = useAuth()
  const [pending, setPending] = useState(false)
  const { handleSubmit, register, errors, getValues } = useForm()

  const submitHandlersByType = {
    passwordlessStart: ({ email }) => {
      console.log('bob')
      return auth.passwordlessStart(email).then(() => {
        setPending(false)
        props.onAuth(email)
      })
    },
    passwordlessVerify: ({ verificationCode }) => {
      return auth
        .passwordlessVerify('pohageb587@jobbrett.com', verificationCode)
        .then((user) => {
          // Call auth complete handler
          props.onAuth(user)
        })
    },
  }

  // Handle form submission
  const onSubmit = ({ email, verificationCode }) => {
    // Show pending indicator
    setPending(true)

    submitHandlersByType[props.type]({
      email,
    }).catch((error) => {
      setPending(false)

      props.onFormAlert({
        type: 'error',
        message: error.message,
      })
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container={true} spacing={2}>
        {['passwordlessStart'].includes(props.type) && (
          <Grid item={true} xs={12}>
            <TextField
              variant="outlined"
              type="email"
              label="Email"
              name="email"
              placeholder="user@example.com"
              fullWidth={true}
              inputRef={register({
                required: 'Please enter your email',
              })}
            />
          </Grid>
        )}
        {['passwordlessVerify'].includes(props.type) && (
          <Grid item={true} xs={12}>
            <TextField
              variant="outlined"
              type="text"
              label="verificationCode"
              name="verificationCode"
              placeholder="user@example.com"
              error={errors.email ? true : false}
              helperText={errors.email && errors.email.message}
              fullWidth={true}
              inputRef={register({
                required: 'Please enter your code',
              })}
            />
          </Grid>
        )}
        <Grid item={true} xs={12}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            disabled={pending}
            fullWidth={true}
          >
            {!pending && <span>{props.buttonAction}</span>}

            {pending && <CircularProgress size={28} />}
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default AuthFormPasswordless
