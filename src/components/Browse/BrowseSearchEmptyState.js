import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import emptyStateImage from '../../assets/images/empty-state.png'

const BrowseSearchEmptyState = (search) => {
  const { t } = useTranslation()

  return (
    <Box mb={5}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          component="img"
          src={emptyStateImage}
          sx={{
            height: '225px',
            maxHeight: { xs: 300, lg: 500 },
            padding: '10px 0',
          }}
        />
        <Typography sx={{ fontSize: 18 }}>{t('browse.no-matches')} </Typography>
        <Typography
          variant="h6"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignText: 'center',
          }}
        >
          <b> {search !== '' ? `${search.search}` : ''} </b>
        </Typography>
      </Box>
      <Box
        mt={3}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="body2">
          {t('browse.search-another-term')}
        </Typography>
      </Box>
    </Box>
  )
}

export default BrowseSearchEmptyState
