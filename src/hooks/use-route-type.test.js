import { renderHook } from '@testing-library/react-hooks'
import { useRouter } from '../util/router'
import { useRouteType } from './use-route-type.hook'

jest.mock('../util/router')

describe('useRouteType hook', () => {
  it('returns router query.type by default', () => {
    useRouter.mockImplementation(() => ({
      query: {
        type: 'foo',
      },
    }))

    const { result } = renderHook(() => useRouteType())

    expect(result.current.type).toBe('foo')
  })

  it('returns empty string if query.type is not set', () => {
    useRouter.mockImplementation(() => ({
      query: {
        type: null,
      },
    }))

    const { result } = renderHook(() => useRouteType())

    expect(result.current.type).toBe('')
  })
})
