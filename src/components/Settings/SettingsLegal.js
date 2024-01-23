import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ArrowBack from '../ArrowBack'
import LinkComp from '@mui/material/Link'
import { useAuth } from '../../util/auth'

import SettingsTermsOfService from './SettingsTermsOfService'

function SettingsLegal(props) {
  const auth = useAuth()
  const [showComponent, setShowComponent] = useState('nav')

  const myAccountLinks = [
    {
      id: 'privacyPolicy',
      title: 'Privacy Policy',
    },
    { 
      id: 'termsOfService', 
      title: 'Terms of Service' 
    },
    { 
      id: 'aboutCreateToLearn', 
    title: 'About Create to Learn'
    },
    {
      id: 'aboutOrganization',
      title: 'About the Organization',
    },
  ];

  return (
    <>
      <Container sx={{
        display: 'flex', 
        justifyContent:'space-between',
        alignItems: 'center',
        padding: '52px 0 34px 0'
        }}>
        <ArrowBack
          showComponent={showComponent}
          setShowComponent={setShowComponent}
        />

          <Typography fontWeight={700} variant="h7">{myAccountLinks.find(link => link.id === showComponent)?.title || "Legal and About"}</Typography>
        <div>
        </div>
      </Container>
      <Container>
        {showComponent === 'nav' && (
          <LegalNav auth={auth} setShowComponent={setShowComponent} />
        )}
        {showComponent === 'privacyPolicy' && (
          <PrivacyPolicy setShowComponent={setShowComponent} />
        )}

        {showComponent === 'termsOfService' && (
          <SettingsTermsOfService setShowComponent={setShowComponent} />
        )}

        {showComponent === 'aboutCreateToLearn' && (
          <AboutCreateToLearn setShowComponent={setShowComponent} />
        )}

        {showComponent === 'aboutOrganization' && (
          <AboutOrganization setShowComponent={setShowComponent} />
        )}

        <Box sx={{ fontWeight: 300, color: 'grey' }}>
          <Typography>Version 5.5.0</Typography>
        </Box>
      </Container>
    </>
  )
}

export default SettingsLegal

function LegalNav({ setShowComponent }) {
  return (
    <>
      <List>
        <Typography variant="h6" padding="12px">Legal</Typography>
        <ListItem
          button
          onClick={() => {
            setShowComponent('privacyPolicy')
          }}
          sx = {{
            borderBottom: '1px solid #333'
          }}
        >
          <ListItemText>Privacy Policy</ListItemText>
          <ListItemSecondaryAction>
            <IconButton size="large">
              <ChevronRightIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem
          button
          onClick={() => {
            setShowComponent('termsOfService')
          }}
          sx = {{
            borderBottom: '1px solid #333'
          }}
        >
          <ListItemText>Terms of Service</ListItemText>
          <ListItemSecondaryAction>
            <IconButton size="large">
              <ChevronRightIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Typography variant="h6" marginTop="32px" padding="12px">About</Typography>
        <ListItem
          button
          onClick={() => {
            setShowComponent('aboutCreateToLearn')
          }}
          sx = {{
            borderBottom: '1px solid #333'
          }}
        >
          <ListItemText>About Create to Learn</ListItemText>
          <ListItemSecondaryAction>
            <IconButton size="large">
              <ChevronRightIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem
          button
          onClick={() => {
            setShowComponent('aboutOrganization')
          }}
          sx = {{
            borderBottom: '1px solid #333'
          }}
        >
          <ListItemText>About the Organization</ListItemText>
          <ListItemSecondaryAction>
            <IconButton size="large">
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
