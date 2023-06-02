import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import ButtonBase from '@mui/material/ButtonBase'
import LinearProgress from '@mui/material/LinearProgress'

import { useTranslation } from 'react-i18next'

const BrowseCourseCard = ({ course, progress }) => {
  const { t } = useTranslation()
  const showProgress = progress && progress?.percentProgress > 0
  return (
    <Box sx={{ padding: '10px 0' }}>
      <ButtonBase href={'/course/' + course.uid}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Box
              component="img"
              src={course.thumbnail[0]?.downloadURL}
              loading="lazy"
              alt={course.seriesName}
              style={{
                top: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Box>
              <Box>
                <Typography variant="body2" fontWeight="fontWeightBold">
                  {course.seriesName}
                </Typography>
              </Box>
              <Box>
                <>
                  <Typography variant="body2">{course.creator}</Typography>
                  <Typography variant="body2">
                    {course.videos && course.videos.length}{' '}
                    {course.videos.length === 1 ? t('video') : t('videos')}
                  </Typography>
                  {showProgress && (
                    <>
                      <LinearProgress
                        variant="determinate"
                        value={progress.percentProgress}
                      />
                      <Typography>
                        {progress.timeLeft.hours > 0
                          ? `${progress.timeLeft.hours} hours`
                          : ''}{' '}
                        {progress.timeLeft.minutes} min left
                      </Typography>
                    </>
                  )}
                </>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ButtonBase>
    </Box>
  )
}

export default BrowseCourseCard