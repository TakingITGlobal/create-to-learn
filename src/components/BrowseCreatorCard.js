import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

import { useTranslation } from 'react-i18next'

const BrowseCreatorCard = ({ creator }) => {
  const { t } = useTranslation()

  return (
    <Box sx={{ padding: '10px 0' }}>
      <Paper sx={{ padding: 2.5, height: '200px' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            height: '200px',
            overflow: 'hidden',
          }}
        >
          <Box
            src={creator.image && creator.image[0]?.downloadURL}
            component="img"
            alt={creator.name}
            loading="lazy"
            height="200px"
            style={{
              top: 0,
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 },
            }}
          ></Box>
        </Box>
        <Box sx={{ padding: 10 }}>
          <Box>
            <Typography variant="h6">{creator.name} </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: 5,
            }}
          >
            <>
              <Typography>{creator.seriesName}</Typography>
              <Typography>
                {creator.videos === 1 ? t('video') : t('videos')}
              </Typography>
            </>
          </Box>
          <Box>
            <Button color="primary" fullWidth variant="contained">
              {t('course-page')}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

export default BrowseCreatorCard
