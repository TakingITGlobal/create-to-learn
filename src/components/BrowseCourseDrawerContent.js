import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'
import Stack from '@mui/material/Stack'

import { useTranslation } from 'react-i18next'

const BrowseCourseDrawerContent = ({
  categories,
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
              label={category}
              clickable
              onClick={() => handleCategoryFilterArr(category)}
              style={{ marginLeft: 0 }}
              variant={
                categoryFilter.includes(category) ? 'default' : 'outlined'
              }
            />
          ))}
        </Stack>
      </Box>
    </>
  )
}

export default BrowseCourseDrawerContent
