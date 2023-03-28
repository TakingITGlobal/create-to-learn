import React from 'react'
import useClasses from '../hooks/useClasses'
import Container from '@mui/material/Container'
import Section from './Section'
import SectionHeader from './SectionHeader'
import { Grid, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const styles = theme => ({
  container: {
    padding: `0 ${theme.spacing(2)}`,
  },

  image: {
    margin: '0 auto',
    maxWidth: '570px',
    display: 'block',
    height: 'auto',
    width: '100%',
  }
});

function WelcomeSection(props) {
  const classes = useClasses(styles)
  const { t } = useTranslation()
  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container maxWidth="md">
        <Grid 
          container
          direction="column"
          alignItems="center"
        >
          <SectionHeader
            title={props.title}
            subtitle={props.subtitle}
            size={4}
            textAlign="center"
          />
          <Grid item>
            <img
              src={props.image}
              alt="logo"
              className={classes.image}
            />
          </Grid>
          <Grid 
            container
            item
            direction="column"
            alignItems="center"
            justifyContent='center'
            spacing={2}
            md={6}
          >
            <Grid container item direction="column" alignItems='stretch'>
              <Button variant="contained" component={Link} to='./sign-up'>
                {t('get-started')}
              </Button>
            </Grid>
            <Grid container item direction="column" alignItems='stretch'>
              <Button variant="outlined" component={Link} to="/auth/signin">
                {t('sign-in')}
              </Button>
            </Grid>
            <Grid container item direction="column" alignItems='stretch'>
              <Button variant="text" component={Link} to='./dashboard'>
                {t('let-me-browse')}
              </Button>
            </Grid>  
          </Grid>
        </Grid>
      </Container>
    </Section>
  );
}

export default WelcomeSection
