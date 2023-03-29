import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ArrowBack from './ArrowBack'

describe('ArrowBack component', () => {
  it('renders button version by default', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <ArrowBack />
      </MemoryRouter>,
    )

    expect(screen.getByRole('button').nodeName).toEqual('BUTTON')
    expect(screen.getByLabelText(/back to previous page/i)).toBeInTheDocument()
  })

  it('renders link to settings page when showComponent matches nav', () => {
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
      <MemoryRouter initialEntries={['/']}>
        <ArrowBack
          showComponent="foo"
          setShowComponent={mockSetShowComponent}
        />
      </MemoryRouter>,
    )

    userEvent.click(screen.getByRole('button'))
    expect(mockSetShowComponent).toHaveBeenCalled()
  })
})
