import React, { useEffect, useState } from 'react'
import useClasses from '../hooks/useClasses'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import LinkMui from '@mui/material/Link'
import Carousel from 'react-material-ui-carousel'
import MultiCarousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import { Button, Paper } from '@mui/material'
import Section from './Section'
import SectionHeader from './SectionHeader'
import DashboardItems from './DashboardItems'
import SignUp from './SignUp'
import CircularProgress from '@mui/material/CircularProgress'

import { Link, useRouter } from './../util/router'
import { useAuth } from './../util/auth'
import { useLearningPaths, useCoursePerCategory, useCreators } from '../util/db'

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const styles = theme => ({
  cardContent: {
    padding: theme.spacing(3),
  },

  carouselItem: {
    paddingRight: '20px',
    paddingBottom: '20px',
  }
});

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

function DashboardSection(props) {

  //This should be in local storage
  const [dismissSignUp, setDismissSignUp] = useState(false)

  const auth = useAuth()
  const classes = useClasses(styles)
  const categoryInterests = [
    'Video & Film',
    'Game Design',
    'Cultural Teachings',
  ]

  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container>
        <SectionHeader
          title={props.title}
          subtitle={props.subtitle}
          size={4}
          textAlign="center"
        />
        {!dismissSignUp && !auth.user && (
          <SignUp setDismissed={setDismissSignUp} showDismissButton={true} />
        )}
        {/* {router.query.paid && auth.user.planIsActive && (
          <Box mx="auto" mb={4} maxWidth={400}>
            <Alert severity="success">
              You are now subscribed to the {auth.user.planId} plan
              <span
                role="img"
                aria-label="party"
                style={{ marginLeft: '10px' }}
              >
                🥳
              </span>
            </Alert>
          </Box>
        )} */}

        {/* <Grid container={true} spacing={4}>
          <Grid item={true} xs={12} md={6}>
            <DashboardItems />
          </Grid>
          <Grid item={true} xs={12} md={6}>
            <Card>
              <CardContent className={classes.cardContent}>
                <Box>
                  <Typography variant="h6" paragraph={true}>
                    <strong>What is this?</strong>
                  </Typography>
                  <Typography paragraph={true}>
                    The component on your left is an example UI that shows you
                    how to fetch, display, and update a list of items that
                    belong to the current authenticated user. Try it now by
                    adding a couple items.
                  </Typography>
                  <Typography paragraph={true}>
                    It also shows how you can limit features based on plan. If
                    you're subscribed to the "pro" or "business" plan then
                    you'll be able to use the star button to highlight items,
                    otherwise you'll be asked to upgrade your plan.
                  </Typography>
                  <Typography paragraph={true}>
                    After exporting your code, you'll want to modify this
                    component to your needs. You may also find it easier to just
                    use this component as a reference as you build out your
                    custom UI.
                  </Typography>
                  <Box mt={3}>
                    <Typography variant="h6" paragraph={true}>
                      <strong>Extra debug info</strong>
                    </Typography>
                    <Typography component="div">
                      <div>
                        You are signed in as <strong>{auth.user.email}</strong>.
                      </div>

                      {auth.user.stripeSubscriptionId && (
                        <>
                          <div>
                            You are subscribed to the{' '}
                            <strong>{auth.user.planId} plan</strong>.
                          </div>
                          <div>
                            Your plan status is{' '}
                            <strong>
                              {auth.user.stripeSubscriptionStatus}
                            </strong>
                            .
                          </div>
                        </>
                      )}

                      <div>
                        You can change your account info{` `}
                        {auth.user.stripeSubscriptionId && <>and plan{` `}</>}
                        in{` `}
                        <LinkMui component={Link} to="/settings/my-account">
                          <strong>settings</strong>
                        </LinkMui>
                        .
                      </div>

                      {!auth.user.stripeSubscriptionId && (
                        <div>
                          You can signup for a plan in{' '}
                          <LinkMui component={Link} to="/pricing">
                            <strong>pricing</strong>
                          </LinkMui>
                          .
                        </div>
                      )}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid> */}
        <CreatorSpotlight />
        <LearningPath />
        {categoryInterests.map((interest, index) => (
          <TopCourses key={index} category={interest} />
        ))}
      </Container>
    </Section>
  )
}

