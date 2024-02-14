import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function TitleSection({ value }) {
  const { t } = useTranslation()

  return (
    <Box
      sx={{
        padding: '50px 1em 1.5em 1.5em',
        maxWidth: { md: '850px' },
        margin: { md: '0 auto' },
      }}
    >
      <Stack direction="column">
        <Typography variant="decorative">
          {t(`onboarding.${value}.header`)}
        </Typography>
        <Typography variant="secondary" sx={{ color: '#D2CCFB' }}>
          {t(`onboarding.${value}.header2`)}
        </Typography>
        <Typography variant="secondary">
          {t(`onboarding.${value}.subheader`)}
        </Typography>
      </Stack>
    </Box>
  )
}

