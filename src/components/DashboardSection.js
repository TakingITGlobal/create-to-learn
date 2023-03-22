import React from 'react'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Alert from '@material-ui/lab/Alert'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import LinkMui from '@material-ui/core/Link'
import Carousel from 'react-material-ui-carousel'
import MultiCarousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import { Paper, Button } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles'
import Section from './Section'
import SectionHeader from './SectionHeader'
import DashboardItems from './DashboardItems'
import { Link, useRouter } from './../util/router'
import { useAuth } from './../util/auth'

const useStyles = makeStyles((theme) => ({
  cardContent: {
    padding: theme.spacing(3),
  },
  carouselItem: {
    padding: '10px',
  },
}))

function Item(props) {
  return (
    <Paper>
      <h2>{props.item.name}</h2>
      <p>{props.item.description}</p>

      <Button className="CheckButton">Check it out!</Button>
    </Paper>
  )
}

function DashboardSection(props) {
  const classes = useStyles()

  const auth = useAuth()
  const router = useRouter()

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

        <LearningPath />
        <TopCourses />
      </Container>
    </Section>
  )
}

export default DashboardSection

function LearningPath() {
  var items = [
    {
      name: 'Photography Filming and Acting',
      description:
        'Throughout this unit, student will learn the basics of photography and filming',
      time: '5 lessons, 1 hr 30 minutes',
    },
    {
      name: 'Web development and design',
      description:
        'Throughout this unit, student will learn the basics of web development',
      time: '7 lessons, 2 hr 30 minutes',
    },
  ]
  return (
    <>
      <Box>
        <Typography>Learning paths for students</Typography>
      </Box>
      <Carousel animation="slide" interval={null} swipe>
        {items.map((item, i) => (
          <Paper key={i} sx={{ padding: 2.5 }}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>{item.time}</p>

            <Box>
              <Button color="primary" fullWidth variant="contained">
                See details
              </Button>
            </Box>
          </Paper>
        ))}
      </Carousel>
    </>
  )
}

function TopCourses() {
  const classes = useStyles()

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
  var items = [
    {
      name: 'Photography Filming and Acting',
      description:
        'Throughout this unit, student will learn the basics of photography and filming',
      time: '5 lessons, 1 hr 30 minutes',
    },
    {
      name: 'Web development; coding and design',
      description:
        'Throughout this unit, student will learn the basics of web development',
      time: '7 lessons, 2 hr 30 minutes',
    },
    {
      name: 'Photography Filming and Acting',
      description:
        'Throughout this unit, student will learn the basics of photography and filming',
      time: '5 lessons, 1 hr 30 minutes',
    },
    {
      name: 'Web development; coding and design',
      description:
        'Throughout this unit, student will learn the basics of web development',
      time: '7 lessons, 2 hr 30 minutes',
    },
  ]
  return (
    <>
      <Box>
        <Typography>Top Courses in Video & Film</Typography>
      </Box>
      <MultiCarousel
        ssr
        partialVisbile
        responsive={responsive}
        swipeable
        itemClass={classes.carouselItem}
      >
        {items.map((item, i) => {
          return (
            <Paper key={i} sx={{ padding: 2.5 }}>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <p>{item.time}</p>

              <Box>
                <Button color="primary" fullWidth variant="contained">
                  See details
                </Button>
              </Box>
            </Paper>
          )
        })}
      </MultiCarousel>
    </>
  )
}
