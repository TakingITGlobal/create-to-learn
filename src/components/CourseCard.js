import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import ButtonBase from '@mui/material/ButtonBase'
import LinearProgress from '@mui/material/LinearProgress'
import CheckIcon from '@mui/icons-material/CheckCircle'
import { useTheme } from '@mui/material/styles'

import { useTranslation } from 'react-i18next'

const BrowseCourseCard = ({ course, progress }) => {
  const theme = useTheme()
  const { t } = useTranslation()

  const showProgress = progress && progress?.percentProgress > 0

  return (
    <Box sx={{ padding: '10px 0' }}>
      <ButtonBase href={'/course/' + course.uid}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 2, md: 3 }}>
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
                <Typography variant="bold">
                  {course.seriesName}
                </Typography>
              </Box>
              <Box>
                <>
                  <Typography variant="body2" sx={{color: theme.palette.text.secondary}}>{course.creator}</Typography>
                  <Typography variant="body2" sx={{color: theme.palette.text.secondary}}>
                    {course.videos && course.videos.length}{' '}
                    {course.videos.length === 1 ? t('video') : t('videos')}
                  </Typography>
                  {showProgress &&
                    (progress.completed ? (
                      <Box sx={{ paddingLeft: 0 }}>
                        <Button
                          startIcon={
                            <CheckIcon sx={{ fill: '#58B97D !important' }} />
                          }
                          sx={{ color: '#BCE3CB', paddingLeft: '5px' }}
                        >
                          {t('my-courses.completed')}
                        </Button>
                      </Box>
                    ) : (
                      <>
                        <LinearProgress
                          variant="determinate"
                          value={progress.percentProgress}
                        />
                        <Typography>
                          {progress.timeLeft.hours > 0
                            ? `${progress.timeLeft.hours} hrs`
                            : ''}{' '}
                          {progress.timeLeft.minutes} min left
                        </Typography>
                      </>
                    ))}
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
