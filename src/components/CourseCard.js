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
    <Box sx={{ padding: '10px 0 30px' }}>
      <ButtonBase href={'/tutorial/' + course.uid}>
        <Grid container rowSpacing={1} sx={{ gap: '15px', display: 'grid', gridTemplateColumns: {sm: '', md: '1fr 1fr'} }}>
          <Grid item sx={{ paddingLeft: '0'}}>
            <Box
              component="img"
              src={course.thumbnail[0]?.downloadURL}
              loading="lazy"
              alt={course.seriesName}
              sx={{
                top: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '6px',
                paddingLeft: '0'
              }}
            />
          </Grid>
          <Grid item>
            <Box>
              <Box>
                <Typography variant="bold" sx={{fontSize: { md: '1.4em' }, paddingTop: {md: '25px'} }}>
                  {course.seriesName}
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontSize: { md: '1.1em' },
                    marginBottom: '10px'
                  }}
                >
                  {course.creator}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontSize: { md: '1.1em' },
                  }}
                >
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
                    <Grid sx={{ alignItems: 'center',
                    gap: '20px', gridTemplateColumns: '2fr 1fr', display: 'grid'}}>
                      <LinearProgress
                        variant="determinate"
                        value={progress.percentProgress}
                      />
                      <Typography sx={{textAlign: 'right', marginRight: '10px'}}>
                        {progress.timeLeft.hours > 0
                          ? `${progress.timeLeft.hours} hrs`
                          : ''}{' '}
                        {progress.timeLeft.minutes} min left
                      </Typography>
                    </Grid>
                  ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ButtonBase>
    </Box>
  )
}

export default BrowseCourseCard
