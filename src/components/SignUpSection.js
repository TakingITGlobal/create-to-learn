import React,{useState} from 'react'
import Container from '@material-ui/core/Container'
import Section from './Section'
import { makeStyles } from '@material-ui/core/styles'
import PageCarousel from './PageCarousel'
import { useTranslation } from 'react-i18next'
import { InputSelectView, WindowView } from './OnboardingView'

const useStyles = makeStyles((theme) => ({
  container: {
    maxHeight: '100%',
    position:'relative',
    height: 'calc(100vh - 56px)',
    display: 'flex',
    flexDirection: 'column'
  }
}))

function SignUpSection(props) {
  const { t } = useTranslation()
  const classes = useStyles()
  const welcomeViews = 3

  const [active,setActive] = useState(0)
  const [curLength,setCurLength] = useState(welcomeViews+1)
  
  return (
    <Section
      bgColor={props.bgColor}
      size='auto'
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
      className={classes.container}
    >
        <PageCarousel split={welcomeViews} state={{active,setActive,curLength}}>
  
          {/* Welcome Pages */}
          
          <WindowView
            image="https://loremflickr.com/780/780"
            text={t("onboarding.screen-1")}
          />
          <WindowView
            image="https://loremflickr.com/660/1240"
            text={t("onboarding.screen-2")}
          />
          <WindowView
            image="https://loremflickr.com/1240/660"
            text={t("onboarding.screen-3")}
          />

          {/* Input Views */}
          <InputSelectView
            multi
            subheader={t('onboarding.community.subheader')}
            header={t('onboarding.community.header')}
            skipLabel={t('onboarding.community.skip-btn')}
            value="community"
            options={["Inuit","Métis","First Nations", "None of the"]}
            state={{setActive,setCurLength}}
          />
          <InputSelectView
            subheader={t('onboarding.community.subheader')}
            header={t('onboarding.community.header')}
            skipLabel={t('onboarding.community.skip-btn')}
            value="community"
            options={["Inuit","Métis","First Nations", "None of the above"]}
            state={{setActive,setCurLength}}
          />
        </PageCarousel>
    </Section>
  )
}

export default SignUpSection
