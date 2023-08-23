import React, { useState } from 'react'
import {
  Button,
  Paper,
  Typography,
  Stack,
  Grid,
  LinearProgress,
  List,
  ListItem,
  IconButton,
  Box,
} from '@mui/material'
import Radio from '@material-ui/core/Radio'
import Drawer from '@mui/material/Drawer'
import DownloadIcon from '@mui/icons-material/Download'
import Divider from '@mui/material/Divider'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import { useTranslation } from 'react-i18next'
import { displayTime } from '../../util/timeHelpers'
import { createDownloadCourse, updateDownloads } from '../../util/db'
import { useAuth } from '../../util/auth'

function CourseVideoListItem({
  video,
  videoId,
  courseId,
  courseUID,
  setOpenCourseDrawer,
  setVideoToShow,
  videoProgress,
  downloadsData,
}) {
  const { t } = useTranslation()
  const auth = useAuth()

  const [downloadSuccess, setDownloadSuccess] = useState([])
  const [openDownloadDrawer, setOpenDownloadDrawer] = useState(false)

  const videoProgressPercentage =
    videoProgress &&
    (Number(videoProgress.progress) / Number(video.duration)) * 100

  const timeLeft =
    videoProgress && Number(video.duration) - Number(videoProgress.progress)

  const completed = timeLeft < 10

  const getVideoDataToDownload = (video) => {
    return [
      {
        videoName: video.name,
        duration: video.duration,
        link: video.link,
        uri: video.uri,
      },
    ]
  }
  const isDownloaded = (videoURI) => {
    const downloadedVideoIds =
      downloadsData && downloadsData.length && downloadsData[0].videos
        ? downloadsData[0].videos.map((video) => video.uri)
        : []
    return downloadedVideoIds.includes(videoURI)
  }

  //ToDo: abstract this function to courseSection because it is used in both tabs of the Course Page
  const handleAddToDownloads = (link) => {
    if (!auth.user.uid) {
      return
    }

    const videoDownloadData = getVideoDataToDownload(video)

    if (!downloadsData.length) {
      createDownloadCourse({
        owner: auth.user.uid,
        courseId: courseId,
        courseUID: courseUID,
        videos: videoDownloadData,
      }).then(() => {
        window.location.href = link
        setOpenDownloadDrawer(false)
      })
    } else {
      const videosAlreadyAdded = downloadsData[0].videos
      const videosToAdd = videoDownloadData.filter(
        (video) =>
          !videosAlreadyAdded.map((video) => video.uri).includes(video.uri),
      )
      if (videosToAdd.length) {
        updateDownloads(downloadsData[0].id, {
          ...downloadsData[0],
          videos: [...videosAlreadyAdded, ...videosToAdd],
        }).then(() => setOpenDownloadDrawer(false))
      } else {
        setOpenDownloadDrawer(false)
      }
    }
  }

  return (
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
        {isDownloaded(video?.uri) ? (
          <Button
            startIcon={
              <CheckIcon sx={{ backgroundColor: '#58B97D !important' }} />
            }
            sx={{ color: '#BCE3CB' }}
          >
            {t('course.downloaded')}
          </Button>
        ) : (
          <Button
            flex="1"
            onClick={() => setOpenDownloadDrawer(true)}
            sx={{ fontSize: '1rem' }}
            startIcon={
              <DownloadIcon
                sx={{
                  backgroundColor: 'inherit !important',
                  color: '#fff !important',
                }}
              />
            }
          >
            {t('course.download')}
          </Button>
        )}
        {videoProgressPercentage ? (
          completed ? (
            <Button
              onClick={() => {
                setOpenCourseDrawer(true)
                setVideoToShow({ ...video, videoId: videoId })
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
                setOpenCourseDrawer(true)
                setVideoToShow({ ...video, videoId: videoId })
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
              setOpenCourseDrawer(true)
              setVideoToShow({ ...video, videoId: videoId })
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
      <Drawer
        anchor="bottom"
        open={openDownloadDrawer}
        onClose={() => setOpenDownloadDrawer(false)}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: '0 10px',
          }}
        >
          <Box sx={{ paddingTop: '10px' }}>
            <Typography>Download</Typography>
          </Box>
          <IconButton onClick={() => setOpenDownloadDrawer(false)}>
            <CloseIcon sx={{ color: 'white' }} />
          </IconButton>
        </Box>
        {video?.download && (
          <>
            <List>
              {video?.download.map(({ link, public_name }) => (
                <ListItem
                  secondaryAction={
                    <Radio
                      checked={downloadSuccess.includes(link)}
                      onChange={() => {
                        setDownloadSuccess(link)
                      }}
                      color="secondary"
                      name={`download-${public_name}`}
                      inputProps={{
                        'aria-label': `download-${public_name}`,
                      }}
                      style={{ color: 'white' }}
                    />
                  }
                >
                  {public_name}
                </ListItem>
              ))}
            </List>
            <Button
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: 'white !important',
                color: 'black !important',
                paddingTop: '10px !important',
                paddingBottom: '10px !important',
                borderRadius: '25px !important',
              }}
              onClick={() => {
                handleAddToDownloads(downloadSuccess)
              }}
            >
              {t('course.download')}
            </Button>
          </>
        )}
      </Drawer>
    </Paper>
  )
}

export default CourseVideoListItem
