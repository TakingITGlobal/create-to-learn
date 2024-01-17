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
} from '@mui/material'
import SvgIcon from '@mui/material/SvgIcon'

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
import { useAuth } from '../../util/auth'
import { createWatchlistCourse, useWatchlistById } from '../../util/db'
import { useTranslation } from 'react-i18next'
import { categories } from '../../assets/options/categories'
import { handleAddToDownloads } from './handleAddToDownloads'

function CourseInfo({
  course,
  setOpenSnackbar,
  setSnackbarMessage,
  videoInfo,
  courseProgress,
  downloadsData,
}) {
  const theme = useTheme()
  const auth = useAuth()
  const { t } = useTranslation()
  const [openDownloadDrawer, setOpenDownloadDrawer] = useState(false)
  const [videosToDownload, setVideosToDownload] = useState([])
  const [downloadVideos, setDownloadVideos] = useState(false)
  const [qualityDrawer, setQualityDrawer] = useState(false)
  const [quality, setQuality] = useState('')
  const { data: watchlistData } = useWatchlistById(auth.user?.uid, course.id)

  const creatorUID = course.creator.trim().replaceAll(' ', '-').toLowerCase()
  const topics = course.category.map((topic) => {
    return {
      label: topic,
      icon: categories.find(({ label }) => label === topic).icon,
    }
  })

  const handleAddToWatchlist = () => {
    setOpenSnackbar(true)
    if (!watchlistData?.length && auth.user) {
      createWatchlistCourse({
        owner: auth.user.uid,
        courseId: course.id,
        courseUID: course.uid,
      }).then(setSnackbarMessage('Success!  Added to your watchlist'))
    }
  }

  const handleCloseDrawers = (title) => {
    setSnackbarMessage(title)
    setOpenSnackbar(true)
    setQualityDrawer(false)
  }

  const handleDownloads = () => {
    handleAddToDownloads(
      handleCloseDrawers,
      auth,
      downloadsData,
      course,
      videosToDownload,
      videoInfo,
      quality,
    )
  }

  return (
    <>
      <Box sx={{ padding: ' 0 1em', height: '100%' }}>
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
          <ChevronRight
            sx={{
              marginLeft: { xs: 'auto' },
              fontSize: { md: '2.5em' },
            }}
          />
        </Link>
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
        <Box>
          <Stack
            direction="row"
            spacing={1}
            mb="15px"
            mt="20px"
            alignItems="center"
          >
            {watchlistData?.length ? (
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
          {/* NOTE: no data to display this yet
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
          */}

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
          quality={quality}
          setQuality={setQuality}
          qualityDrawer={qualityDrawer}
          setQualityDrawer={setQualityDrawer}
          handleAddToDownloads={handleDownloads}
          setOpenSnackbar={setOpenSnackbar}
          setSnackbarMessage={setSnackbarMessage}
          downloadsData={downloadsData}
          course={course}
          videoInfo={videoInfo}
          videosToDownload={videosToDownload}
          setVideosToDownload={setVideosToDownload}
        />
      </Box>
    </>
  )
}

export default CourseInfo
