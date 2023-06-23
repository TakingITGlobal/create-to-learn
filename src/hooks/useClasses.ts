import { useMemo } from 'react'
import { css } from '@emotion/css'
import { useTheme, type Theme } from '@emotion/react'

export type ThemeGenericBuilder<T> = (theme: Theme) => T
export type ThemeGeneric<T> = Record<keyof T, string>

function useClasses<T>(
  customTheme: ThemeGenericBuilder<T> | T,
): ThemeGeneric<T> {
  const theme = useTheme()

  return useMemo(() => {
    const isFunc = typeof customTheme === 'function'
    const rawClasses = isFunc
      ? (customTheme as ThemeGenericBuilder<T>)(theme)
      : customTheme

    const prepared = {} as any
    Object.entries(rawClasses as object).forEach(([key, value = {}]) => {
      prepared[key] = css(value as any)
    })

    return prepared as ThemeGeneric<T>
  }, [customTheme, theme])
}

export default useClasses
