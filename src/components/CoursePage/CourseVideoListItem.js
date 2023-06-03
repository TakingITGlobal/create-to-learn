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
import Link from '@mui/material/Link'
import DownloadIcon from '@mui/icons-material/Download'
import Divider from '@mui/material/Divider'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import { useAuth } from '../../util/auth'
import { useVideoProgressByVideoId } from '../../util/db'
import { useTranslation } from 'react-i18next'
import { displayTime } from '../../util/timeHelpers'

function CourseVideoListItem({ video, videoId, setOpenCourseDrawer }) {
  const auth = useAuth()
  const { t } = useTranslation()
  const [downloadSuccess, setDownloadSuccess] = useState([])
  const [openDownloadDrawer, setOpenDownloadDrawer] = useState(false)

  const { data: videoProgress } = useVideoProgressByVideoId(
    auth.user?.uid,
    videoId,
  )

  const videoProgressPercentage =
    videoProgress &&
    videoProgress.length &&
    videoProgress[0].videoId === videoId &&
    (Number(videoProgress[0].progress) / Number(video.duration)) * 100

  const timeLeft =
    videoProgress &&
    videoProgress.length &&
    videoProgress[0].videoId === videoId &&
    Number(video.duration) - Number(videoProgress[0].progress)

  const completed = timeLeft < 10

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
        {downloadSuccess.length ? (
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
            // href={video.download[0].link}
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
        <List>
          {video.download.map(({ link, public_name }) => (
            <ListItem
              secondaryAction={
                <Radio
                  checked={downloadSuccess.includes(public_name)}
                  onChange={() => {
                    setDownloadSuccess([...downloadSuccess, public_name])
                    setOpenDownloadDrawer(false)
                    window.location.href = link
                  }}
                  label={<Button href={link} />}
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
      </Drawer>
    </Paper>
  )
}

export default CourseVideoListItem
