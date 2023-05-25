import React, { useState, useEffect } from 'react'
import useClasses from '../hooks/useClasses'
import Section from './Section'
import { useTranslation } from 'react-i18next'
import { A11y, Keyboard } from 'swiper'
import { MobileStepper, Button, Box, Container, Link } from '@mui/material'
import ArrowBack from '@mui/icons-material/ArrowBack'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/a11y'
import 'swiper/css/keyboard'
import {
  InputSearchView,
  InputSelectView,
  InputTextView,
  WindowView,
  WelcomeView,
  EmailView,
  FinishView,
} from './OnboardingView'
import schoolData from '../assets/options/schools.json'
import welcome from '../assets/images/welcome2.png'
import juggling from '../assets/images/juggling.png'
import gardening from '../assets/images/gardening.png'
import toolbelt from '../assets/images/toolbelt.png'

const SlotStart = 'container-start'
const SlotEnd = 'container-end'
const styles = (theme) => ({
  swiper: {
    width: '100%',
    '& .swiper-slide': {
      display: 'flex',
      maxWidth: theme.breakpoints.md,
    },
  },
})

const SwiperNext = ({ children }) => {
  const swiper = useSwiper()
  return (
    <Button
      variant="secondary"
      size="sm"
      fullWidth
      onClick={() => swiper.slideNext()}
    >
      {children}
    </Button>
  )
}
const SwiperPrev = ({ children }) => {
  const swiper = useSwiper()
  return (
    <Button
      size="sm"
      sx={{ paddingLeft: '0', justifyContent: 'flex-start' }}
      onClick={() => swiper.slidePrev()}
    >
      {children}
    </Button>
  )
}
const ProgressBar = (props) => {
  const { start, end, slot } = props
  const swiper = useSwiper()
  const [active, setActive] = useState(0)
  useEffect(() => {
    swiper.on('slideChange', (swipe) => {
      setActive(swipe.activeIndex)
    })
  }, [swiper])
  return (
    <Container slot={slot} sx={{ padding: '1em' }}>
      {active > start ? (
        <MobileStepper
          variant="progress"
          steps={end - start + 1}
          activeStep={active - start}
          position="top"
          sx={{ padding: '1em' }}
          backButton={
            <SwiperPrev>
              <ArrowBack />
            </SwiperPrev>
          }
        />
      ) : active == 0 ? (
        <Link
          href="/dashboard"
          variant="subtitle1"
          underline="hover"
          p="0.75rem 1.5rem 0.75em 0"
          display="block"
        >
          <ArrowBack /> Back to Dashboard
        </Link>
      ) : (
        <SwiperPrev>
          <ArrowBack />
        </SwiperPrev>
      )}
    </Container>
  )
}

const ProgressDots = (props) => {
  const { start, end, slot } = props
  const { t } = useTranslation()
  const swiper = useSwiper()
  const classes = useClasses(styles)
  const [active, setActive] = useState(0)

  useEffect(() => {
    swiper.on('slideChange', (swipe) => {
      setActive(swipe.activeIndex)
    })
  }, [swiper])
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
            padding: '0 1em 40px 1em',
          }}
          nextButton={<SwiperNext>{t('btn.continue')}</SwiperNext>}
        />
      ) : null}
    </Container>
  )
}

function SignUpSection(props) {
  const { t } = useTranslation()
  const classes = useClasses(styles)
  const welcomeLength = 3
  const inputLength = 4
  const [active, setActive] = useState(0)
  const [formProgress, setFormProgress] = useState(2)

  return (
    <Section
      bgColor={props.bgColor}
      size="auto"
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Swiper modules={[A11y, Keyboard]} autoHeight="true">
        <SwiperSlide sx={{ height: '600px' }}>
          <WelcomeView image={welcome} />
        </SwiperSlide>
        <ProgressBar
          start={welcomeLength}
          end={welcomeLength + inputLength}
          slot={SlotStart}
        />
        <SwiperSlide>
          <WindowView image={juggling} text={t('onboarding.screen-1')} />
        </SwiperSlide>
        <SwiperSlide>
          <WindowView image={gardening} text={t('onboarding.screen-2')} />
        </SwiperSlide>
        <SwiperSlide>
          <WindowView image={toolbelt} text={t('onboarding.screen-3')} />
        </SwiperSlide>

        {/* Input Views */}
        <SwiperSlide>
          <InputSelectView
            value="fnmi"
            options={['Inuit', 'Métis', 'First Nations', 'None of the above']}
            formProgress={formProgress}
            setFormProgress={setFormProgress}
            multi
          />
        </SwiperSlide>
        <SwiperSlide>
          <InputSelectView
            value="language"
            options={['Cree', 'Inuktitut', 'Ojibwe', 'English']}
            formProgress={formProgress}
            setFormProgress={setFormProgress}
            multi
          />
        </SwiperSlide>

        <SwiperSlide>
          <InputSearchView
            value="school"
            options={schoolData.map((x) => x.School)}
            formProgress={formProgress}
            setFormProgress={setFormProgress}
          />
        </SwiperSlide>
        <SwiperSlide>
          <InputSelectView
            value="interests"
            options={[
              'Health & Well-being',
              'Writing',
              'Video & Film',
              'Visual Arts',
              'Game Design',
              'Drones',
              'Music',
              'Songwriting',
              'Photography',
              'Photoshop',
              'Web Design',
              'Entrepreneurship',
              'Illustration',
              'Cultural Teachings',
            ]}
            formProgress={formProgress}
            setFormProgress={setFormProgress}
            cols={2}
            multi
          />
        </SwiperSlide>
        <SwiperSlide>
          <EmailView />
        </SwiperSlide>
        <SwiperSlide>
          <InputTextView
            value="displayName"
            formProgress={formProgress}
            setFormProgress={setFormProgress}
          />
        </SwiperSlide>

        <SwiperSlide>
          <FinishView
            values={['fnmi', 'language', 'school', 'interests', 'displayName']}
          />
        </SwiperSlide>
        <ProgressDots start={1} end={welcomeLength} slot={SlotEnd} />
      </Swiper>
    </Section>
  )
}

export default SignUpSection
