import { renderHook } from '@testing-library/react-hooks'
import { ROUTES } from '../constants/routing'
import { useRouter } from '../util/router'
import { useAfterAuthPath } from './use-after-auth-path.hook'

jest.mock('../util/router')

describe('useAfterAuthPath hook', () => {
  it('returns router query.next value by default', () => {
    useRouter.mockImplementation(() => ({
      query: {
        next: 'foo',
      },
    }))
    const { result } = renderHook(() => useAfterAuthPath())

    expect(result.current.afterAuthPath).toBe('foo')
  })

  it('returns dashboard route if next query.next is not set', () => {
    useRouter.mockImplementation(() => ({
      query: {
        next: null,
      },
    }))
    const { result } = renderHook(() => useAfterAuthPath())

    expect(result.current.afterAuthPath).toBe(ROUTES.DASHBOARD)
  })
})
