import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { useAuthForm } from '../hooks/use-auth-form.hook'
import Auth from './Auth'

const mockProps = {
  buttonAction: jest.fn(),
  providers: ['google', 'facebook'],
}
const mockUseAuthFormReturn = {
  formAlert: null,
  handleAuth: jest.fn(),
  handleFormAlert: jest.fn(),
  type: 'signin',
}

jest.mock('../hooks/use-auth-form.hook')

jest.mock('./AuthForm', () => () => <div data-testid="auth-form" />)

jest.mock('./AuthSocial', () => () => <div data-testid="auth-social" />)

describe('Auth component', () => {
  afterEach(jest.clearAllMocks)

  it('passes basic a11y testing', async () => {
    useAuthForm.mockImplementation(() => mockUseAuthFormReturn)
    const { container } = render(<Auth {...mockProps} />)

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('renders AuthForm and AuthSocial child components', () => {
    useAuthForm.mockImplementation(() => mockUseAuthFormReturn)
    render(<Auth {...mockProps} />)

    expect(screen.getByTestId('auth-form')).toBeInTheDocument()
    expect(screen.getByTestId('auth-social')).toBeInTheDocument()
  })

  it('does not render AuthSocial if type is not signin or signup', () => {
    useAuthForm.mockImplementation(() => ({
      ...mockUseAuthFormReturn,
      type: 'foobar',
    }))
    render(<Auth {...mockProps} />)

    expect(screen.getByTestId('auth-form')).toBeInTheDocument()
    expect(screen.queryByTestId('auth-social')).not.toBeInTheDocument()
  })

  it('does not render AuthSocial if providers array is empty', () => {
    useAuthForm.mockImplementation(() => mockUseAuthFormReturn)
    render(<Auth {...mockProps} providers={[]} />)

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
    render(<Auth {...mockProps} />)

    expect(screen.getByTestId('auth-form-alert')).toHaveTextContent(
      errorMessage,
    )
  })
})
