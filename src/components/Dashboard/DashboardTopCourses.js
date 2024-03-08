import React from 'react'
import MultiCarousel from 'react-multi-carousel'
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Stack,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import 'react-multi-carousel/lib/styles.css'

import { useTranslation } from 'react-i18next'


const DashboardTopCourses = ({ title, courses, icon }) => {
  const coursesLength = courses.length;

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      partialVisibilityGutter: coursesLength < 4 ? 0 : 60, 
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      partialVisibilityGutter: 50,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 100,
    },
  }

  const theme = useTheme()
  const { t } = useTranslation()

  return courses.length ? (
    <>
      <Typography
        variant="sectionTitle"
        pt={{ xs: '30px', md: '40px' }}
        pb="20px"
      >
        {icon}
        {title}
      </Typography>

      <MultiCarousel
        ssr
        partialVisible={true}
        responsive={responsive}
        swipeable
        customTransition={'transform 300ms linear'}
      >
        {courses.map((course, i) => {
          return (
            <Card
              key={i}
              sx={{
                padding: '0',
                margin: '0 10px',
                display: 'flex',
                justifyContent:'flex-start',
              }}
            >
            {/* Gray Box Area of the Card */}
              <CardActionArea
                sx={{
                  height: '100%',
                  padding: '15px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  backgroundColor: theme.palette.background.secondary,
                }}
                href={'/tutorial/' + course.uid}
              >
              {/* Image of the Card */}
                <CardMedia
                  component="img"
                  alt={`${course.seriesName}-course`}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    borderRadius: '6px',
                    objectFit: 'cover',
                  }}
                  image={course.thumbnail[0]?.downloadURL}
                />
                {/* Words in Card*/}
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '10px 0 0 0',
                  }}
                >
                  <Box sx={{ display:'flex', flexDirection:'column' }}>
                    <Typography 
                      component="h3" 
                      variant="bold"
                      sx = {{
                        maxWidth: {xs:'53vw', sm:'25vw', md:'20vw'},
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                      }}
                    >
                      {course.seriesName}
                    </Typography>
                    <Typography 
                      variant="body" 
                      component="p"
                      sx = {{
                        maxWidth: {sm:'30vw', md:'20vw'},
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                      }}
                    >
                      {course.creator}
                    </Typography>
                    <Stack direction="row">
                      <Typography variant="subtitle1" component="p">
                        {course.difficultyLevel}
                      </Typography>
                      <Box padding={'0 3px'}>&#183;</Box>
                      <Typography 
                        variant="subtitle1" 
                        component="p"
                        sx = {{
                          maxWidth: {sm:'30vw', md:'20vw'},
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                      }}  
                      >
                        {course.videos.length} {t('videos')}
                      </Typography>
                    </Stack>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          )
        })}
      </MultiCarousel>
    </>
  ) : null
}

export default DashboardTopCourses
