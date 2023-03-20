import React, {useState,useEffect} from 'react'
import { Grid, Button, Container, Box} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
  page: {
    padding: `0 ${theme.spacing(3)}px`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch',
    height: '100%',
    textAlign: 'center',
    
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
  fullBtn: {
    flex: 1,
  },
  fullBtnSelect: {
    flex: 1,
    background: '#555555',
  },
  btnBox: {
    gap: 8,
  },
  btnNavWrap: {
    marginTop: 'auto',
  },
}))

export function WindowView(props) {
  const classes = useStyles()
  return (
    <Container className={classes.page} maxWidth="md">
      <Grid
        container
        direction="column"
        alignItems="center"
        item
        sm={4}
      >
        <Grid className={classes.imageWrap} >
          <Box as="div" className={classes.imageCover}/>
          <img src={props.image}/>
        </Grid>
        <Grid>
          <p>{props.text}</p>
        </Grid>
      </Grid>
    </Container>
  )
}


export function InputSelectView(props) {
  const classes = useStyles()
  const { t } = useTranslation()
  const { setActive,setCurLength } = props.state

  const [ data, setData] = useState(props.multi ? [] : "");
  function onChangeValue(e) {
    props.multi ? 
      !data.includes(e.target.value) 
      ?  setData([...data,e.target.value])
      : setData(data.filter(x => x !== e.target.value))
    : setData(e.target.value)
  }
  useEffect(() => (
    console.log(data)
  ),[data])

  function handleNext(){
    setCurLength((length) => length + 1);
    setActive((active) => active + 1);
  };
  function handleSkip(){
    setData(props.multi ? [] : "");
    handleNext()
  }

  return (
    <Container className={classes.page} maxWidth="md" px={1}>
      <Grid
        container
        direction="column"
        alignItems="flex-start"
        sm={4}
        item
      >
        <Grid item>
          <p>{props.subheader}</p>
        </Grid>
        <Grid item>
          <h3>{props.header}</h3>
        </Grid>
        <Grid
          container 
          item 
          direction='column'
          alignItems='stretch'
          alignContent='stretch'
        >

          {props.multi ?
            (
              <Grid onChange={onChangeValue} direction='column' container className={classes.btnBox}>
                {props.options?.map((val,i) => (
                  <Button 
                   variant='outlined' component="label" key={i}
                   className={data.includes(val) ? classes.fullBtnSelect : classes.fullBtn}
                  >
                    <input type="checkbox" value={val} name={props.value} hidden/>
                    {val}
                  </Button>
                ))} 
              </Grid>
              
            ) : (
              <Grid onChange={onChangeValue} direction='column' container className={classes.btnBox}>
                {props.options?.map((val,i) => (
                  <Button 
                    variant='outlined' component="label" key={i}
                    className={data.includes(val) ? classes.fullBtnSelect : classes.fullBtn}  
                  >
                    <input type="radio" value={val} name={props.value} hidden/>
                    {val}
                  </Button>
                ))} 
              </Grid>
            )}  
        </Grid>
        <Grid 
          container 
          item 
          direction='column'
          alignItems='stretch'
          className={classes.btnNavWrap}
        >
          <Button variant="contained" onClick={handleNext} disabled={!data.length > 0}>
            {t("btn.continue")}
          </Button>
          <Button variant="text" onClick={handleSkip}>
            {props.skipLabel}
          </Button>
        </Grid>
      </Grid>
      
    </Container>
  )
}