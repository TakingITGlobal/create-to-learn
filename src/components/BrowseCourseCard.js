import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'

import { useTranslation } from 'react-i18next'

const BrowseCourseCard = ({ course }) => {
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
            component="img"
            src={course.thumbnail[0]?.downloadURL}
            loading="lazy"
            alt={course.seriesName}
            style={{
              top: 0,
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
            }}
          />
        </Box>
        <Box sx={{ padding: 10 }}>
          <Box>
            <Typography variant="h6">{course.seriesName} </Typography>
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
              <Typography>{course.creator}</Typography>
              <Typography>
                {course.videos && course.videos.length}{' '}
                {course.videos.length === 1 ? t('video') : t('videos')}
              </Typography>
            </>
          </Box>
          <Box>
            <Button
              color="primary"
              fullWidth
              variant="contained"
              href={'/course/' + course.uid}
            >
              {t('course-page')}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

export default BrowseCourseCard
