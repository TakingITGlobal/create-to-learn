import React, { useState, useMemo, useCallback } from 'react'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
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
      sx={{ width: '100%', fontSize: 16, textAlign: 'start' }}
    >
      <Paper
        sx={{
          margin: '5px 0',
          height: '70px',
          width: '100%',
          backgroundColor: school === data[index] ? '#6956F1' : '#211E34',
        }}
      >
        {data[index]}
      </Paper>
    </ButtonBase>
  )

  return (
    showComponent === 'school' && (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '700px',
        }}
      >
        <Box sx={{ padding: '1.5rem 0' }}>
          <Typography variant="h5" sx={{ paddingBottom: '10px' }}>
            I'm attending ...
          </Typography>
          <Typography>Scroll or search to find your school </Typography>
          <Box sx={{ paddingTop: '40px' }}>
            <Typography>Search your school</Typography>
          </Box>
          <TextField
            onInput={(e) => onChange(e)}
            id="filled-start-adornment"
            sx={{
              backgroundColor: '#2B2937',
              borderRadius: '8px',
              width: '100%',
            }}
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
          height={650}
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
            onClick={() => {
              updateUser(auth.user.uid, { school: school })
              setShowComponent('nav')
            }}
          >
            {t('settings.update')}
          </Button>
        </Box>
      </Box>
    )
  )
}

export default SettingsSchools
