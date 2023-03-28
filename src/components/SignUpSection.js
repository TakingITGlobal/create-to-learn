import React,{useState, useEffect} from 'react'
import useClasses from '../hooks/useClasses'
import Section from './Section'
import PageCarousel from './PageCarousel'
import { useTranslation } from 'react-i18next'
import { InputSearchView, InputSelectView, InputTextView, WindowView } from './OnboardingView'
import schoolData from '../assets/options/schools.json'

const styles = theme => ({
  container: {
    maxHeight: '100%',
    position:'relative',
    height: 'calc(100vh - 56px)',
    display: 'flex',
    flexDirection: 'column',
  }
});

function SignUpSection(props) {
  const { t } = useTranslation()

  const welcomeViews = 3
  
  const classes = useClasses(styles)
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
            image="https://picsum.photos/780"
            text={t("onboarding.screen-1")}
          />
          <WindowView
            image="https://picsum.photos/660/860"
            text={t("onboarding.screen-2")}
          />
          <WindowView
            image="https://picsum.photos/860/660"
            text={t("onboarding.screen-3")}
          />

          {/* Input Views */}
          <InputSelectView
            value="fnmi"
            options={["Inuit","Métis","First Nations", "None of the above"]}
            state={{setActive,setCurLength}}
            multi
          />
          <InputSelectView
            value="language"
            options={["Cree", "Inuktitut", "Ojibwe", "English"]}
            state={{setActive,setCurLength}}
            multi
          />
          <InputTextView
            value="greeting"
            state={{setActive,setCurLength}}
          />
          <InputSearchView
            value="school"
            options={schoolData.map(x => x.School)}
            state={{setActive,setCurLength}}
          />
          <InputSelectView
            value="interests"
            options={["Health & Well-being", "Writing", "Video & Film", "Visual Arts", "Game Design", "Drones", "Music", "Songwriting", "Photography", "Photoshop", "Web Design", "Entrepreneurship","Illustration", "Cultural Teachings"]}
            state={{setActive,setCurLength}}
            cols={2}
            multi
          />
        </PageCarousel>
    </Section>
  );
}

export default SignUpSection
