import React from 'react'
import Box from '@mui/material/Box'
import LinkMui from '@mui/material/Link'
import useClasses from '../hooks/useClasses'
import { Link } from './../util/router'
import { useAuthTypeOptions } from '../hooks/use-auth-type-options.hook'
import { ROUTE_TYPES } from '../constants/route-types'
import { ROUTES } from '../constants/routing'

const styles = theme => ({
  root: {
    fontSize: '0.9rem',
    textAlign: 'center',
    marginTop: theme.spacing(3),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  spacerSmall: {
    display: 'inline-block',
    width: theme.spacing(1),
  },
  spacerMedium: {
    display: 'inline-block',
    width: theme.spacing(2),
  },
})


function AuthFooter(props) {
  const classes = useClasses(styles)
  const { type, options } = useAuthTypeOptions()

  if (!options.showFooter) return null

  return (
    <div className={classes.root}>
      {type === ROUTES.SIGNIN && (
        <>
          {options.showAgreement && (
            <Box mb={2}>
              By signing up, you are agreeing to our{' '}
              <LinkMui component={Link} to={options.termsPath}>
                Terms of Service
              </LinkMui>{' '}
              and{' '}
              <LinkMui component={Link} to={options.privacyPolicyPath}>
                Privacy Policy
              </LinkMui>
              .
            </Box>
          )}

          {options.signinText}
          <span className={classes.spacerSmall} />
          <LinkMui component={Link} to={options.signinPath}>
            {options.signinAction}
          </LinkMui>
        </>
      )}

      {type === ROUTE_TYPES.SIGNIN && (
        <>
          <LinkMui component={Link} to={options.signupPath}>
            {options.signupAction}
          </LinkMui>

          {options.forgotPassAction && (
            <>
              <span className={classes.spacerMedium} />
              <LinkMui component={Link} to={options.forgotPassPath}>
                {options.forgotPassAction}
              </LinkMui>
            </>
          )}
        </>
      )}

      {type === ROUTE_TYPES.FORGOT && (
        <>
          {options.signinText}
          <span className={classes.spacerSmall} />
          <LinkMui component={Link} to={options.signinPath}>
            {options.signinAction}
          </LinkMui>
        </>
      )}
    </div>
  )
}

export default AuthFooter
