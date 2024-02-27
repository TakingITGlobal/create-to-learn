import React from 'react'
import Vimeo from '@u-wave/react-vimeo'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import EastIcon from '@mui/icons-material/East'
import useClasses from '../../hooks/useClasses'
import CardActionArea from '@mui/material/CardActionArea'

const styles = (theme) => ({
  video: { iframe: { borderRadius: '10px' } },
})

function DashboardVideo({ course, title, icon }) {
  const classes = useClasses(styles)

  return (

  <Box sx={{ padding: '30px 0', maxWidth: '920px' }}>
    <Typography
        variant="sectionTitle"
        pt={{ xs: '20px', md: '75px' }}
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
        <Typography variant="bold"> {course.seriesName} Series</Typography>
        <EastIcon />
      </CardActionArea>
    </Box>
  )
}

export default DashboardVideo
