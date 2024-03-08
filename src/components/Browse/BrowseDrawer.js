import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

import { useTranslation } from 'react-i18next'

const BrowseDrawer = ({
  children,
  setOpenDrawer,
  handleClearFilter,
  openDrawer,
  numberOfFilters,
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
      elevation={0}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '300px',
          padding: '0px 10px 10px',
        }}
      >
        <Box
          mt={2}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h2" sx={{fontSize: '1.75em', fontWeight: '600'}} mt="0">Filters</Typography>
          <IconButton aria-label="close" onClick={() => setOpenDrawer(false)}>
            <CloseIcon sx={{ color: 'white' }} />
          </IconButton>
        </Box>
        {children}
        <Stack direction="column" spacing={1} sx={{ paddingTop: '20px' }}>
          <Button
            variant="secondary"
            color="info"
            onClick={() => setOpenDrawer(false)}
          >
            {t('browse.apply-filters')}{' '}
            {numberOfFilters ? `(${numberOfFilters})` : ''}
          </Button>
          <Button
            variant="text"
            onClick={() => {
              handleClearFilter()
              setOpenDrawer(false)
            }}
          >
            {t('cancel')}
          </Button>
        </Stack>
      </Box>
    </SwipeableDrawer>
  )
}

export default BrowseDrawer
