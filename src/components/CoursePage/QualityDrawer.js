import React from 'react'
import { Box, Button, List, ListItem } from '@mui/material'
import Drawer from '@mui/material/Drawer'
import Radio from '@material-ui/core/Radio'

import { Close, ChevronLeft } from '@mui/icons-material'

import { useTranslation } from 'react-i18next'

function QualityDrawer({
  setDownloadVideos,
  setOpenDownloadDrawer,
  setVideosToDownload,
  quality,
  setQuality,
  qualityDrawer,
  setQualityDrawer,
}) {
  const { t } = useTranslation()

  const qualityOptions = ['240p', '360p', '540p', '720p', '1080p']

  const handleCloseDrawer = () => {
    setQualityDrawer(false)
    setDownloadVideos(false)
    setVideosToDownload([])
  }

  return (
    <Drawer
      anchor="bottom"
      open={qualityDrawer}
      onClose={() => {
        handleCloseDrawer()
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingRight: '25px',
          marginTop: '10px',
        }}
      >
        <Button
          startIcon={<ChevronLeft sx={{ color: 'white' }} />}
          onClick={() => {
            setOpenDownloadDrawer(true)
            setQualityDrawer(false)
          }}
        >
          {t('course.quality')}
        </Button>
        <Close
          sx={{ color: 'white' }}
          onClick={() => {
            handleCloseDrawer()
          }}
        />
      </Box>
      <List>
        {qualityOptions.map((option, index) => (
          <ListItem
            key={index}
            secondaryAction={
              <Radio
                checked={quality === option}
                onChange={() => {
                  setQuality(option)
                }}
                color="secondary"
                name={`quality-${option}`}
                inputProps={{
                  'aria-label': `quality-${option}`,
                }}
                style={{ color: 'white' }}
              />
            }
          >
            {option}
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
          setDownloadVideos(true)
        }}
      >
        {t('course.download')}
      </Button>
    </Drawer>
  )
}

export default QualityDrawer
