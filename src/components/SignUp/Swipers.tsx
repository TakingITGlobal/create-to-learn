import React, { ReactNode, useState, useEffect } from 'react'
import { useSwiper } from 'swiper/react'
import { Button } from '@mui/material'

interface SwiperProp {
  children: ReactNode
  handleClick: () => void
}

export const SwiperNext = ({ children, handleClick }: SwiperProp) => {
  return (
    <Button
      color="info"
      sx={{ backgroundColor: '#6956f1 !important', color: 'white !important', width: '208px', borderRadius: '50px' }}
      size="medium"
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

export function useSwipe() {
  const [active, setActive] = useState<number>(0)
  const swiper = useSwiper()

  useEffect(() => {
    swiper.on('slideChange', (swipe) => {
      setActive(swipe.activeIndex)
    })
  }, [swiper])

  return { swiper, active }
}
