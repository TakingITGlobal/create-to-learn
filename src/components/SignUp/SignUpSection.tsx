import React, { useState } from 'react'
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
} from '../OnboardingView'
import schoolData from 'assets/options/schools.json'
import welcome from 'assets/images/welcome2.png'
import juggling from 'assets/images/juggling.png'
import gardening from 'assets/images/gardening.png'
import toolbelt from 'assets/images/toolbelt.png'
import { categories } from 'assets/options/categories'
import { ProgressDots, ProgressBar, ContinueButtons } from './Progress'

const SlotStart = 'container-start'
const SlotEnd = 'container-end'

function SignUpSection() {
  const { t } = useTranslation()
  const welcomeLength = 3
  const inputLength = 4
  const [formProgress, setFormProgress] = useState(0)

  const categoryOptions = categories.slice(1).map(({ label }) => label)
  const translationKeys = [
    'fnmi',
    'language',
    'school',
    'interests',
    'displayName',
  ]
  return (
    <Section size="auto">
      <Swiper modules={[A11y, Keyboard]}>
        <SwiperSlide>
          <WelcomeView
            image={welcome}
            formProgress={formProgress}
            setFormProgress={setFormProgress}
          />
        </SwiperSlide>

        <ProgressBar
          start={welcomeLength}
          end={welcomeLength + inputLength + 1}
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
            options={schoolData.map((x: any) => x.School)}
            formProgress={formProgress}
            setFormProgress={setFormProgress}
          />
        </SwiperSlide>
        <SwiperSlide>
          <InputPillView
            value="interests"
            options={categoryOptions}
            formProgress={formProgress}
            setFormProgress={setFormProgress}
          />
        </SwiperSlide>

        <SwiperSlide>
          <EmailView />
        </SwiperSlide>

        <SwiperSlide>
          <InputTextView
            value="screen-6"
            formProgress={formProgress}
            setFormProgress={setFormProgress}
          />
        </SwiperSlide>

        <SwiperSlide>
          <FinishView values={translationKeys} />
        </SwiperSlide>
        <ContinueButtons translationKeys={translationKeys} />
        <ProgressDots start={1} end={welcomeLength} slot={SlotEnd} />
      </Swiper>
    </Section>
  )
}

export default SignUpSection
