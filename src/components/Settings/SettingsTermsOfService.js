import React from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import Slide from '@mui/material/Slide'

function TermsOfService({ setShowComponent }) {
  return (
    <Slide
    direction="left"
    in={setShowComponent}
    timeout={600}
    mountOnEnter
    unmountOnExit
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ padding: '.5rem 0' }}>
          <Typography variant="h6">Terms of Service</Typography>
        </Box>
        <List disablePadding>
          <ListItem flexDirection="column">
            <ListItemText>
              <Typography>
                <b>1. Acceptance of Terms</b>
              </Typography>
              <Typography>
                Welcome to TakingITGlobal! TakingITGlobal provides its service to
                you, subject to the following Terms of Service ("TOS"), which may
                be updated by us from time to time without notice to you. You can
                review the most current version of the TOS at any time at:
                https://www.tigweb.org/static/disclaimer.html. In addition, when
                using particular TakingITGlobal services, you and TakingITGlobal
                shall be subject to any posted guidelines or rules applicable to
                such services which may be posted from time to time. All such
                guidelines or rules are hereby incorporated by reference into the
                TOS.
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <Typography>
                <b>2. Description of Service</b>
              </Typography>
              <Typography>
                TakingITGlobal currently provides users with access to a rich
                collection of resources, including various communications tools,
                databases of information, collections of expressions, forums, and
                content through its web site(s) (the "Service"). Unless explicitly
                stated otherwise, any new features that augment or enhance the
                current Service, including the release of new TakingITGlobal sites
                and features, shall be subject to the TOS.
              </Typography>
            </ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText>
              <Typography>
                <b>3. Your obligations as a member</b>
              </Typography>
              <Typography>
                In consideration of your use of the Service, you agree to: (a)
                provide true, accurate, current and complete information about
                yourself as prompted by the Service's registration form (such
                information being the "Registration Data") and (b) maintain and
                promptly update the Registration Data to keep it true, accurate,
                current and complete. If you provide any information that is
                untrue, inaccurate, not current or incomplete, or TakingITGlobal
                has reasonable grounds to suspect that such information is untrue,
                inaccurate, not current or incomplete, TakingITGlobal has the
                right to suspend or terminate your account and refuse any and all
                current or future use of the Service (or any portion thereof).
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <Typography>
                <b>4. Member account, password, and security</b>
              </Typography>
              <Typography>
                You select a username and password upon completing the Service's
                registration process. You are responsible for maintaining the
                confidentiality of your password, and are fully responsible for
                all activities that occur under your password. You agree to (a)
                immediately notify TakingITGlobal of any unauthorized use of your
                password or account or any other breach of security, and (b)
                ensure that you exit from your account at the end of each session.
                TakingITGlobal cannot and will not be liable for any loss or
                damage arising from your failure to comply with this Section.
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <Typography>
                <b>5. Member Conduct</b>
              </Typography>
              <Typography>
                You understand that all information, data, text, software, music,
                sound, photographs, graphics, video, messages or other materials
                ("Content"), whether publicly posted or privately transmitted, are
                the sole responsibility of the person from which such Content
                originated. This means that you, and not TakingITGlobal, are
                entirely responsible for all Content that you upload, post, email,
                transmit or otherwise make available via the Service.
                TakingITGlobal has limited control of the Content posted via the
                Service and, as such, does not guarantee the accuracy, integrity
                or quality of such Content. You understand that by using the
                Service, you may be exposed to Content that is offensive, indecent
                or objectionable. Under no circumstances will TakingITGlobal be
                liable in any way for any Content, including, but not limited to,
                for any errors or omissions in any Content, or for any loss or
                damage of any kind incurred as a result of the use of any Content
                posted, emailed, transmitted or otherwise made available via the
                Service.
              </Typography>
            </ListItemText>
          </ListItem>
        </List>
      </Box>
    </Slide>
  )
}

export default TermsOfService
