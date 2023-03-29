import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'
import Stack from '@mui/material/Stack'

import { useTranslation } from 'react-i18next'

const BrowseCreatorDrawerContent = ({
  handleCulturalGroupFilterArr,
  culturalGroupFilter,
  culturalGroups,
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
          Cultural group
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          {culturalGroups.map((group, index) => (
            <Chip
              key={index}
              label={group}
              clickable
              style={{ marginLeft: 0 }}
              onClick={() => handleCulturalGroupFilterArr(group)}
              variant={
                culturalGroupFilter.some((grp) => grp === group)
                  ? 'default'
                  : 'outlined'
              }
            />
          ))}
        </Stack>
      </Box>
    </>
  )
}

export default BrowseCreatorDrawerContent
