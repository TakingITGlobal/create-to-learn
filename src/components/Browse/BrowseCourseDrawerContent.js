import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import {
  durations,
  culturalGroups,
  difficultyLevels,
} from '../../assets/options/filters'

import { useTranslation } from 'react-i18next'

const BrowseCourseDrawerContent = ({
  culturalGroupFilter,
  setCulturalGroupFilter,
  durationFilter,
  setDurationFilter,
  featuredFilter,
  setFeaturedFilter,
  materials,
  materialsFilter,
  setMaterialsFilter,
  difficultyLevelFilter,
  setDifficultyLevelFilter,
}) => {
  const { t } = useTranslation()

  const handleFilter = (item, clicked, itemFilter, setItemFilter) => {
    if (clicked) {
      setItemFilter(itemFilter.filter((element) => element !== item))
    } else {
      setItemFilter([...itemFilter, item])
    }
  }

  return (
    <>
      <Box mt={1}>
        <Typography variant="h3" sx={{ fontWeight: 'bold' }} mb="10px">
          {t('featured')}
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip
            label="Featured"
            clickable
            variant="default"
            style={{
              marginLeft: 0,
              backgroundColor: featuredFilter ? '#6956F1' : '#211E34',
              padding: '5px !important',
            }}
            onClick={() => setFeaturedFilter(!featuredFilter)}
          />
          <Chip label="New" clickable variant="default" />
        </Stack>
      </Box>
      <Box mt={3}>
        <Typography variant="h3" sx={{ fontWeight: 'bold' }} mb="10px">
          {t('community')}
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            flexWrap: 'wrap',
            gap: 1,
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
                  onClick={() =>
                    handleFilter(
                      group,
                      clicked,
                      culturalGroupFilter,
                      setCulturalGroupFilter,
                    )
                  }
                  variant="default"
                />
              )
            })}
        </Stack>
      </Box>
      <Box mt={3}>
        <Typography variant="h3" sx={{ fontWeight: 'bold' }} mb="10px">
          {t('browse.difficulty')}
        </Typography>
        <Stack direction="row" spacing={1}
         sx={{
          flexWrap: 'wrap',
          gap: 1,
        }}
        >
          {difficultyLevels.map((level, index) => {
            const clicked = difficultyLevelFilter.includes(level)
            return (
              <Chip
                key={index}
                label={level}
                clickable
                style={{
                  marginLeft: 0,
                  backgroundColor: clicked ? '#6956F1' : '#211E34',
                  padding: '5px !important',
                }}
                onClick={() =>
                  handleFilter(
                    level,
                    clicked,
                    difficultyLevelFilter,
                    setDifficultyLevelFilter,
                  )
                }
                variant="default"
              />
            )
          })}
        </Stack>
      </Box>
      <Box mt={3}>
        <Typography variant="h3" sx={{ fontWeight: 'bold' }} mb="10px">
          {t('duration')}
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            flexWrap: 'wrap',
            gap: 1,
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
                onClick={() =>
                  handleFilter(
                    duration,
                    clicked,
                    durationFilter,
                    setDurationFilter,
                  )
                }
                variant="default"
              />
            )
          })}
        </Stack>
      </Box>

      <Box mt={3}>
        <Typography variant="h3" sx={{ fontWeight: 'bold' }} mb="10px">
          {t('browse.materials')}
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            flexWrap: 'wrap',
            gap: 1,
          }}
        >
          {materials.map((material, index) => {
            const clicked = materialsFilter.some((mat) => mat === material)
            return (
              <Chip
                key={index}
                label={material}
                clickable
                style={{
                  marginLeft: 0,
                  backgroundColor: clicked ? '#6956F1' : '#211E34',
                  padding: '5px !important',
                }}
                onClick={() =>
                  handleFilter(
                    material,
                    clicked,
                    materialsFilter,
                    setMaterialsFilter,
                  )
                }
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
