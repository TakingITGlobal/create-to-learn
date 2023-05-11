import React, { useState, useContext } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import DownloadIcon from '@mui/icons-material/Download'
import InfoIcon from '@mui/icons-material/Info'
import DeleteIcon from '@mui/icons-material/Delete'
import CloseIcon from '@mui/icons-material/Close'

import Section from './Section'
import BrowseCourseCard from './BrowseCourseCard'
import BrowseFilterEmptyState from './BrowseFilterEmptyState'
import MyCoursesProgressContent from './MyCoursesProgressContent'
import { useTranslation } from 'react-i18next'
import { dataContext } from '../util/dataProvider'
import { useAuth } from './../util/auth'
import { updateUser } from '../util/db'

function MyCoursesSection(props) {
  const { t } = useTranslation()
  const auth = useAuth()

  const [tabIndex, setTabIndex] = useState(0)
  const [openDrawer, setOpenDrawer] = useState(false)
  const [courseChosen, setCourseChosen] = useState(null)

  const handleChangeTab = (event, newTab) => {
    setTabIndex(newTab)
  }

  const { allCourses, loadingCourses } = useContext(dataContext)

  const watchlist = allCourses.filter(
    ({ uid }) => auth.user?.watchlist && auth.user.watchlist.includes(uid),
  )
  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Box mt={2}>
        <Container>
          <Box sx={{ paddingBottom: '7px' }}>
            <Typography variant="h4">{t('my-courses.my-courses')}</Typography>
          </Box>
          <Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={tabIndex}
                textColor="secondary"
                indicatorColor="secondary"
                onChange={handleChangeTab}
                aria-label="my courses tabs"
                variant="fullWidth"
              >
                <Tab
                  label={t('my-courses.my-progress')}
                  {...a11yProps(0)}
                  sx={{ color: 'white' }}
                />
                <Tab
                  label={t('my-courses.downloads')}
                  {...a11yProps(1)}
                  sx={{ color: 'white' }}
                />

                <Tab
                  label={t('my-courses.watchlist')}
                  {...a11yProps(2)}
                  sx={{ color: 'white' }}
                />
              </Tabs>
            </Box>
            <TabPanel tabIndex={tabIndex} index={0}>
              <MyCoursesProgressContent />
            </TabPanel>
            <TabPanel tabIndex={tabIndex} index={1}>
              'hahhh'
            </TabPanel>
            <TabPanel tabIndex={tabIndex} index={2}>
              {loadingCourses ? (
                <CircularProgress color="primary" />
              ) : watchlist.length ? (
                <Box>
                  {watchlist.map((course, index) => (
                    <Stack direction="row" spacing={1}>
                      <BrowseCourseCard key={index} course={course} />
                      <IconButton
                        sx={{ color: 'white' }}
                        onClick={() => {
                          setOpenDrawer(true)
                          setCourseChosen(course.uid)
                        }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Stack>
                  ))}
                  <Drawer
                    anchor={'bottom'}
                    open={openDrawer}
                    onClose={() => setOpenDrawer(false)}
                  >
                    <Box>
                      <Box
                        sx={{
                          display: 'flex',
                          padding: '10px',
                          justifyContent: 'flex-end',
                        }}
                      >
                        <IconButton
                          aria-label="close-icon"
                          onClick={() => setOpenDrawer(false)}
                        >
                          <CloseIcon sx={{ color: 'white' }} />
                        </IconButton>
                      </Box>
                      <List>
                        <ListItem disablePadding>
                          <ListItemButton>
                            <ListItemIcon aria-label="download-icon">
                              <DownloadIcon sx={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="Download..." />
                          </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemButton href={'/course/' + courseChosen}>
                            <ListItemIcon aria-label="info-icon">
                              <InfoIcon sx={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="See Details" />
                          </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemButton
                            onClick={() => {
                              updateUser(auth?.user?.uid, {
                                watchlist: auth?.user?.watchlist.filter(
                                  (courseUid) => courseUid !== courseChosen,
                                ),
                              })
                              setOpenDrawer(false)
                            }}
                          >
                            <ListItemIcon aria-label="delete-icon">
                              <DeleteIcon sx={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="Remove from list" />
                          </ListItemButton>
                        </ListItem>
                      </List>
                    </Box>
                  </Drawer>
                </Box>
              ) : (
                <BrowseFilterEmptyState />
              )}
            </TabPanel>
          </Box>
        </Container>
      </Box>
    </Section>
  )
}

export default MyCoursesSection

const TabPanel = (props) => {
  const { children, tabIndex, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={tabIndex !== index}
      id={`myCourses-tabpanel-${index}`}
      aria-labelledby={`myCourses-tab-${index}`}
      {...other}
    >
      {tabIndex === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

const a11yProps = (index) => {
  return {
    id: `myCourses-tab-${index}`,
    'aria-controls': `myCourses-tabpanel-${index}`,
  }
}
