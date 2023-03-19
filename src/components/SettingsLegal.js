import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowBack from './ArrowBack'
import LinkComp from '@material-ui/core/Link'
import { Link } from './../util/router'
import { useAuth } from './../util/auth'

function SettingsLegal(props) {
  const auth = useAuth()
  const [showComponent, setShowComponent] = useState('nav')

  return (
    <>
      <ArrowBack
        showComponent={showComponent}
        setShowComponent={setShowComponent}
      />
      <Container>
        {showComponent === 'privacyPolicy' && (
          <PrivacyPolicy setShowComponent={setShowComponent} />
        )}

        {showComponent === 'termsOfService' && (
          <TermsOfService setShowComponent={setShowComponent} />
        )}

        {showComponent === 'aboutCreateToLearn' && (
          <AboutCreateToLearn setShowComponent={setShowComponent} />
        )}

        {showComponent === 'aboutOrganization' && (
          <AboutOrganization setShowComponent={setShowComponent} />
        )}

        {showComponent === 'nav' && (
          <LegalNav auth={auth} setShowComponent={setShowComponent} />
        )}
      </Container>
    </>
  )
}

export default SettingsLegal

function LegalNav({ setShowComponent }) {
  return (
    <>
      <List>
        <Typography variant="h6">Legal</Typography>
        <ListItem
          button
          onClick={() => {
            setShowComponent('privacyPolicy')
          }}
        >
          <ListItemText>Privacy Policy</ListItemText>
          <ListItemSecondaryAction>
            <IconButton>
              <ChevronRightIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem
          button
          onClick={() => {
            setShowComponent('termsOfService')
          }}
        >
          <ListItemText>Terms of Service</ListItemText>
          <ListItemSecondaryAction>
            <IconButton>
              <ChevronRightIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Typography variant="h6">About</Typography>
        <ListItem
          button
          onClick={() => {
            setShowComponent('aboutCreateToLearn')
          }}
        >
          <ListItemText>About Create to Learn</ListItemText>
          <ListItemSecondaryAction>
            <IconButton>
              <ChevronRightIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem
          button
          onClick={() => {
            setShowComponent('aboutOrganization')
          }}
        >
          <ListItemText>About the Organization</ListItemText>
          <ListItemSecondaryAction>
            <IconButton>
              <ChevronRightIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </>
  )
}

function AboutCreateToLearn({ setShowComponent }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ padding: '1.5rem 0' }}>
        <Typography variant="h6">Create to Learn</Typography>
      </Box>
      <Box sx={{ paddingBottom: '1rem' }}>
        <Typography>
          Create to Learn App Content: Fringilla urna porttitor rhoncus dolor
          purus non enim. Suscipit tellus mauris a diam maecenas sed enim ut.
          Diam sollicitudin tempor id eu. Nisi scelerisque eu ultrices vitae
          auctor. Diam phasellus vestibulum lorem sed risus ultricies tristique
          nulla. Orci phasellus egestas tellus rutrum. Volutpat sed cras ornare
          arcu dui vivamus arcu felis bibendum. Cras sed felis eget velit
          aliquet sagittis id consectetur purus.
        </Typography>
      </Box>

      <Typography>
        Magna fermentum iaculis eu non diam phasellus vestibulum lorem. Enim
        nunc faucibus a pellentesque sit amet porttitor eget dolor. Eget est
        lorem ipsum dolor sit. Fames ac turpis egestas integer eget aliquet nibh
        praesent. Velit aliquet sagittis id consectetur purus ut faucibus. Ipsum
        suspendisse ultrices gravida dictum fusce. Sit amet venenatis urna
        cursus eget nunc scelerisque viverra. Viverra nibh cras pulvinar mattis
        nunc sed blandit.
      </Typography>
    </Box>
  )
}

function PrivacyPolicy({ setShowComponent }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ padding: '1.5rem 0' }}>
        <Typography variant="h6">Privacy Policy</Typography>
      </Box>
      <Box sx={{ paddingBottom: '1rem' }}>
        <Typography>Effective: January 7th, 2021 </Typography>
      </Box>
      <Box sx={{ paddingBottom: '1rem' }}>
        <Typography>
          This privacy policy describes how TakingITGlobal ("we", "us" or "our")
          collects, uses and discloses personal information in the course of
          operating our organization, including in connection with administering
          programs and services and operating our websites at www.tigweb.org,
          www.tiged.org, www.risingyouth.ca, www.whose.land, www.codetolearn.ca,
          www.connectednorth.org, www.youthmovements.org,
          www.youthleadershipfund.org, and any other TakingITGlobal or partner
          web sites that link to this Privacy Policy. It also describes the
          choices available to you regarding our use of your personal
          information and how you can access and update this information.
        </Typography>
      </Box>

      <Typography>
        <b>1. Personal Information Collection and Use</b>
      </Typography>
      <Typography>
        This Privacy Policy covers TakingITGlobal's treatment of personally
        identifiable information that we collect when you are on the
        TakingITGlobal site or when you use TakingITGlobal's services online.
        Becoming a Member. TakingITGlobal collects personal information when you
        register as a TakingITGlobal member. The information we collect when you
        register includes your name, e- mail address, city, state/province, and
        country,
      </Typography>
    </Box>
  )
}

function TermsOfService({ setShowComponent }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ padding: '1.5rem 0' }}>
        <Typography variant="h6">Terms of Service</Typography>
      </Box>
      <Box sx={{ paddingBottom: '1rem' }}>
        <Typography>
          <b>1. Acceptance of Terms</b>
        </Typography>
        <Typography>
          Welcome to TakingITGlobal! TakingITGlobal provides its service to you,
          subject to the following Terms of Service ("TOS"), which may be
          updated by us from time to time without notice to you. You can review
          the most current version of the TOS at any time at: https://
          www.tigweb.org/static/disclaimer.html. In addition, when using
          particular TakingITGlobal services, you and TakingITGlobal shall be
          subject to any posted guidelines or rules applicable to such services
          which may be posted from time to time. All such guidelines or rules
          are hereby incorporated by reference into the TOS
        </Typography>
      </Box>

      <Box>
        <Typography>
          <b>2. Description of Service</b>
        </Typography>
        <Typography>
          TakingITGlobal currently provides users with access to a rich
          collection of resources, including various communications tools,
          databases of information, collections of expressions, forums, and
          content through its web site(s) (the "Service"). Unless explicitly
          stated otherwise, any new features that augment or enhance the current
          Service, including the release of new TakingITGlobal sites and
          features, shall be subject to the TOS.
        </Typography>
      </Box>
    </Box>
  )
}

function AboutOrganization({ setShowComponent }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ padding: '1.5rem 0' }}>
        <Typography variant="h6">About Taking It Global</Typography>
      </Box>
      <Box sx={{ paddingBottom: '1rem' }}>
        <Typography>
          TakingITGlobal empowers youth to understand and act on local and
          global challenges.
        </Typography>
      </Box>

      <Box>
        <LinkComp href="https://www.tigweb.org">
          Check more on tigweb.org
        </LinkComp>
      </Box>
    </Box>
  )
}
