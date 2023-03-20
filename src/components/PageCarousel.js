import React, { useState,useEffect,useCallback } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Container, Grid, MobileStepper, Button, Box } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';

import SwipeableViews from 'react-swipeable-views'
import { bindKeyboard } from 'react-swipeable-views-utils';
import { useTranslation } from 'react-i18next';

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews)

const useStyles = makeStyles((theme) => ({ 
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',

  },
  progressWrap: {
    height: 48,
  },
  btnWrap: {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    position: 'relative',
    height: '100%',
    padding: 8,
  },
  progress: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    position: 'relative',
    background: 'transparent',
    '& .MuiMobileStepper-progress':{
      width: '67%',
      margin: '0 auto',
      height: 5,
      borderRadius: 8,
    },
  },
}))
export const active = () => {

}

const PageCarousel = ({children,split,state}) => {
  const { t } = useTranslation();
  const classes = useStyles()
  const totalSlides = children.length;
  const { active, setActive,curLength } = state;
  const wLength = split;
  const iLength = totalSlides - wLength;

  const [wActive,setWActive] = useState(0);
  const [iActive,setIActive] = useState(wLength);
  const handleBack = () => {
    setActive((active) => active - 1);
  };
  const handleNext = () => {
    setActive((active) => active + 1);
  };
  const checkActive = useCallback(() => {
    wLength > active ?
      setWActive(active)
    :
      setIActive(Math.max(active - wLength, 0))
  })
  useEffect(() => (
    checkActive()
  ),[active])
  return (
    <>
      <Container className={classes.container}>
        <Container maxWidth="md">
          <Grid className={classes.progressWrap}>
          {active >= wLength ? (
            <MobileStepper
              variant="progress"
              steps={iLength}
              activeStep={iActive}
              position="top"
              className={classes.progress}
              backButton={
                <Button size="small" onClick={handleBack} disabled={active === 0}>
                  <ArrowBack/>
                </Button>
              }
            />
          ) : (
            <Box className={classes.btnWrap}>
              <Button>
                <ArrowBack/>
              </Button>
            </Box>
            
          )}
          </Grid>
        </Container>            

        <BindKeyboardSwipeableViews
          index={active}
          enableMouseEvents
          onChangeIndex={(i) => setActive(i)}
          style={{flex: 1}}
        >
            {children.slice(0,curLength)} 
        </BindKeyboardSwipeableViews>
        <Container maxWidth="md">
          {active < wLength && (
            <MobileStepper
              variant="dots"
              steps={wLength}
              activeStep={wActive}
              position="bottom"
              className={classes.progress}
              nextButton={
                <Button size="small" onClick={handleNext} disabled={active === totalSlides-1}>
                  {t('btn.next')}
                </Button>
              }
              backButton={
                <Button size="small" onClick={handleBack} disabled={active === 0}>
                  {t('btn.prev')}
                </Button>
              }
            />
          )}
        </Container>
      </Container>
    </>
  )
}

export default PageCarousel