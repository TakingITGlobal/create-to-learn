import { useRouteType } from './use-route-type.hook'
import { ROUTE_TYPES } from '../constants/route-types'
import { ROUTES } from '../constants/routing'

// Options by auth type
const optionsByType = {
  signup: {
    // Top Title
    title: 'Get yourself an account',
    // Button text
    buttonAction: 'Sign up',
    // Footer text and links
    showFooter: true,
    signinText: 'Already have an account?',
    signinAction: 'Sign in',
    signinPath: ROUTES.SIGNIN,
    // Terms and privacy policy agreement
    showAgreement: true,
    termsPath: ROUTES.TERMS,
    privacyPolicyPath: ROUTES.PRIVACY,
  },
  signin: {
    title: 'Welcome back',
    buttonAction: 'Sign in',
    showFooter: true,
    signupAction: 'Create an account',
    signupPath: ROUTES.SIGNUP,
    forgotPassAction: 'Forgot Password?',
    forgotPassPath: ROUTES.FORGOT,
  },
  forgotpass: {
    title: 'Get a new password',
    buttonAction: 'Reset password',
    showFooter: true,
    signinText: 'Remember it after all?',
    signinAction: 'Sign in',
    signinPath: ROUTES.SIGNIN,
  },
  changepass: {
    title: 'Choose a new password',
    buttonAction: 'Change password',
  },
}

export const useAuthTypeOptions = () => {
  const { type } = useRouteType()

  const validAuthType = optionsByType[type] ? type : ROUTE_TYPES.SIGNUP

  return {
    type: validAuthType,
    options: optionsByType[type],
  }
}
