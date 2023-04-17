import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { categories } from '../assets/options/categories'

import { useTranslation } from 'react-i18next'

const BrowseCourseDrawerContent = ({
  handleDurationFilterArr,
  handleCategoryFilterArr,
  categoryFilter,
  durationFilter,
  durations,
}) => {
  const { t } = useTranslation()

  return (
    <>
      <Box mt={2}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
          {t('featured')}
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip label="Featured" clickable variant="outlined" />
          <Chip label="New" clickable variant="outlined" />
        </Stack>
      </Box>
      <Box mt={2}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
          {t('duration')}
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          {durations.map((duration, index) => (
            <Chip
              key={index}
              label={duration.label}
              clickable
              style={{ marginLeft: 0 }}
              onClick={() => handleDurationFilterArr(duration)}
              variant={
                durationFilter.some((dur) => dur.id === duration.id)
                  ? 'default'
                  : 'outlined'
              }
            />
          ))}
        </Stack>
      </Box>
      <Box mt={2}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
          {t('topics')}
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          {categories.map((category, index) => (
            <Chip
              key={index}
              label={category.label}
              clickable
              onClick={() => handleCategoryFilterArr(category.label)}
              style={{ marginLeft: 0 }}
              variant={
                categoryFilter.includes(category.label) ? 'default' : 'outlined'
              }
            />
          ))}
        </Stack>
      </Box>
    </>
  )
}

export default BrowseCourseDrawerContent
