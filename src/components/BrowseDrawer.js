import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Stack from '@mui/material/Stack'

import { useTranslation } from 'react-i18next'
import useClasses from '../hooks/useClasses'

const styles = (theme) => ({
  drawer: {
    // backgroundColor: 'black !important',
  },
  filterButton: {
    backgroundColor: 'white',
    borderRadius: '48px !important',
    textTransform: 'capitalize !important',
    color: 'black',
    border: 'white',
    padding: '10px',
  },
  clearButton: {
    backgroundColor: '#0B0919',
    borderRadius: '48px !important',
    textTransform: 'capitalize !important',
    color: 'white',
    border: '#0B0919',
    padding: '10px',
  },
})

const BrowseDrawer = ({
  children,
  setOpenDrawer,
  handleClearFilter,
  openDrawer,
  numberOfFilters,
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
        <Stack direction="column" spacing={2} sx={{ paddingTop: '60px' }}>
          <Button
            variant="outlined"
            onClick={() => setOpenDrawer(false)}
            className={classes.filterButton}
          >
            {t('browse.apply-filters')}{' '}
            {numberOfFilters ? `(${numberOfFilters})` : ''}
          </Button>
          <Button
            variant="outlined"
            className={classes.clearButton}
            onClick={() => handleClearFilter()}
          >
            {t('cancel')}
          </Button>
        </Stack>
      </Box>
    </SwipeableDrawer>
  )
}

export default BrowseDrawer
