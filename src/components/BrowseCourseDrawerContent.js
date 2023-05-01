import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { durations, culturalGroups } from '../assets/options/filters'

import useClasses from '../hooks/useClasses'
import { useTranslation } from 'react-i18next'

const styles = (theme) => ({
  // muiChip: {},
})

const BrowseCourseDrawerContent = ({
  handleDurationFilterArr,
  culturalGroupFilter,
  handleCulturalGroupFilterArr,
  durationFilter,
}) => {
  const { t } = useTranslation()
  const classes = useClasses(styles)

  return (
    <>
      <Box mt={2}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
          {t('featured')}
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip label="Featured" clickable variant="default" />
          <Chip label="New" clickable variant="default" />
        </Stack>
      </Box>
      <Box mt={2}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
          {t('community')}
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          {culturalGroups &&
            culturalGroups.map((group, index) => {
              const clicked = culturalGroupFilter.some((grp) => grp === group)
              return (
                <Chip
                  key={index}
                  label={group}
                  clickable
                  style={{
                    marginLeft: 0,
                    backgroundColor: clicked ? '#6956F1' : '#211E34',
                    padding: '5px !important',
                  }}
                  onClick={() => handleCulturalGroupFilterArr(group)}
                  variant="default"
                />
              )
            })}
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
          {durations.map((duration, index) => {
            const clicked = durationFilter.some((dur) => dur.id === duration.id)
            return (
              <Chip
                key={index}
                label={duration.label}
                clickable
                style={{
                  marginLeft: 0,
                  backgroundColor: clicked ? '#6956F1' : '#211E34',
                  padding: '5px !important',
                }}
                onClick={() => handleDurationFilterArr(duration)}
                variant="default"
              />
            )
          })}
        </Stack>
      </Box>
    </>
  )
}

export default BrowseCourseDrawerContent
