import React from 'react'
import { Box, Button, List, ListItem, Checkbox, Switch } from '@mui/material'
import Drawer from '@mui/material/Drawer'

import { useTranslation } from 'react-i18next'

function CourseInfo({
  openDownloadDrawer,
  setOpenDownloadDrawer,
  downloadVideos,
  setDownloadVideos,
  videosToDownload,
  setVideosToDownload,
  setQualityDrawer,
  videoInfo,
}) {
  const { t } = useTranslation()

  const handleVideosToDownload = (uri) => {
    videosToDownload.includes(uri)
      ? setVideosToDownload(videosToDownload.filter((id) => id !== uri))
      : setVideosToDownload([...videosToDownload, uri])
  }

  return (
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
        <Box sx={{ paddingTop: '10px' }}>{t('course.download-all')}</Box>
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
          videoInfo.map(({ uri, name }, index) => (
            <ListItem
              key={index}
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
          setQualityDrawer(true)
          setOpenDownloadDrawer(false)
        }}
      >
        {t('btn.continue')}
      </Button>
    </Drawer>
  )
}

export default CourseInfo
