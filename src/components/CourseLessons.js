import React, { useState } from 'react'
import Video from './Video'
import {
  Button,
  Link,
  List,
  ListItem,
  Paper,
  Typography,
  Stack,
  Grid,
} from '@mui/material'
import Drawer from '@mui/material/Drawer'
import DownloadIcon from '@mui/icons-material/Download'
import Divider from '@mui/material/Divider'
import { useAuth } from '../util/auth'

function CourseLessons({ videoInfo, videos }) {
  const auth = useAuth()

  const [openCourseDrawer, setOpenCourseDrawer] = useState(false)

  const handleStartButtonClick = (videoId) => {
    setOpenCourseDrawer(videoId)
  }

  return (
    <List variant="progress">
      {videoInfo &&
        videoInfo.map((video, index) => {
          return (
            <>
              <ListItem>
                <Paper elevation="1">
                  <Grid
                    container
                    sx={{ display: 'flex', paddingBottom: '20px' }}
                  >
                    <Grid item xs={6}>
                      <Typography variant="bold">{video.name}</Typography>
                    </Grid>
                    <Grid item xs={6} textAlign="center">
                      <Typography variant="bold">
                        {displayTime(video.duration)}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider light />
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ paddingLeft: '20px', paddingTop: '20px' }}
                  >
                    <DownloadIcon />
                    <Link
                      flex="1"
                      href={video.link}
                      underline="none"
                      sx={{ fontSize: '1rem' }}
                    >
                      Download
                    </Link>
                    <Button
                      onClick={() => {
                        handleStartButtonClick(videos[index])
                      }}
                      variant="contained"
                      color="primary"
                      size="large"
                      sx={{ flex: '1' }}
                    >
                      Start
                    </Button>
                  </Stack>
                </Paper>
              </ListItem>
              <Drawer
                anchor="right"
                open={openCourseDrawer === videos[index]}
                onClose={() => setOpenCourseDrawer(false)}
              >
                <Typography variant="h1">{video.name}</Typography>
                <Video video={video.link} id={videos[index]} user={auth.user} />
              </Drawer>
            </>
          )
        })}
    </List>
  )
}

export default CourseLessons
const displayTime = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds
  return `${minutes}: ${formattedSeconds}`
}
