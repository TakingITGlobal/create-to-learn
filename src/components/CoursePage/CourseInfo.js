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
  Checkbox,
  Switch,
} from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'
import Drawer from '@mui/material/Drawer'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SvgIcon from '@mui/material/SvgIcon'
import CourseStats from './CourseStats'
import { ChevronRight, Check, BookmarkBorder } from '@mui/icons-material'
import CheckIcon from '@mui/icons-material/CheckCircle'
import { useAuth } from '../../util/auth'
import {
  createWatchlistCourse,
  useWatchlistById,
  useUserProgressByOwner,
} from '../../util/db'
import { useTranslation } from 'react-i18next'
import { categories } from '../../assets/options/categories'
import { displayTime } from '../../util/timeHelpers'

function CourseInfo({
  course,
  setOpenSnackbar,
  setSnackbarMessage,
  setTabValue,
  videoInfo,
}) {
  const theme = useTheme()
  const auth = useAuth()
  const { t } = useTranslation()
  const [openDownloadDrawer, setOpenDownloadDrawer] = useState(false)
  const [videosToDownload, setVideosToDownload] = useState([])
  const [downloadVideos, setDownloadVideos] = useState(false)
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

  const { data: videosInProgress } = useUserProgressByOwner(auth?.user?.uid)

  const inProgressVideos = videosInProgress
    ? videosInProgress.filter(
        (video) =>
          course.videos.some((v) => v === video?.videoId) &&
          video?.progress > 0,
      )
    : []

  const totalTimeWatched =
    inProgressVideos.length > 1
      ? inProgressVideos.reduce(
          (acc, { progress }) => Number(acc.progress) + Number(progress),
        )
      : inProgressVideos.length === 1
      ? inProgressVideos[0].progress
      : 0

  const timeLeft = course.totalLength - totalTimeWatched

  const handleVideosToDownload = (uri) => {
    videosToDownload.includes(uri)
      ? setVideosToDownload(videosToDownload.filter((id) => id !== uri))
      : setVideosToDownload([...videosToDownload, uri])
  }

  const Download = () => {
    const videos = videoInfo.filter((video) =>
      videosToDownload.includes(video.uri),
    )
    return (
      <div style={{ display: 'none' }}>
        {videos.map((video) => (
          <iframe title={video.name} src={video.download[0].link} />
        ))}
      </div>
    )
  }

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
                  value={20}
                  sx={{ width: '120px' }}
                />
                <Typography>{displayTime(timeLeft)} left </Typography>
              </Stack>
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
              endIcon={<ExpandMoreIcon />}
            >
              {t('course.download')}
            </Button>
          </Stack>

          {/* Topic List */}
          <Typography variant="bold" sx={{ mT: 2 }}>
            {t('course.topic')}
          </Typography>
          <List>
            {topics.map(({ label, icon }) => (
              <ListItem>
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
                {course.materials.map((material) => (
                  <ListItem>
                    <Check />
                    <ListItemText disableTypography primary={material} />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </Box>
        <Drawer
          anchor="bottom"
          open={openDownloadDrawer}
          onClose={() => {
            setOpenDownloadDrawer(false)
            setDownloadVideos(false)
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: '0 17.5px',
            }}
          >
            <Box sx={{ paddingTop: '10px' }}>Download all lesson</Box>
            <Switch
              checked={videosToDownload.length === videoInfo.length}
              onChange={
                videosToDownload.length === videoInfo.length
                  ? () => setVideosToDownload([])
                  : () => setVideosToDownload(videoInfo.map(({ uri }) => uri))
              }
            />
          </Box>
          <List>
            {videoInfo &&
              videoInfo.length &&
              videoInfo.map(({ uri, name }) => (
                <ListItem
                  secondaryAction={
                    <Checkbox
                      value={name}
                      checked={videosToDownload.includes(uri)}
                      onChange={() => handleVideosToDownload(uri)}
                      name={`download-${uri}`}
                      inputProps={{
                        'aria-label': `download-${uri}`,
                      }}
                      style={{ color: '#6956F1' }}
                    />
                  }
                >
                  {name}
                </ListItem>
              ))}
          </List>
          <Button
            fullWidth
            variant="contained"
            sx={{ backgroundColor: 'white', color: 'black' }}
            onClick={() => {
              setDownloadVideos(true)
            }}
          >
            {t('btn.continue')}
          </Button>
          {downloadVideos && <Download />}
        </Drawer>
      </Box>
    </>
  )
}

export default CourseInfo
