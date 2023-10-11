import React from 'react'
import Container from '@material-ui/core/Container'
import Section from './Section'
import SectionHeader from './SectionHeader'
import { Grid, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../util/auth'

const useStyles = makeStyles((theme) => ({
  container: {
    padding: `0 ${theme.spacing(3)}px`,
  },
  image: {
    margin: '0 auto',
    maxWidth: 570,
    display: 'block',
    height: 'auto',
    width: '100%',
  },
}))

function WelcomeSection(props) {
  const classes = useStyles()
  const { t } = useTranslation()
  const auth = useAuth()
  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container maxWidth="md">
        <Grid container direction="column" alignItems="center">
          <SectionHeader
            title={props.title}
            subtitle={props.subtitle}
            size={4}
            textAlign="center"
          />
          <Grid item>
            <img src={props.image} alt="logo" className={classes.image} />
          </Grid>
          <Grid
            container
            item
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={2}
            md={6}
          >
            {!auth.user ? (
              <>
                <Grid container item direction="column" alignItems="stretch">
                  <Button variant="contained" component={Link} to="./sign-up">
                    {t('get-started')}
                  </Button>
                </Grid>
                <Grid container item direction="column" alignItems="stretch">
                  <Button variant="outlined" component={Link} to="/auth/signin">
                    {t('sign-in')}
                  </Button>
                </Grid>
              </>
            ) : (
              <></>
            )}
            <Grid container item direction="column" alignItems="stretch">
              <Button variant="text" component={Link} to="./dashboard">
                {t('let-me-browse')}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Section>
  )
}

export default WelcomeSection
