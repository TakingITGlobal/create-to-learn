import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Stack from '@mui/material/Stack'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

import { useTranslation } from 'react-i18next'
import useClasses from '../hooks/useClasses'

const styles = (theme) => ({
  drawer: {
    // backgroundColor: 'black !important',
  },
})

const BrowseDrawer = ({
  children,
  setOpenDrawer,
  handleClearFilter,
  openDrawer,
}) => {
  const { t } = useTranslation()
  const classes = useClasses(styles)

  const toggleDrawer = (event, open) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setOpenDrawer(open)
  }
  return (
    <SwipeableDrawer
      anchor="right"
      open={openDrawer}
      onOpen={(event) => toggleDrawer(event, true)}
      onClose={(event) => toggleDrawer(event, false)}
      PaperProps={{ className: classes.drawer }}
    >
      <Box
        mt={2}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '300px',
          padding: '10px',
        }}
      >
        <Box mt={2}>
          <Typography variant="h5">Filters</Typography>
        </Box>
        {children}
        <Stack direction="row" spacing={1} sx={{ paddingTop: '60px' }}>
          <Button variant="outlined" onClick={() => handleClearFilter()}>
            {t('browse.clear-filters')}
          </Button>
          <Button
            variant="outlined"
            endIcon={<ChevronRightIcon />}
            onClick={() => setOpenDrawer(false)}
          >
            {t('close')}
          </Button>
        </Stack>
      </Box>
    </SwipeableDrawer>
  )
}

export default BrowseDrawer
