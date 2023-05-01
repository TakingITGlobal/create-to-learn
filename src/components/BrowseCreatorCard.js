import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import ButtonBase from '@mui/material/ButtonBase'

import { useTranslation } from 'react-i18next'

const BrowseCreatorCard = ({ creator }) => {
  const { t } = useTranslation()

  return (
    <ButtonBase href={'/creator/' + creator.uid}>
      <Stack direction="column" spacing={1}>
        <Box
          component="img"
          src={creator.image && creator.image[0]?.downloadURL}
          width="100px"
        />
        <Box>
          <Typography variant="body2">{creator.name} </Typography>
          <Typography variant="body2">{creator.fnmi} </Typography>
        </Box>
      </Stack>
    </ButtonBase>
  )
}

export default BrowseCreatorCard
