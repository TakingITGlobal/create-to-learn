import React, { ReactNode } from 'react'
import { Button } from '@mui/material'

interface SwiperProp {
  children: ReactNode
  handleClick: () => void
}
export const SwiperNext = ({ children, handleClick }: SwiperProp) => {
  return (
    <Button
      color="info"
      sx={{ backgroundColor: 'white !important', color: 'black !important' }}
      fullWidth
      onClick={handleClick}
    >
      {children}
    </Button>
  )
}
export const SwiperPrev = ({ children, handleClick }: SwiperProp) => {
  return (
    <Button
      size="small"
      sx={{ paddingLeft: '0', justifyContent: 'flex-start' }}
      onClick={handleClick}
    >
      {children}
    </Button>
  )
}
