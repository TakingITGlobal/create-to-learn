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

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    partialVisibilityGutter: 60,
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

const DashboardTopCourses = ({ title, courses, icon }) => {
  const theme = useTheme()
  const { t } = useTranslation()

  return courses.length ? (
    <>
      <Typography variant="sectionTitle" pt="20px" pb="20px">
        {icon}
        {title}
      </Typography>

      <MultiCarousel
        ssr
        partialVisible={true}
        responsive={responsive}
        swipeable
      >
        {courses.map((course, i) => {
          return (
            <Card
              key={i}
              sx={{
                padding: '0',
                margin: '0 10px',
              }}
            >
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
                href={'/course/' + course.uid}
              >
                <CardMedia
                  component="img"
                  alt={`${course.seriesName}-course`}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    height: '200px',
                    borderRadius: '6px',
                    objectFit: 'cover',
                  }}
                  image={course.thumbnail[0]?.downloadURL}
                />
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '10px 0 0 0',
                  }}
                >
                  <Box componant="div">
                    <Typography component="h3" variant="bold">
                      {course.seriesName}
                    </Typography>
                    <Typography variant="body" component="p">
                      {course.creator}
                    </Typography>
                    <Stack direction="row">
                      <Typography variant="subtitle1" component="p">
                        {course.difficultyLevel}
                      </Typography>
                      <>&#183;</>
                      <Typography variant="subtitle1" component="p">
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
