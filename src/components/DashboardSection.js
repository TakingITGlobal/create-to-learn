import React, { useState } from 'react'
import Container from '@mui/material/Container'
import 'react-multi-carousel/lib/styles.css'

import { Button, Paper } from '@mui/material'
import Section from './Section'
import SectionHeader from './SectionHeader'
import SignUp from './SignUp'
import DashboardTopCourses from './DashboardTopCourses'
import DashboardLearningPaths from './DashboardLearningPaths'
import DashboardCreatorSpotlight from './DashboardCreatorSpotlight'
import { useAuth } from './../util/auth'

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const styles = (theme) => ({
  cardContent: {
    padding: theme.spacing(3),
  },

  carouselItem: {
    paddingRight: '20px',
    paddingBottom: '20px',
  },
})

function DashboardSection(props) {
  //This should be in local storage
  const [dismissSignUp, setDismissSignUp] = useState(false)

  const auth = useAuth()

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
        <DashboardCreatorSpotlight />
        <DashboardLearningPaths />
        {categoryInterests.map((interest, index) => (
          <DashboardTopCourses
            key={index}
            category={interest}
            title={`Top Courses in ${interest}`}
          />
        ))}
      </Container>
    </Section>
  )
}

export default DashboardSection
