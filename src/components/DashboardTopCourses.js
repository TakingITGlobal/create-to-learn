import React, { useEffect, useState } from 'react'
import MultiCarousel from 'react-multi-carousel'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { Button, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useCoursePerCategory } from '../util/db'
import 'react-multi-carousel/lib/styles.css'

const useStyles = makeStyles((theme) => ({
  cardContent: {
    padding: theme.spacing(3),
  },
  carouselItem: {
    paddingRight: '20px',
    paddingBottom: '20px',
  },
}))

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    paritialVisibilityGutter: 60,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    paritialVisibilityGutter: 50,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    paritialVisibilityGutter: 40,
  },
}

const DashboardTopCourses = ({ category }) => {
  const classes = useStyles()
  const [courses, setCourses] = useState([])

  const { data: courseData } = useCoursePerCategory([category])

  useEffect(() => {
    if (courseData?.length) {
      setCourses(courseData)
    }
  }, [courseData])

  return (
    <>
      <Box sx={{ paddingBottom: 5 }}>
        <Typography>Top Courses in {category}</Typography>
      </Box>
      <MultiCarousel
        ssr
        partialVisible
        responsive={responsive}
        swipeable
        itemClass={classes.carouselItem}
      >
        {courses.map((item, i) => {
          return (
            <Paper key={i} sx={{ padding: 2.5, height: '450px' }}>
              <Box sx={{ padding: 10 }}>
                {/* Use the course photo instead of the creator photo once we have a valid url */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    height: '200px',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    alt={`${item.seriesName}-course`}
                    src={item.thumbnail[0]?.downloadURL}
                    style={{
                      top: 0,
                      width: '100%',
                      height: 'auto',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
                <h2>{item.seriesName}</h2>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingBottom: 5,
                  }}
                >
                  <>
                    <Typography>{item.creator}</Typography>
                    <Typography>
                      {item.videos.length}{' '}
                      {item.videos.length === 1 ? 'Video' : 'Videos'}
                    </Typography>
                  </>
                </Box>
                <Box sx={{ paddingBottom: 5 }}>
                  <Typography>Materials: </Typography>
                </Box>
                <Box>
                  <Button
                    color="primary"
                    fullWidth
                    variant="contained"
                    href={'/course/' + item.uid}
                  >
                    See details
                  </Button>
                </Box>
              </Box>
            </Paper>
          )
        })}
      </MultiCarousel>
    </>
  )
}

export default DashboardTopCourses
