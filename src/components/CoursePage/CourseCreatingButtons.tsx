import React, { Dispatch, SetStateAction } from 'react'
import { Box, Typography, Grid, Stack, Button } from '@mui/material'

import { useTranslation } from 'react-i18next'
import LinearProgress from '@mui/material/LinearProgress'
import { displayTime } from '../../util/timeHelpers'
import CheckSimpleIcon from '@mui/icons-material/Check'
import { CourseData, CourseProgress } from 'types/CoursePage'

interface Props {
  courseData: CourseData | undefined
  courseProgress: CourseProgress[]
  setTabValue: Dispatch<SetStateAction<number>>
}

function CourseCreatingButtons({
  courseData,
  courseProgress = [],
  setTabValue,
}: Props) {
  const { t } = useTranslation()

  const inProgressVideos = courseProgress
    ? courseProgress.filter((video: CourseProgress) => video?.progress > 0)
    : []

  const totalTimeWatched =
    inProgressVideos.length > 1
      ? inProgressVideos
          .map(({ progress }: CourseProgress) => progress)
          .reduce((acc: number, curr: number) => acc + curr)
      : inProgressVideos.length === 1
      ? inProgressVideos[0].progress
      : 0

  const courseLength = (courseData && courseData.totalLength) ?? -1

  //Check if this should be turned into hrs:minutes:seconds
  const timeLeft = inProgressVideos.length
    ? courseLength - totalTimeWatched
    : courseLength

  const percentProgress = inProgressVideos.length
    ? (totalTimeWatched / courseLength) * 100
    : 0

  return inProgressVideos.length ? (
    <Grid
      container
      sx={{
        position: { xs: 'fixed', md: 'relative' },
        bottom: { xs: '78px', md: '20px' },
        left: '0',
        right: '0',
        padding: '10px 15px 5px 15px',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'black',
      }}
    >
      <Grid xs={8} sx={{ paddingTop: '10px' }}>
        {timeLeft > 0.5 ? (
          <Stack
            direction="row"
            spacing={1}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <LinearProgress
              color="primary"
              variant="determinate"
              value={percentProgress}
              sx={{ width: '120px', paddingTop: '5px' }}
            />
            <Typography>{displayTime(timeLeft)} left </Typography>
          </Stack>
        ) : (
          <Stack direction="row" spacing={1}>
            <CheckSimpleIcon
              sx={{
                backgroundColor: 'inherit !important',
                color: '#fff !important',
              }}
            />

            <Typography sx={{ display: 'inline-block' }}>
              {t('course.finished')}
            </Typography>
          </Stack>
        )}
      </Grid>
      <Grid xs={4}>
        <Button
          fullWidth
          onClick={() => setTabValue(1)}
          sx={{
            backgroundColor: 'white !important',
            color: 'black',
            borderRadius: '25px',
          }}
        >
          {t('btn.continue')}
        </Button>
      </Grid>
    </Grid>
  ) : (
    <Box
      sx={{
        position: { xs: 'fixed', md: 'relative' },
        bottom: { xs: '78px', md: '20px' },
        left: '0',
        right: '0',
        padding: '10px 15px 5px 15px',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'black',
      }}
    >
      <Button
        variant="contained"
        size="large"
        fullWidth
        sx={{
          maxWidth: '800px',
        }}
        onClick={() => setTabValue(1)}
      >
        {t('course.start-creating')}
      </Button>
    </Box>
  )
}

export default CourseCreatingButtons
