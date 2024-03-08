import React, { useState } from 'react'
import Vimeo from '@u-wave/react-vimeo'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import EastIcon from '@mui/icons-material/East'
import useClasses from '../../hooks/useClasses'
import { useTranslation } from 'react-i18next'
import CardActionArea from '@mui/material/CardActionArea'

const styles = (theme) => ({
  video: { iframe: { borderRadius: '10px' } },
})

function DashboardVideo({ course, title, icon }) {
  const classes = useClasses(styles)
  const {t} = useTranslation();
  
  return (

  <Box sx={{ padding: '30px 0 20px', maxWidth: '920px' }}>
    <Typography
        variant="sectionTitle"
        pb="20px"
      >
        {icon}
        {title}
      </Typography>
      <Vimeo
        video={course.videoLinks.split(', ')[0]}
        responsive
        width="100%"
        height="100%"
        controls={true}
        // autoplay
        className={classes.video}
      />
      <CardActionArea
        direction="row"
        spacing={1}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingTop: '20px',
          paddingRight: '10px',
          paddingBottom: '20px',
          alignItems: 'center',
        }}
        href={`/tutorial/${course.uid}`}
      >
        <Typography variant="bold"> {course.seriesName} {t("by")} {course.creator}</Typography>
        <EastIcon />
      </CardActionArea>
    </Box>
  )
}

export default DashboardVideo
