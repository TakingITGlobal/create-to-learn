import React from 'react'
import { MobileStepper, Container, Link, Typography } from '@mui/material'
import ArrowBack from '@mui/icons-material/ArrowBack'
import { SwiperNext, SwiperPrev } from './Swipers'
import { useSwipe } from './Swipers'
import { useTranslation } from 'react-i18next'
import ArrowForward from '@mui/icons-material/ArrowForward'


interface ProgressProps {
  start: number
  end: number
  slot: string
}

export const ProgressBar = ({ start, end, slot }: ProgressProps) => {
  const { active, swiper } = useSwipe()

  return (
    <Container slot={slot} sx={{ padding: '1em' }}>
      {active > start ? (
        <MobileStepper
          variant="progress"
          steps={end - start + 1}
          activeStep={active - start}
          position="top"
          sx={{
            padding: '0em',
            position: { md: 'relative' },
          }}
          backButton={
            <SwiperPrev handleClick={() => swiper.slidePrev()}>
              <ArrowBack />
            </SwiperPrev>
          }
          nextButton={undefined}
        />
      ) : active !== 0 ? (
        <SwiperPrev handleClick={() => swiper.slidePrev()}>
          <ArrowBack />
        </SwiperPrev>
      ) : null }
    </Container>
  )
}

export const ProgressDots = (props: ProgressProps) => {
  const { start, end, slot } = props
  const { t } = useTranslation()

  const { active, swiper } = useSwipe()
  return (
    <Container slot={slot}>
      {active >= start && active <= start + 2 ? (
        <MobileStepper
          variant="dots"
          steps={end - start + 1}
          activeStep={active - start}
          position="bottom"
          sx={{
            flexDirection: 'column',
            gap: '30px',
            padding: '20px 1em 20px 1em',
          }}
          nextButton={
            <SwiperNext handleClick={() => swiper.slideNext()}>
              {t('btn.continue')}
              <ArrowForward/>
            </SwiperNext>
          }
          backButton={undefined}
        />
      ) : null}
    </Container>
  )
}
