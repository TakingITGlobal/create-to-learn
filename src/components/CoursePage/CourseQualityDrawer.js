import React from 'react'
import {
  Button,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
} from '@mui/material'
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
  handleAddToDownloads,
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
      <FormControl>
        <FormLabel
          id="video-quality"
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
              handleCloseDrawer()
            }}
          >
            {t('course.quality')}
          </Button>
          <Close sx={{ color: 'white', '&:hover': { cursor: 'pointer' } }} />
        </FormLabel>
        <RadioGroup
          aria-labelledby="video-quality"
          defaultValue="1080p"
          name="video-quality-group"
          sx={{ paddingRight: '35px', marginY: '10px' }}
        >
          {qualityOptions.map((opt, i) => (
            <FormControlLabel
              key={i}
              value={opt}
              checked={quality === opt}
              onChange={() => setQuality(() => opt)}
              labelPlacement="start"
              control={
                <Radio
                  color="secondary"
                  name={`quality-${opt}`}
                  inputProps={{
                    'aria-label': `quality-${opt}`,
                  }}
                  style={{ color: 'white' }}
                />
              }
              label={opt}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
              }}
            />
          ))}
        </RadioGroup>
      </FormControl>

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
          handleAddToDownloads()
          setOpenDownloadDrawer(() => false)
        }}
      >
        {t('course.download')}
      </Button>
    </Drawer>
  )
}

export default QualityDrawer
