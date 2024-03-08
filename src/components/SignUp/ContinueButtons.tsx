import React from 'react'
import { Container, Box, Button, Stack } from '@mui/material'
import { SwiperNext } from './Swipers'
import { useSwipe } from './Swipers'
import { useTranslation } from 'react-i18next'

interface ContinueButtonProps {
  translationKeys: string[]
  numOfSlides: number
  welcomeLength: number
}

export const ContinueButtons = ({
  translationKeys,
  numOfSlides,
  welcomeLength,
}: ContinueButtonProps) => {
  const { t } = useTranslation()

  const { active, swiper } = useSwipe()
  const emailSlideIndex = 8
  const interestsSlideIndex = 7
  return (
    <Container slot={'container-end'}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          margin: '0',
          position: 'fixed',
          bottom: '0',
          left: '0',
          width: '100%',
          zIndex: '2',
          padding: '14px 10px',
          background: 'rgb(12, 9, 25, .7)',
          backdropFilter: 'blur(2px)'
        }}
      >
        <Stack
          spacing={1}
          sx={{
            alignItems: 'center',
            flexDirection:'column',
          }}
        >
          {active > welcomeLength &&
          active < numOfSlides &&
          active !== emailSlideIndex ? (
            <SwiperNext handleClick={() => swiper.slideNext()}>
              {t('btn.continue')}
            </SwiperNext>
          ) : null}
          {active > welcomeLength && active < interestsSlideIndex ? (
            <Button 
              variant="text" 
              onClick={() => swiper.slideNext()}
              sx={{
                marginY: '8px!important'
              }}
            >
              {t(`onboarding.${translationKeys[active - 4]}.skip-btn`)}
            </Button>
          ) : null}
        </Stack>
      </Box>
    </Container>
  )
}