export default DashboardSection

function CreatorSpotlight() {

  const { isLoading, data } = useCreators()

  useEffect(() => {
    if (!isLoading) {
      setCreators(data)
    }
  }, [data])

  return isLoading ? (
    <CircularProgress />
  ) : (
    <>
      <Box sx={{ paddingBottom: '5px' }}>
        <Typography>Creator Spotlight</Typography>
      </Box>
      <MultiCarousel
        ssr
        partialVisible
        responsive={responsive}
        swipeable
        itemClass={classes.carouselItem}
      >
        {creators.map((item, i) => {
          return (
            <Paper key={i} sx={{ padding: 2.5, height: '400px' }}>
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
                  src={
                    item && item.image && item.image.length
                      ? item.image[0].downloadURL
                      : ''
                  }
                  style={{
                    top: 0,
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                  }}
                />
              </Box>
              <Box sx={{ padding: '10px' }}>
                <h2>{item.seriesName}</h2>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingBottom: '5px',
                  }}
                >
                  <Typography>{item.name}</Typography>
                </Box>
                <Box sx={{ paddingBottom: '5px' }}>
                  <Typography>
                    {
                      item.pleaseIncludeAShort23SentenceBioThatWeCanUseWhenPromotingYourContent
                    }
                  </Typography>
                </Box>
                {/* <Box>
                <Button
                  color="primary"
                  fullWidth
                  variant="contained"
                  href={item.webUrl}
                >
                  See details
                </Button>
              </Box> */}
              </Box>
            </Paper>
          )
        })}
      </MultiCarousel>
    </>
  )
}

function LearningPath() {

  const { isLoading, data } = useLearningPaths()

  useEffect(() => {
    if (!isLoading) {
      setLearningPaths(data)
    }
  }, [data])

  return isLoading ? (
    <CircularProgress />
  ) : (
    <>
      <Box sx={{ paddingBottom: '5px' }}>
        <Typography>Learning paths for students</Typography>
      </Box>
      <MultiCarousel
        ssr
        partialVisible
        responsive={responsive}
        swipeable
        itemClass={classes.carouselItem}
      >
        {learningPaths.map((item, i) => (
          <Paper
            key={i}
            sx={{
              padding: '10px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ padding: '10px' }}>
              <Box>
                <h2>{item.name}</h2>
                <p>Throughout this unit ...</p>
                {item.seriesInPath.length > 0 && (
                  <p> Time Series: {item.seriesInPath.join()}</p>
                )}
              </Box>
              <Box>
                <Button color="primary" fullWidth variant="contained">
                  See details
                </Button>
              </Box>
            </Box>
          </Paper>
        ))}
      </MultiCarousel>
    </>
  )
}

function TopCourses({ category }) {

  const [courses, setCourses] = useState([])
  const classes = useClasses(styles)
  const { data: courseData } = useCoursePerCategory([category])

  useEffect(() => {
    if (courseData?.length) {
      setCourses(courseData)
    }
  }, [courseData])

  return (
    <>
      <Box sx={{ paddingBottom: '5px' }}>
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
            <Paper key={i} sx={{ padding: '2.5px'}}>
              <Box sx={{ padding: '10px' }}>
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
                    paddingBottom:'5px',
                  }}
                >
                  <>
                    <Typography>{item.creator}</Typography>
                    <Typography>
                      {item.videos.length}{' '}
                      {item.videos.length == 1 ? 'Video' : 'Videos'}
                    </Typography>
                  </>
                </Box>
                <Box sx={{ paddingBottom: '5px' }}>
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
