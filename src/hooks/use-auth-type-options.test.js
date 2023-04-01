import { renderHook } from '@testing-library/react-hooks'
import { ROUTE_TYPES } from '../constants/route-types'
import { optionsByType, useAuthTypeOptions } from './use-auth-type-options.hook'
import { useRouteType } from './use-route-type.hook'

jest.mock('./use-route-type.hook')

describe('useAuthTypeOptions hook', () => {
  it('returns options object matching router type', () => {
    useRouteType.mockImplementation(() => ({
      type: ROUTE_TYPES.SIGNIN,
    }))

    const { result } = renderHook(() => useAuthTypeOptions())

    expect(result.current.type).toBe(ROUTE_TYPES.SIGNIN)
    expect(result.current.options).toStrictEqual(
      optionsByType[ROUTE_TYPES.SIGNIN],
    )
  })

  it('defaults to signup if router type is not set', () => {
    useRouteType.mockImplementation(() => ({
      type: '',
    }))

    const { result } = renderHook(() => useAuthTypeOptions())

    expect(result.current.type).toBe(ROUTE_TYPES.SIGNUP)
    expect(result.current.options).toStrictEqual(
      optionsByType[ROUTE_TYPES.SIGNUP],
    )
  })
})
