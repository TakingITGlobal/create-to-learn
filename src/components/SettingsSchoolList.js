import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import IconButton from '@mui/material/IconButton'

function SettingsSchoolList({ schoolData, setSchool, school }) {
  return (
    <List
      sx={{ width: '100%', maxWidth: 360 }}
      aria-labelledby="settings-profile"
      width="100%"
      itemSize={30.5}
    >
      {schoolData.map((data, index) => (
        <ListItem
          key={index}
          sx={{
            backgroundColor: school === data ? '#6956F1' : '#211E34',
            marginBottom: '15px',
            borderRadius: '5px',
          }}
          secondaryAction={
            school === data && (
              <IconButton size="large">
                <CheckCircleIcon sx={{ color: 'white' }} />
              </IconButton>
            )
          }
        >
          <ListItemButton onClick={() => setSchool(data)}>
            <ListItemText sx={{ color: 'white' }}>{data}</ListItemText>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}

export default SettingsSchoolList
