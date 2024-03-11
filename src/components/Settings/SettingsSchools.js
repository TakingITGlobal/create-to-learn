import React, { useState, useMemo, useCallback } from 'react'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Slide from '@mui/material/Slide';

import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import ButtonBase from '@mui/material/ButtonBase'
import Paper from '@mui/material/Paper'
import { FixedSizeList } from 'react-window'

import schools from '../../assets/options/schools'

import { updateUser } from '../../util/db'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../util/auth'

function SettingsSchools({ showComponent, setShowComponent }) {
  const { t } = useTranslation()
  const auth = useAuth()

  const [school, setSchool] = useState(auth?.user?.school)
  const [search, setSearch] = useState('')
  const [filteredSchools, setFilteredSchools] = useState([])

  useMemo(() => {
    setFilteredSchools(
      schools
        .map((x) => x.School)
        .filter((sch) => {
          const schoolName = sch.toLowerCase()
          return schoolName.search(search.toLowerCase()) !== -1
        }),
    )
  }, [search])

  const onChange = useCallback((e) => setSearch(e.target.value), [])

  const Row = ({ data, index }) => (
    <ButtonBase
      onClick={() => setSchool(data[index])}
      sx={{ 
        width: '100%', 
        fontSize: 16,
        textAlign: 'left',
        margin: '5px 0',
        padding: '20px',
        width: '100%',
        justifyContent: 'flex-start',
        backgroundColor: school === data[index] ? '#6956F1' : '#211E34',
        borderRadius: '5px'
       }}
    >
      {data[index]}
    </ButtonBase>
  )

  return (
    showComponent === 'school' && (
      <Slide
      direction="left"
      in={showComponent}
      timeout={500}
      mountOnEnter
      unmountOnExit
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '700px',
        }}
      >
        <Box sx={{ padding: '1.5rem 0' }}>
          <h1 variant="h3" fontWeight={700} color={'lavender'} sx={{ padding: '10px 20px 0 0' }}>
            Change School
          </h1>
          <Typography>Scroll or search to find your school </Typography>
          <Box sx={{ paddingTop: '40px' }}>
          </Box>
          <TextField
            onInput={(e) => onChange(e)}
            id="filled-start-adornment"
            sx={{
              borderRadius: '8px',
              width: '100%',
            }}
            label="Search your school"
            value={search}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="primary" fontSize="medium" />
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />
        </Box>
        <FixedSizeList
          height={450}
          width="100%"
          itemSize={50}
          itemData={filteredSchools}
          itemCount={filteredSchools.length}
          overscanCount={50}
        >
          {Row}
        </FixedSizeList>
        <Box
          sx={{
            display: 'flex',
            padding: '1.5rem 0',
            flexGrow: 1,
            alignItems: 'flex-end',
          }}
        >
          <Button
            fullWidth
            color="primary"
            variant="contained"
            sx = {{
              padding: "16px 24px"
            }}
            onClick={() => {
              updateUser(auth.user.uid, { school: school })
              setShowComponent('nav')
            }}
          >
            {t('settings.update')}
          </Button>
        </Box>
      </Box>
    </Slide>
    )
  )
}

export default SettingsSchools
