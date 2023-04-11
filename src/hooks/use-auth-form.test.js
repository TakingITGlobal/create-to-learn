import { act } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { useRouter } from '../util/router'
import { useAuthForm } from './use-auth-form.hook'

const mockPush = jest.fn()
const mockQuery = {
  type: 'foo',
  next: '/bar',
}
const mockUseRouterReturn = {
  push: mockPush,
  query: mockQuery,
}

jest.mock('../util/router')

describe('useAuthForm hook', () => {
  it('returns null formAlert by default', () => {
    useRouter.mockImplementation(() => mockUseRouterReturn)
    const { result } = renderHook(() => useAuthForm())

    expect(result.current.formAlert).toBeNull()
  })

  it('returns handleFormAlert which updates formAlert using provided data', () => {
    const mockFormAlert = { type: 'foo', message: 'bar' }

    useRouter.mockImplementation(() => mockUseRouterReturn)
    const { result } = renderHook(() => useAuthForm())

    act(() => result.current.handleFormAlert(mockFormAlert))

    expect(result.current.formAlert).not.toBeNull()
    expect(result.current.formAlert).toStrictEqual(mockFormAlert)
  })

  it('returns handleAuth which calls router push with useRouter query.next', () => {
    useRouter.mockImplementation(() => mockUseRouterReturn)
    const { result } = renderHook(() => useAuthForm())

    act(() => result.current.handleAuth())

    expect(mockPush).toHaveBeenCalledWith(mockQuery.next)
  })

  it('returns dashboard route for handleAuth if query.next is not found', () => {
    useRouter.mockImplementation(() => ({
      ...mockUseRouterReturn,
      query: { ...mockQuery, next: null },
    }))
    const { result } = renderHook(() => useAuthForm())

    act(() => result.current.handleAuth())

    expect(mockPush).toHaveBeenCalledWith('/dashboard')
  })
})
