import React, { useEffect, useState } from 'react'
import { styles } from './Styles'
import useClasses from 'hooks/useClasses'
import TitleSection from './TitleSection'
import { Box, Button, Grid } from '@mui/material'
import { Check } from '@mui/icons-material'
import classNames from 'classnames'
import { useData } from 'util/signupProvider'

export default function InputSelectView(props) {
  const { updateData} = useData();
  const { value, options } = props;

  const classes = useClasses(styles)
  const [ checkedItems, setCheckedItems] = useState([])
  

  const cols = props.cols ? props.cols : 1

  useEffect(() => {
    updateData(value, checkedItems);
  }, [checkedItems, value, updateData]);


  const handleCheckboxChange = (id) => {
    const isSelected = checkedItems.includes(id);
    if (isSelected) {
      setCheckedItems(currentItems => currentItems.filter(item => item !== id));  
    } else {
      setCheckedItems(currentItems => [...currentItems, id]);
    }
  }
  

  return (
    <Box>
      <TitleSection value={value} />
      <Grid
        container
        sx={{
          gap: '10px',
          padding: '1em',
        }}
      >
        {options?.map((option, i) => {
          const active = checkedItems.includes(option)
          return (
            <Box
              as="div"
              key={option}
              className={classes.btnInput}
              sx={{
                flex: `0 1 calc(calc(100% / ${cols}) - (10px * ${cols - 1}))`,
              }}
            >
              <Button
                onClick={() => handleCheckboxChange(option)}
                variant="multi-selection"
                id={option}
                fullWidth
                className={classNames({ 'active': active})}
              >
                {option}
                {active ? <Check /> : null}
              </Button>
            </Box>
          )})}
      </Grid>
    </Box>
  )
}
