import React, { useState,useEffect } from 'react'
import useClasses from '../hooks/useClasses'
import { Grid, MobileStepper, Button, Box, Container } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

import { useTranslation } from 'react-i18next';
import Carousel from 'react-material-ui-carousel'


const styles = theme => ({

  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },

  carousel: {
    flex: 1, 
    display: 'flex', 
    alignItems: 'stretch',
    '& > .CarouselItem': {
      width: '100%',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      padding: '20px 0',
      '& > div': {
        width: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      },
    },
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
  }
});


const PageCarousel = ({children,split,state}) => {
  const { t } = useTranslation();
  const classes = useClasses(styles)
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
  useEffect(() => (
    wLength > active ?
      setWActive(active)
    :
      setIActive(Math.max(active - wLength, 0))
  ),[active,wLength])
  return (
    (<>
      <Grid className={classes.container}>
        <Container>
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
              <Button size="small" onClick={handleBack} disabled={active === 0}>
                <ArrowBack/>
              </Button>
            </Box>
            
          )}
          </Grid>
        </Container>            

        <Carousel
          index={active}
          enableMouseEvents
          onChange={(i) => setActive(i)}
          swipe
          navButtonsAlwaysInvisible={true}
          autoPlay={false}
          animation="slide"
          indicators={false}
          className={classes.carousel}
        >
            {children.slice( 0,curLength)} 
        </Carousel>

        <Container>
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
      </Grid>
    </>)
  );
}

export default PageCarousel