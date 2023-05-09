import React,{useState, useEffect} from 'react'
import useClasses from '../hooks/useClasses'
import Section from './Section'
import { useTranslation } from 'react-i18next'
import {A11y,Keyboard} from 'swiper'
import { MobileStepper, Button, Box, Container } from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack'
import { Swiper, SwiperSlide, useSwiper} from 'swiper/react'
import 'swiper/css'
import 'swiper/css/a11y'
import 'swiper/css/keyboard'
import { 
  InputSearchView, 
  InputSelectView, 
  InputTextView, 
  WindowView,
  EmailView, 
  FinishView,
} from './OnboardingView'
import schoolData from '../assets/options/schools.json'

const SlotStart = 'container-start'
const SlotEnd = "container-end"
const styles = theme => ({
  container: {
    maxHeight: '100%',
    
    position:'relative',
    display: 'flex',
    flexDirection: 'column',
  },
  swiper: {
    width: '100%',
    height: '100%',
    maxHeight: 'calc(100vh - 56px)',
    '& .swiper-slide': {
      display: 'flex',
      maxWidth: theme.breakpoints.md,

    }
  },
  progress: {
    position: 'relative',
    
  },
});

const SwiperNext = ({children}) => {
  const swiper = useSwiper()
  return(
    <Button size="sm" onClick={() => swiper.slideNext()}>
      {children}
    </Button>
  )
}
const SwiperPrev = ({children}) => {
  const swiper = useSwiper()
  return(
    <Button size="sm" onClick={() => swiper.slidePrev()}>
      {children}
    </Button>
  )
}
const ProgressBar = (props) => {
  const {start,end,slot} = props
  const swiper =useSwiper()
  const classes = useClasses(styles)
  const [active,setActive] = useState(0)
  useEffect(() => {
    swiper.on("slideChange", (swipe) => {
      setActive(swipe.activeIndex)
    })
    
  }, [swiper])
  return (
    <Container slot={slot}> 
      {active >= start ?    
        <MobileStepper
          variant="progress"
          steps={end - start  + 1}
          activeStep={active - start}
          position="top"
          className={classes.progress}
          backButton={
            <SwiperPrev>
              <ArrowBack/>
            </SwiperPrev>
          }
        />
        :
        <Box className={classes.btnWrap}>
          <SwiperPrev >
            <ArrowBack/>
          </SwiperPrev>
        </Box>
      }
    </Container> 
  )
}
const ProgressDots = (props) => {
  const {start,end,slot} = props
  const { t } = useTranslation()
  const swiper =useSwiper()
  const classes = useClasses(styles)
  const [active,setActive] = useState(0)
  useEffect(() => {
    swiper.on("slideChange", (swipe) => {
      setActive(swipe.activeIndex)
    })
    
  }, [swiper])
  return (
    <Container slot={slot}> 
      {active >= start &&
        <MobileStepper
          variant="dots"
          steps={end - start + 1}
          activeStep={active - start}
          position="bottom"
          className={classes.progress}
          nextButton={
            <SwiperNext>
              {t('btn.next')}
            </SwiperNext>
          }
          backButton={
            <SwiperPrev>
              {t('btn.prev')}
            </SwiperPrev>
          }
        />
      }
    </Container> 
  )
}

function SignUpSection(props) {
  const { t } = useTranslation()
  const classes = useClasses(styles)
  const welcomeLength = 3
  const inputLength = 4
  const [formProgress,setFormProgress] = useState(2)
  
  return (
    <Section
      bgColor={props.bgColor}
      size='auto'
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
      className={classes.container}
    >
      <Swiper
        modules={[A11y,Keyboard]}
        className={classes.swiper}
      >
        <ProgressBar 
          start={welcomeLength} 
          end={welcomeLength + inputLength}
          slot={SlotStart}
        />
        <SwiperSlide>
          <WindowView
            image="https://picsum.photos/780"
            text={t("onboarding.screen-1")}
          />
        </SwiperSlide>
        <SwiperSlide>
          <WindowView
            image="https://picsum.photos/660/860"
            text={t("onboarding.screen-2")}
          />
        </SwiperSlide>
        <SwiperSlide>
          <WindowView
            image="https://picsum.photos/860/660"
            text={t("onboarding.screen-3")}
          />
        </SwiperSlide>

        {/* Input Views */}
        <SwiperSlide>
          <InputSelectView
            value="fnmi"
            options={["Inuit","Métis","First Nations", "None of the above"]}
            formProgress={formProgress}
            setFormProgress={setFormProgress}
            multi
          />
        </SwiperSlide>
        <SwiperSlide>
          <InputSelectView
            value="language"
            options={["Cree", "Inuktitut", "Ojibwe", "English"]}
            formProgress={formProgress}
            setFormProgress={setFormProgress}
            multi
          />
        </SwiperSlide>
      
        <SwiperSlide>
          <InputSearchView
            value="school"
            options={schoolData.map(x => x.School)}
            formProgress={formProgress}
            setFormProgress={setFormProgress}
          />
        </SwiperSlide>
        <SwiperSlide>
          <InputSelectView
            value="interests"
            options={["Health & Well-being", "Writing", "Video & Film", "Visual Arts", "Game Design", "Drones", "Music", "Songwriting", "Photography", "Photoshop", "Web Design", "Entrepreneurship","Illustration", "Cultural Teachings"]}
            formProgress={formProgress}
            setFormProgress={setFormProgress}
            cols={2}
            multi
          />
        </SwiperSlide>
        <SwiperSlide>
          <EmailView
            
          />
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
            values={["fnmi","language","school","interests","displayName"]}
          />
        </SwiperSlide>
        <ProgressDots 
          start={0} 
          end={welcomeLength - 1}
          slot={SlotEnd}
        />
      </Swiper>
        
    </Section>
  );
}

export default SignUpSection
