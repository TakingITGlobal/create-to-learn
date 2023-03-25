import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Section from './Section'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'

import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputAdornment from '@material-ui/core/InputAdornment'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Paper from '@mui/material/Paper'
import { useTranslation } from 'react-i18next'

function BrowseSection(props) {
  const [showSearchBar, setShowSearchBar] = useState(false)

  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Box mt={2}>
        <Container>
          <Box sx={{ paddingBottom: 7 }}>
            <Typography variant="h4">Browse</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                display: 'inline-block',
                visibility: showSearchBar ? 'visible' : 'hidden',
                width: '100%',
              }}
            >
              <SearchBar />
            </Box>
            <Box
              sx={{
                display: 'inline-block',
                justifyContent: 'flex-end',
              }}
            >
              <IconButton onClick={() => setShowSearchBar(!showSearchBar)}>
                {showSearchBar ? (
                  <CloseIcon fontSize="large" />
                ) : (
                  <SearchIcon fontSize="large" />
                )}
              </IconButton>
            </Box>
          </Box>

          <BasicTabs />
        </Container>
      </Box>
    </Section>
  )
}

export default BrowseSection

function SearchBar({ setSearchQuery }) {
  const { t } = useTranslation()

  return (
    <OutlinedInput
      id="search-bar"
      onInput={(e) => {
        setSearchQuery(e.target.value)
      }}
      variant="outlined"
      placeholder={t('browse.search-by')}
      size="small"
      fullWidth
      endAdornment={
        <InputAdornment>
          <SearchIcon color="primary" fontSize="medium" />
        </InputAdornment>
      }
      inputProps={{
        style: { color: 'white' },
      }}
    />
  )
}

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

function BasicTabs() {
  const [value, setValue] = React.useState(0)
  const { t } = useTranslation()

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label={t('courses')} {...a11yProps(0)} sx={{ color: 'white' }} />
          <Tab
            label={t('creators')}
            {...a11yProps(1)}
            sx={{ color: 'white' }}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {t('courses')}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {t('creators')}
      </TabPanel>
    </Box>
  )
}
