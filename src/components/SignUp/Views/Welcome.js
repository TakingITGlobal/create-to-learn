import { Button, CardMedia, Container, Grid, Stack, Typography } from '@mui/material'
import Section from 'components/Section'
import SectionHeader from 'components/SectionHeader'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useSwiper } from 'swiper/react'

export default function WelcomeView({ image, startSignUp }) {
  const swiper = useSwiper()
  const { t } = useTranslation()

  const setLocal = () => {
    swiper.slideNext()
  }

  return (
    <Section>
      <Container maxWidth="sm">
        <Grid container direction="column" alignItems="center">
          <SectionHeader title={t('create-to-learn')} textAlign="center"/>
          <CardMedia
            component="img"
            alt=""
            sx={{
              width: '300px',
              height: '300px',
              marginBottom: '18px',
              borderRadius: '24px',
            }}
            image={image}
          />
          <Stack direction="column" width="100%" spacing={2}>
            {/* If startSignUp = 0, then show the button */}
            <Typography 
              variant="body1" 
              color="text.primary" 
              sx={{ 
                textAlign:'center', 
                padding:'0 0 15px',
                display: startSignUp === 0 ? 'block' : 'none',
              }}
              >
              {t('do-not-require-account')}
            </Typography>
            <Button fullWidth variant="contained" onClick={() => setLocal()}>
              {t('get-started')}
            </Button>
            {/* If startSignUp = 0, then show the button */}
            <Button 
              fullWidth 
              color="info" 
              component={Link} 
              to="/auth/signin"
              sx={{
                display: startSignUp === 0 ? 'block' : 'none', // Show if startSignUp === 0
                textAlign: 'center'
              }}
            >
              {t('sign-in')}
            </Button>
          </Stack>
          <Button fullWidth component={Link} to="/dashboard" sx={{marginTop: '14px'}}>
            {t('let-me-browse')}
          </Button>
        </Grid>
      </Container>
    </Section>
  )
}