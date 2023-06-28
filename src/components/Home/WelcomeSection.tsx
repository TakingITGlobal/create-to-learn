import React from 'react'
import useClasses from 'hooks/useClasses'
import Container from '@mui/material/Container'
import Section from '../Section'
import SectionHeader from '../SectionHeader'
import { Grid, Button, Paper, Stack, Theme, useTheme } from '@mui/material'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const styles = (theme: Theme) => ({
  container: {
    padding: `0 ${theme.spacing(2)}`,
  },

  image: {
    margin: '0 auto',
    maxWidth: '570px',
    display: 'block',
    height: 'auto',
    width: '100%',
  },

  signIn: {},
})

interface Props {
  title: string
  image: string
}

function WelcomeSection(props: Props) {
  const classes = useClasses(styles)
  const { t } = useTranslation()
  const theme = useTheme()
  const { text, background } = theme.palette
  return (
    <Section>
      <Container maxWidth="md">
        <Grid container direction="column" alignItems="center">
          <SectionHeader title={props.title} textAlign="center" />

          <Paper elevation={2} sx={{ marginBottom: '20px' }}>
            <Link component={Button} to="./sign-up">
              <img src={props.image} alt="logo" className={classes.image} />
            </Link>
          </Paper>

          <Stack direction="column" width="100%" spacing={2}>
            <Button variant="contained" component={Link} to="./sign-up">
              {t('get-started')}
            </Button>

            <Button
              component={Link}
              to="/auth/signin"
              sx={{
                backgroundColor: text.primary,
                borderRadius: 10,
                color: background.default,
                ':hover': {
                  color: text.secondary,
                },
              }}
            >
              {t('sign-in')}
            </Button>

            <Button
              variant="text"
              component={Link}
              to="./dashboard"
              sx={{ textTransform: 'none' }}
            >
              {t('let-me-browse')}
            </Button>
          </Stack>
        </Grid>
      </Container>
    </Section>
  )
}

export default WelcomeSection
