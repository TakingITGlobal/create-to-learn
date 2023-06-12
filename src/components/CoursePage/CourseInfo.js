import React, { useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  Link,
  List,
  ListItem,
  ListItemText,
  Typography,
  Stack,
  useTheme,
  ListItemIcon,
  Grid,
} from '@mui/material'
import SvgIcon from '@mui/material/SvgIcon'
import LinearProgress from '@mui/material/LinearProgress'

import {
  ChevronRight,
  Check,
  BookmarkBorder,
  ExpandMore,
} from '@mui/icons-material'
import CourseStats from './CourseStats'
import CourseQualityDrawer from './CourseQualityDrawer'
import CourseDownloadDrawer from './CourseDownloadDrawer'
import CheckIcon from '@mui/icons-material/CheckCircle'
import CheckSimpleIcon from '@mui/icons-material/Check'
import { useAuth } from '../../util/auth'
import { createWatchlistCourse, useWatchlistById } from '../../util/db'
import { useTranslation } from 'react-i18next'
import { categories } from '../../assets/options/categories'
import { displayTime } from '../../util/timeHelpers'

function CourseInfo({
  course,
  setOpenSnackbar,
  setSnackbarMessage,
  setTabValue,
  videoInfo,
  courseProgress,
}) {
  const theme = useTheme()
  const auth = useAuth()
  const { t } = useTranslation()
  const [openDownloadDrawer, setOpenDownloadDrawer] = useState(false)
  const [videosToDownload, setVideosToDownload] = useState([])
  const [downloadVideos, setDownloadVideos] = useState(false)
  const [qualityDrawer, setQualityDrawer] = useState(false)
  const [quality, setQuality] = useState('')
  const { data } = useWatchlistById(auth.user?.uid, course.id)

  const creatorUID = course.creator.trim().replaceAll(' ', '-').toLowerCase()
  const topics = course.category.map((topic) => {
    return {
      label: topic,
      icon: categories.find(({ label }) => label === topic).icon,
    }
  })

  const handleAddToWatchlist = () => {
    setOpenSnackbar(true)
    if (!data?.length && auth.user) {
      createWatchlistCourse({
        owner: auth.user.uid,
        courseId: course.id,
        courseUID: course.uid,
      }).then(setSnackbarMessage('Success!  Added to your watchlist'))
    }
  }

  const inProgressVideos = courseProgress
    ? courseProgress.filter((video) => video?.progress > 0)
    : []

  const totalTimeWatched =
    inProgressVideos.length > 1
      ? inProgressVideos
          .map(({ progress }) => progress)
          .reduce((acc, curr) => acc + curr)
      : inProgressVideos.length === 1
      ? inProgressVideos[0].progress
      : 0

  //Check if this should be turned into hrs:minutes:seconds
  const timeLeft = course.totalLength - totalTimeWatched

  const percentProgress = (totalTimeWatched / course.totalLength) * 100

  const Download = () => {
    const videos = videoInfo
      .filter((video) => videosToDownload.includes(video.uri))
      .flatMap(({ download }) =>
        download.filter(({ public_name }) => public_name === quality),
      )

    return (
      <div style={{ display: 'none' }}>
        {videos.map((video, index) =>
          video?.link ? (
            <iframe key={index} title={video.link} src={video.link} />
          ) : null,
        )}
      </div>
    )
  }

  console.log(percentProgress, totalTimeWatched)

  return (
    <>
      <Box sx={{ padding: ' 0 1em' }}>
        {/* Artist information */}
        <Link
          href={'/creator/' + creatorUID}
          color="inherit"
          underline="none"
          variant="profile"
        >
          <Avatar
            alt={course.creator}
            src={course.thumbnail[0]?.downloadURL}
            sx={{ width: '48px', height: '48px' }}
          />
          <Box>
            <Typography variant="bold" component="body1">
              {course.creator}
            </Typography>
            <Typography variant="subtitle1">Creator Community</Typography>
          </Box>
          <ChevronRight />
        </Link>

        {/* Regular paragraph */}
        <Typography
          variant="body2"
          color={theme.palette.text.secondary}
          sx={{ marginBottom: 2 }}
        >
          {course.description}
        </Typography>
        <CourseStats
          numberOfVideos={course.videos.length}
          courseLength={course.totalLength}
          difficultyLevel={course.difficultyLevel}
        />

        {/* Start Creating Button */}
        {inProgressVideos.length ? (
          <Grid
            container
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Grid xs={8}>
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
                    sx={{ width: '120px' }}
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
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={() => setTabValue(1)}
          >
            {t('course.start-creating')}
          </Button>
        )}

        {/* Add to Watchlist button */}

        <Box>
          <Stack
            direction="row"
            spacing={1}
            mb="15px"
            mt="20px"
            alignItems="center"
          >
            {data?.length ? (
              <Stack direction="row" spacing={2}>
                <CheckIcon sx={{ fill: '#58B97D' }} />
                <Typography sx={{ color: '#BCE3CB' }}>
                  {t('course.added-to-watchlist')}
                </Typography>
              </Stack>
            ) : (
              <Button
                variant="text"
                startIcon={<BookmarkBorder />}
                onClick={() => handleAddToWatchlist()}
              >
                {t('add-to-watchlist')}
              </Button>
            )}
            <Button
              variant="text"
              onClick={() => setOpenDownloadDrawer(true)}
              endIcon={<ExpandMore />}
            >
              {t('course.download')}
            </Button>
          </Stack>

          {/* Topic List */}
          <Typography variant="bold" sx={{ mT: 2 }}>
            {t('course.topic')}
          </Typography>
          <List>
            {topics.map(({ label, icon }, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <SvgIcon
                    fontSize="large"
                    component="div"
                    sx={{ paddingBottom: '10px' }}
                  >
                    {icon}
                  </SvgIcon>
                </ListItemIcon>
                <ListItemText>{label}</ListItemText>
              </ListItem>
            ))}
          </List>

          {/* What You'll Learn List */}
          <Typography variant="bold" sx={{ marginTop: 2 }}>
            {t('course.what-you-learn')}
          </Typography>
          <List variant="icon-list">
            <ListItem>
              <Check />
              <ListItemText disableTypography primary="Item 1" />
            </ListItem>
            <ListItem>
              <Check />
              <ListItemText disableTypography primary="Item 2" />
            </ListItem>
          </List>

          {/* What You'll Need List*/}
          {course.materials && (
            <Box>
              <Typography variant="bold" sx={{ marginTop: 2 }}>
                {t('course.what-you-need')}
              </Typography>
              <List variant="icon-list">
                {course.materials.map((material, index) => (
                  <ListItem key={index}>
                    <Check />
                    <ListItemText disableTypography primary={material} />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </Box>
        <CourseDownloadDrawer
          openDownloadDrawer={openDownloadDrawer}
          setOpenDownloadDrawer={setOpenDownloadDrawer}
          setDownloadVideos={setDownloadVideos}
          videosToDownload={videosToDownload}
          setVideosToDownload={setVideosToDownload}
          setQualityDrawer={setQualityDrawer}
          videoInfo={videoInfo}
        />
        <CourseQualityDrawer
          setDownloadVideos={setDownloadVideos}
          setOpenDownloadDrawer={setOpenDownloadDrawer}
          setVideosToDownload={setVideosToDownload}
          quality={quality}
          setQuality={setQuality}
          qualityDrawer={qualityDrawer}
          setQualityDrawer={setQualityDrawer}
        />
        {downloadVideos && <Download />}
      </Box>
    </>
  )
}

export default CourseInfo
