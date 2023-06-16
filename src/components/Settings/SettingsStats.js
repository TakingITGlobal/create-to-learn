import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import SvgIcon from '@mui/material/SvgIcon'
import CompletedIcon from '../../assets/images/completed.svg'
import DurationIcon from '../../assets/images/duration.svg'
import VideoIcon from '../../assets/images/video.svg'
import { useTranslation } from 'react-i18next'
import { useUserProgressByOwner } from '../../util/db'
import { useAuth } from '../../util/auth'

const Stats = () => {
  const { t } = useTranslation()
  const auth = useAuth()

  const { data: userProgress } = useUserProgressByOwner(auth?.user?.uid)

  const completedVideos =
    userProgress && userProgress.filter(({ complete }) => complete).length

  const minutesWatched =
    userProgress &&
    userProgress
      .map(({ progress }) => progress)
      .reduce((acc, curr) => parseInt(acc) + parseInt(curr / 60))

  const coursesTaken = userProgress
    ? [
        ...new Set(
          userProgress
            .map(({ courseId }) => courseId)
            .filter((courseId) => courseId),
        ),
      ]
    : []

  return (
    <Box sx={{ padding: '40px 10px 10px 10px' }}>
      <Grid container spacing={1} sx={{ width: '100%' }}>
        <Grid item xs={4}>
          <Box
            sx={{
              padding: '0 2.5px',
              backgroundColor: '#715FF2',
              color: 'black',
            }}
          >
            <Box sx={{ padding: '10px' }}>
              <SvgIcon
                fontSize="large"
                component="div"
                sx={{ paddingBottom: '10px' }}
              >
                <img
                  src={CompletedIcon}
                  alt="completed-icon"
                  style={{ paddingBottom: '10px' }}
                />
              </SvgIcon>
              <Typography variant="h6">{coursesTaken.length}</Typography>
              {/* To do: Only write course taken if there is only one */}
              <Typography variant="body2">
                {t('settings.courses-taken')}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              padding: '0 2.5px',
              backgroundColor: '#58B97D',
              color: 'black',
            }}
          >
            <Box sx={{ padding: '10px' }}>
              <SvgIcon
                fontSize="large"
                component="div"
                sx={{ paddingBottom: '10px' }}
              >
                <img
                  src={DurationIcon}
                  alt="completed-icon"
                  style={{ paddingBottom: '10px' }}
                />
              </SvgIcon>
              <Typography variant="h6">{minutesWatched}</Typography>
              <Typography variant="body2">
                {t('settings.minutes-watched')}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              padding: '0 2.5px',
              backgroundColor: '#A864EC',
              color: 'black',
            }}
          >
            <Box sx={{ padding: '10px' }}>
              <SvgIcon
                fontSize="large"
                component="div"
                sx={{ paddingBottom: '10px' }}
              >
                <img
                  src={VideoIcon}
                  alt="completed-icon"
                  style={{ paddingBottom: '10px' }}
                />
              </SvgIcon>
              <Typography variant="h5">{completedVideos}</Typography>
              <Typography variant="body2">
                {t('settings.videos-completed')}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Stats
