import React from 'react'
import {
  Button,
  Link,
  ListItem,
  Paper,
  Typography,
  Stack,
  Grid,
  LinearProgress,
} from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download'
import Divider from '@mui/material/Divider'
import CheckIcon from '@mui/icons-material/Check'
import { useAuth } from '../../util/auth'
import { useVideoProgressByVideoId } from '../../util/db'
import { useTranslation } from 'react-i18next'
import { displayTime } from '../../util/timeHelpers'

function CourseVideoListItem({ video, videoId, setOpenCourseDrawer }) {
  const auth = useAuth()
  const { t } = useTranslation()

  const { data: videoProgress } = useVideoProgressByVideoId(
    auth.user.uid,
    videoId,
  )

  const videoProgressPercentage =
    videoProgress &&
    videoProgress[0].videoId === videoId &&
    (Number(videoProgress[0].progress) / Number(video.duration)) * 100

  const timeLeft =
    videoProgress &&
    videoProgress[0].videoId === videoId &&
    Number(video.duration) - Number(videoProgress[0].progress)

  const completed = timeLeft < 10

  return (
    <ListItem>
      <Paper elevation="1">
        <Grid container sx={{ display: 'flex', paddingBottom: '20px' }}>
          <Grid item xs={8}>
            <Typography variant="bold">{video.name}</Typography>
          </Grid>
          <Grid item xs={4} textAlign="center">
            {videoProgressPercentage ? (
              completed ? (
                <Stack direction="row">
                  <CheckIcon
                    sx={{
                      backgroundColor: 'inherit !important',
                      color: '#fff !important',
                    }}
                  />

                  <Typography sx={{ display: 'inline-block' }}>
                    {t('course.finished')}
                  </Typography>
                </Stack>
              ) : (
                <>
                  <Typography>{displayTime(timeLeft)} left</Typography>
                  <LinearProgress
                    variant="determinate"
                    value={videoProgressPercentage}
                  />
                </>
              )
            ) : (
              <Typography>{displayTime(video.duration)}</Typography>
            )}
          </Grid>
        </Grid>
        <Divider light />
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ paddingLeft: '20px', paddingTop: '20px' }}
        >
          <DownloadIcon
            sx={{
              backgroundColor: 'inherit !important',
              color: '#fff !important',
            }}
          />
          <Link
            flex="1"
            href={video.link}
            underline="none"
            sx={{ fontSize: '1rem' }}
          >
            {t('course.download')}
          </Link>
          {videoProgressPercentage ? (
            completed ? (
              <Button
                onClick={() => {
                  setOpenCourseDrawer(videoId)
                }}
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  flex: '1',
                }}
              >
                {t('course.start-over')}
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setOpenCourseDrawer(videoId)
                }}
                size="large"
                sx={{
                  flex: '1',
                  backgroundColor: 'white',
                  color: 'black',
                  borderRadius: '25px',
                }}
              >
                {t('btn.continue')}
              </Button>
            )
          ) : (
            <Button
              onClick={() => {
                setOpenCourseDrawer(videoId)
              }}
              variant="contained"
              color="primary"
              size="large"
              sx={{ flex: '1' }}
            >
              {t('course.start')}
            </Button>
          )}
        </Stack>
      </Paper>
    </ListItem>
  )
}

export default CourseVideoListItem
