import { act } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { useAuthForm } from './use-auth-form.hook'

const mockPush = jest.fn()

jest.mock('../util/router', () => ({
  useRouter: () => ({
    push: mockPush,
    query: {
      type: 'foo',
      next: '/foobar',
    },
  }),
}))

describe('useAuthForm hook', () => {
  it('returns type matching useRouter query.type', () => {
    const { result } = renderHook(() => useAuthForm())

    expect(result.current.type).toBe('foo')
  })

  it('returns null formAlert by default', () => {
    const { result } = renderHook(() => useAuthForm())

    expect(result.current.formAlert).toBeNull()
  })

  it('returns handleFormAlert which updates formAlert using provided data', () => {
    const mockFormAlert = { type: 'foo', message: 'bar' }
    const { result } = renderHook(() => useAuthForm())

    act(() => result.current.handleFormAlert(mockFormAlert))

    expect(result.current.formAlert).not.toBeNull()
    expect(result.current.formAlert).toStrictEqual(mockFormAlert)
  })

  it('returns handleAuth which calls router push with useRouter query.next', () => {
    const { result } = renderHook(() => useAuthForm())

    act(() => result.current.handleAuth())

    expect(mockPush).toHaveBeenCalledWith('/foobar')
  })
})
