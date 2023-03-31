import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Stack from '@mui/material/Stack'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

import { useTranslation } from 'react-i18next'

const BrowseDrawer = ({
  children,
  setOpenDrawer,
  handleClearFilter,
  openDrawer,
}) => {
  const { t } = useTranslation()

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
