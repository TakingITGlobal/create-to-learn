import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { useAuthForm } from '../../hooks/use-auth-form.hook'
import { useAuthTypeOptions } from '../../hooks/use-auth-type-options.hook'
import Auth from './Auth'

const mockUseAuthFormReturn = {
  formAlert: null,
  handleAuth: jest.fn(),
  handleFormAlert: jest.fn(),
  type: 'signin',
}
const mockUseAuthTypeOptionsReturn = {
  type: 'signin',
  options: {},
}

jest.mock('../../hooks/use-auth-form.hook')
jest.mock('../../hooks/use-auth-type-options.hook')

jest.mock('./AuthForm', () => () => <div data-testid="auth-form" />)
jest.mock('./AuthSocial', () => () => <div data-testid="auth-social" />)

describe('Auth component', () => {
  afterEach(jest.clearAllMocks)

  it('passes basic a11y testing', async () => {
    useAuthForm.mockImplementation(() => mockUseAuthFormReturn)
    useAuthTypeOptions.mockImplementation(() => mockUseAuthTypeOptionsReturn)

    const { container } = render(<Auth />)

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('renders AuthForm and AuthSocial child components', () => {
    useAuthForm.mockImplementation(() => mockUseAuthFormReturn)
    useAuthTypeOptions.mockImplementation(() => mockUseAuthTypeOptionsReturn)

    render(<Auth />)

    expect(screen.getByTestId('auth-form')).toBeInTheDocument()
    expect(screen.getByTestId('auth-social')).toBeInTheDocument()
  })

  it('does not render AuthSocial if type is not signin or signup', () => {
    useAuthForm.mockImplementation(() => mockUseAuthFormReturn)
    useAuthTypeOptions.mockImplementation(() => ({
      ...mockUseAuthTypeOptionsReturn,
      type: 'foobar',
    }))

    render(<Auth />)

    expect(screen.getByTestId('auth-form')).toBeInTheDocument()
    expect(screen.queryByTestId('auth-social')).not.toBeInTheDocument()
  })

  it('displays error message when formAlert is set', () => {
    const errorMessage = 'There is a great big error all up in here'

    useAuthForm.mockImplementation(() => ({
      ...mockUseAuthFormReturn,
      formAlert: {
        type: 'error',
        message: errorMessage,
      },
    }))
    useAuthTypeOptions.mockImplementation(() => mockUseAuthTypeOptionsReturn)

    render(<Auth />)

    expect(screen.getByTestId('auth-form-alert')).toHaveTextContent(
      errorMessage,
    )
  })
})
