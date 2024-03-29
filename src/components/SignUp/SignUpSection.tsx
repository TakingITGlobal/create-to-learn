import React from 'react'
import Section from '../Section'
import { useTranslation } from 'react-i18next'
import { A11y, Keyboard } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
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
  InputPillView,
} from './Views'
import schoolData from 'assets/options/schools.json'
import welcome from 'assets/images/welcome2.png'
import juggling from 'assets/images/juggling.png'
import gardening from 'assets/images/gardening.png'
import toolbelt from 'assets/images/toolbelt.png'
import { categories } from 'assets/options/categories'
import { ProgressDots, ProgressBar } from './Progress'
import { ContinueButtons } from './ContinueButtons'
import Container from '@mui/material/Container'
import { DataProvider } from 'util/signupProvider'

const SlotStart = 'container-start'
const SlotEnd = 'container-end'

interface SignUpSectionProps {
  startSignUp: number;
}

function SignUpSection({ startSignUp }: SignUpSectionProps) {

  const { t } = useTranslation()
  const translationKeys = [
    'fnmi',
    'language',
    'school',
    'interests',
    'email',
    'displayName',
  ]
  const categoryOptions = categories.slice(1).map(({ label }) => label)

  const fnmiOptions = ['Inuit', 'Métis', 'First Nations', 'None of the above']
  const languageOptions = ['Cree', 'Inuktitut', 'Ojibwe', 'English']
  const welcomeLength = 3
  const progressSlides = 7

  return (
    <DataProvider>
      <Section size="sm">
        <Container 
        sx={{
              padding: { xs: '0px' },
                      
            }}>
          <Swiper modules={[A11y, Keyboard]}>
            <SwiperSlide>
              <WelcomeView image={welcome} startSignUp={startSignUp}/>
            </SwiperSlide>

            <ProgressBar
              start={welcomeLength}
              end={progressSlides + welcomeLength}
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
              <InputSelectView value="fnmi" options={fnmiOptions} />
            </SwiperSlide>

            <SwiperSlide>
              <InputSelectView value="language" options={languageOptions} />
            </SwiperSlide>

            <SwiperSlide>
              <InputSearchView
                value="school"
                options={schoolData.map((x: any) => x.School)}
              />
            </SwiperSlide>
            <SwiperSlide>
              <InputPillView value="interests" options={categoryOptions} />
            </SwiperSlide>

            <SwiperSlide>
              <EmailView />
            </SwiperSlide>

            <SwiperSlide>
              <InputTextView value="displayName" />
            </SwiperSlide>

            <SwiperSlide>
              <FinishView />
            </SwiperSlide>
            <ContinueButtons
              translationKeys={translationKeys}
              numOfSlides={progressSlides + welcomeLength}
              welcomeLength={welcomeLength}
            />
            <ProgressDots start={1} end={welcomeLength} slot={SlotEnd} />
          </Swiper>
        </Container>
      </Section>
    </DataProvider>
  )
}

export default SignUpSection