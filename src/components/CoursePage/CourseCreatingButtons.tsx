import React, { Dispatch, SetStateAction } from 'react'
import { Box, Typography, Grid, Stack, Button } from '@mui/material'
import Container from '@mui/material/Container'
import { useTranslation } from 'react-i18next'
import LinearProgress from '@mui/material/LinearProgress'
import { displayTime } from '../../util/timeHelpers'
import CheckSimpleIcon from '@mui/icons-material/Check'
import { CourseData } from 'types/Course'
import { VideoProgress } from 'types/Video'

interface Props {
  courseData: CourseData | undefined
  videoProgress: VideoProgress[]
  setTabValue: Dispatch<SetStateAction<number>>
}

function CourseCreatingButtons({
  courseData,
  videoProgress = [],
  setTabValue,
}: Props) {
  const { t } = useTranslation()

  const inProgressVideos = videoProgress
    ? videoProgress.filter((video: VideoProgress) => video?.progress > 0)
    : []

  const totalTimeWatched =
    inProgressVideos.length > 1
      ? inProgressVideos
          .map(({ progress }: VideoProgress) => progress)
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
    <Container sx={{ maxWidth: '850px !important'}}>
    <Grid
      container
      sx={{
        position: { xs: 'fixed', md: 'relative' },
        bottom: { xs: '78px', md: '20px' },
        left: '0',
        right: '0',
        padding: '10px 15px 5px 15px',
        display: 'flex',
        justifyContent: 'space-between',
        flex: 'auto 180px',

      }}
    >
      <Grid xs={8} sx={{ paddingTop: '10px', paddingRight: '5px'}}>
        {timeLeft > 0.5 ? (
          <Stack
            direction="row"
            spacing={1}
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',

            }}
          >
            <LinearProgress
              color="primary"
              variant="determinate"
              value={percentProgress}
              sx={{ width: {xs: '50%', md:'70%'}, paddingTop: '5px' }}
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
    </Container>
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
