import React, {useState} from 'react'
import useClasses from '../hooks/useClasses'
import { Grid, Button, Box, TextField, Container} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { FixedSizeList as List } from 'react-window'

const styles = theme => ({
  container: {
    margin: '0 auto', 
    height: '100%',
  },

  page: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    height: '100%',
    margin: '0 auto',
  },

  imageWrap: {
    margin: 'auto 0',
    maxWidth: '100%',
    maxHeight: '50%',
    position: 'relative',
    '& img': {
      width: '100%',
      maxHeight:'100%',
      objectFit: 'contain',
      userSelect: 'none',
      userDrag: 'none',
    },
  },

  imageCover: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0, left:0,right:0,bottom:0,
    zIndex: 2,
  },

  gridColumn: {
    flexDirection: 'column',
    alignItems: 'stretch',
    alignContent: 'stretch',
    gap: 8,
  },

  btnInput: {
    display: 'flex',
    '& > label': {
      flex: '1',
      textAlign: 'left',
      justifyContent: 'flex-start',
    },
    '& > input:checked + label': {
      background: '#555555',
    },
  },

  btnNavWrap: {
    marginTop: 'auto',
    alignItems: 'stretch',
    flexDirection: 'column',
  },

  scrollBox: {
    overflowY: 'scroll', 
    height: '40vh', 
    textAlign: 'left', 
    gap: 8
  }
});

function InputView(props){
  const { t } = useTranslation()
  const classes = useClasses(styles)
  const { data, value, state } = props
  const required = props.required ? props.required : false
  const { setCurLength, setActive} = state
  const setLocal = (id,val) => {
    localStorage.setItem(id,val)
    setCurLength((length) => length + 1)
    setActive((active) => active + 1)
  }

  return (
    <Container maxWidth="md" className={classes.container}>
      <Grid className={classes.page}>
        <Grid 
          container 
          item 
          className={classes.gridColumn}
          md={6}
        >
          <Grid item>
            <p>{t(`onboarding.${props.value}.subheader`)}</p>
          </Grid>
          <Grid item>
            <h3>{t(`onboarding.${props.value}.header`)}</h3>
          </Grid>
        </Grid>
        <Grid container>
          {props.children}
        </Grid>
        <Grid 
          container item 
          className={classes.btnNavWrap}
        >
          <Button variant="contained" onClick={() => setLocal(value,data)} disabled={!data.length > 0}>
            {t("btn.continue")}
          </Button>
          {!required ? (
            <Button variant="text" onClick={() => setLocal(value,"")}>
              {t(`onboarding.${value}.skip-btn`)}
            </Button>
          ) : (
            <Box style={{height: 36.5}}/>
          )
        }
        </Grid>
      </Grid>
    </Container>
  )
}

export function WindowView(props) {
  const classes = useClasses(styles)
  
  return (
    <Container maxWidth="md" className={classes.container}>
      <Grid
        container
        className={classes.page}
        style={{textAlign: 'center', padding: '0 20px', justifyContent: 'flex-end'}}
        item
        sm={4}
      >
        <Grid item className={classes.imageWrap} >
          <Box className={classes.imageCover}/>
          <img src={props.image} alt=""/>
        </Grid>
        <Grid item >
          <p>{props.text}</p>
        </Grid>
      </Grid>
    </Container>
  )
}

export function InputSelectView(props) {
  const { 
    multi,
    value,
    options,
    state,
    required,
  } = props
  const classes = useClasses(styles)
  const cols = props.cols ? props.cols : 1
  const gap = 10


  const [ data, setData] = useState(multi ? [] : "");
  function onChange(e) {
    multi ? 
      !data.includes(e.target.value) 
      ?  setData([...data,e.target.value])
      : setData(data.filter(x => x !== e.target.value))
    : setData(e.target.value)
  }

  return (
    <InputView value={value} data={data} state={state} required={required}>
      {multi ? (
          <Grid container style={{gap: `${gap}`, justifyContent: 'space-between'}}>
            {options?.map((val,i) => (
              <Box as="div" key={i} className={classes.btnInput} sx={{flex: `0 1 calc(calc(100% / ${cols}) - (${gap}px * ${cols - 1}))`}}>
                <input
                  onChange={onChange} 
                  type="checkbox" 
                  value={val} 
                  name={value} 
                  id={val} hidden  
                />
                <Button
                  variant='outlined' 
                  component="label" 
                  fullWidth
                  htmlFor={val}
                  size="small"
                >
                  {val}
                </Button>  
              </Box>
            ))} 
          </Grid>
        ) : (
          <Grid container style={{gap: `${gap}`, justifyContent: 'space-between'}}>
            {options?.map((val,i) => (
              <Box as="div" key={i} className={classes.btnInput} sx={{flex: `0 1 calc(calc(100% / ${cols}) - (${gap}px * ${cols - 1}))`}}>
                <input
                  onChange={onChange} 
                  type="radio" 
                  value={val} 
                  name={value} 
                  id={val} hidden  
                />
                <Button
                  variant='outlined' 
                  component="label" 
                  fullWidth
                  htmlFor={val}
                  size="small"
                >
                  {val}
                </Button>  
              </Box>
            ))} 
          </Grid>
        )}  
    </InputView>
  );
}

export function InputTextView(props) {
  const { 
    value,
    state
  } = props

  const classes = useClasses(styles)
  const [ data, setData] = useState("")
  function onChange(e) {setData(e.target.value) }
  
  return (
    <InputView value={value} data={data} state={state}>
      <Grid
        container item 
        className={classes.gridColumn}
        onChange={onChange}
      >
        <TextField variant="outlined" fullWidth/>
      </Grid>
    </InputView>
  )
}

export function InputSearchView(props) {
  const { 
    value,
    state,
    options
  } = props

  const classes = useClasses(styles)
  const { t } = useTranslation()
  const [inputValue, setInputValue] = useState("")
  const filtered = options.filter(x => x.toLowerCase().includes(inputValue.toLowerCase()))

  const [ data, setData] = useState("")
  function onInputChange(e) {setInputValue(e.target.value)}
  function onChange(e) {setData(e.target.value)}
  const Row = ({ data, index, style }) => (
    <span className={classes.btnInput} style={style}>
      <input 
        onChange={onChange}
        type="radio" 
        value={data[index]} 
        name={value} 
        id={data[index]}
        hidden
      />
      <Button 
        variant='outlined' 
        component="label" 
        htmlFor={data[index]}
        size="small"
        fullWidth
      >
        {data[index]}
      </Button>   
    </span>  
  )
  return (
    <InputView value={value} data={data} state={state}>

      {data.length > 0 && (
        <Button 
          variant='contained' 
          fullWidth
          size="small"
        >
          {data}
        </Button>   
      )}
      
    
      <TextField variant="outlined" onChange={onInputChange} fullWidth/>
      
      <Grid container item className={classes.gridColumn} >
        <Grid >
          <span className={classes.btnInput}>
            <input type="radio" value="other" id="other" name={value} hidden onChange={onChange}/>
            <Button 
              variant='outlined' 
              component="label"
              htmlFor="other"
              size="small"
              fullWidth 
            >
              {t("btn.missing", {value: value})}
            </Button>
          </span>
          <List
            itemData={filtered}
            itemCount={filtered.length}
            height={400}
            itemSize={30.5}
            width='100%'
          >
            {Row}
          </List>
        </Grid>
      </Grid>
    </InputView>
  )
}