import React, { useState } from 'react'
import Vimeo from '@u-wave/react-vimeo'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import EastIcon from '@mui/icons-material/East'
import useClasses from '../../hooks/useClasses'
import { useTranslation } from 'react-i18next'

const styles = (theme) => ({
  video: { iframe: { borderRadius: '10px' } },
})

function DashboardVideo({ course }) {
  const classes = useClasses(styles)
  const {t} = useTranslation();
  
  return (
    <Box sx={{ padding: '30px 0'}}>
      <Typography variant="sectionTitle" pt="0px" pb="20px">
        {t('featured-course')}
      </Typography>
      <Box as="div" >
        <Vimeo
          video={course.videoLinks.split(', ')[0]}
          responsive
          width="100%"
          height="100%"
          controls={true}
          // autoplay
          className={classes.video}
        />
      </Box>
      
      <Stack
        direction="row"
        spacing={1}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingTop: '20px',
          paddingRight: '10px',
          alignItems: 'center',
        }}
      >
        <Typography variant="bold"> {course.seriesName} {t("by")} {course.creator} </Typography>
        <IconButton sx={{ color: 'white' }} href={`/tutorial/${course.uid}`}>
          <EastIcon />
        </IconButton>
      </Stack>
    </Box>
  )
}

export default DashboardVideo
