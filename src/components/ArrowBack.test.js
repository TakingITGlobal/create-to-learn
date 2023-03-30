import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import ArrowBack from './ArrowBack'

describe('ArrowBack component', () => {
  it('passes basic a11y testing', async () => {
    // Render the component within a mocked page body
    render(<ArrowBack />, document.body)

    // Use axe-core to test the full page body, including ArrowBack
    const results = await axe(document.body)
    expect(results).toHaveNoViolations()
  })

  it('renders button version by default', () => {
    render(<ArrowBack />)

    expect(screen.getByRole('button').nodeName).toEqual('BUTTON')
    expect(screen.getByLabelText(/back to previous page/i)).toBeInTheDocument()
  })

  it('renders link to settings page when showComponent matches nav', () => {
    // Since we're rendering a router Link, we need to mock the router context
    render(
      <MemoryRouter initialEntries={['/']}>
        <ArrowBack showComponent="nav" />
      </MemoryRouter>,
    )

    expect(screen.getByRole('button').nodeName).toEqual('A')
    expect(screen.getByLabelText(/back to settings page/i)).toBeInTheDocument()
  })

  it('fires setShowComponent when button version is clicked', () => {
    const mockSetShowComponent = jest.fn()
    render(
      <ArrowBack showComponent="foo" setShowComponent={mockSetShowComponent} />,
    )

    userEvent.click(screen.getByRole('button'))
    expect(mockSetShowComponent).toHaveBeenCalledTimes(1)
  })
})
