import React from 'react'
import useClasses from 'hooks/useClasses'
import { Box, Button, Grid } from '@mui/material'
import { useAuth } from 'util/auth'
import { useRouter } from 'util/router'
import { styles } from './Styles'
import { updateUser } from 'util/db'

export default function FinishView(props) {
  const classes = useClasses(styles)
  const router = useRouter()
  const auth = useAuth()
  const email = localStorage.getItem('email')
  const { values } = props
  const multi = ['fnmi', 'language', 'interests']

  function handleExit() {
    router.push('/dashboard')
  }
  function handleClick() {
    const data = {}
    values.map((val, i) => {
      data[val] = localStorage.getItem(val)
      if (multi.includes(val)) data[val] = data[val].split(',')
    })

    updateUser(auth.user.sub, data)
    handleExit()
  }

  return (
    <Box sx={{ padding: '50px 1em 1em 1em' }}>
      <Grid container item className={classes.gridColumn} md={6}>
        {!auth.user ? (
          <>
            <p>
              We’ve sent a confirmation email to {email}. Please check your
              email to complete account registration
            </p>
          </>
        ) : (
          <>
            <Button
              variant="contained"
              component="button"
              size="lg"
              fullWidth
              onClick={handleClick}
            >
              Finish Setup
            </Button>
          </>
        )}
      </Grid>
    </Box>
  )
}