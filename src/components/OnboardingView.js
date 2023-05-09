import React, {useState,useEffect} from 'react'
import useClasses from '../hooks/useClasses'
import { Grid, Button, Box, TextField, Container, Alert} from '@mui/material'
import { useTranslation } from 'react-i18next'
import {useSwiper,useSwiperSlide} from 'swiper/react'
import { FixedSizeList as List } from 'react-window'
import { updateUser } from '../util/db'
import AuthFormPasswordless from './AuthFormPasswordless'
import AuthSocial from './AuthSocial'
import { useRouter } from '../util/router'
import { useAuth } from '../util/auth'
import AuthForm from './AuthForm'

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
  const swiper = useSwiper()
  const [cur,setCur] = useState(0)

  const { data, value, formProgress, setFormProgress } = props
  const required = props.required ? props.required : false

  useEffect(() => {
    swiper.on("slideChange", (swipe) => {
      setCur(swipe.activeIndex)
    })
  }, [swiper])
  // useEffect(() => {
  //   console.log("After Form "+ formProgress)
  //   console.log("After Cur " + cur)
  //   if(formProgress < cur){
  //     console.log("Gets here wrongly")
  //     swiper.allowSlideNext = false
  //   } else if(swiper.allowSlideNext ){
  //     console.log("gets here")
  //     handleAllowNext(swiper.slideNext())
  //   }
  // },[cur, formProgress])

  

  function handleFormProgress(){
    if(formProgress <= cur)setFormProgress((formProgress) => formProgress + 1)
    
  }
  const setLocal = (id,val) => {
    localStorage.setItem(id,val)
    handleFormProgress()
    swiper.slideNext()
  }

  return (
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
  )
}

export function WindowView(props) {
  const classes = useClasses(styles)
  
  return (
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
  )
}

export function InputSelectView(props) {
  const { 
    multi,
    value,
    options,
    formProgress,
    setFormProgress,
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
    <InputView data={data} {...props}>
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
    formProgress,
    setFormProgress
  } = props

  const classes = useClasses(styles)
  const [ data, setData] = useState("")
  function onChange(e) {setData(e.target.value) }
  
  return (
    <InputView data={data} {...props}>
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
    formProgress,
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
    <InputView data={data} {...props}>

      <Grid>
      {data.length > 0 && (
        <Button 
          variant='contained' 
        
          size="small"
        >
          {data}
        </Button>   
      )}
      </Grid>
    
      <TextField variant="outlined" onChange={onInputChange} fullWidth/>
      
      <Grid container item className={classes.gridColumn} >
        <Grid className={classes.scrollBox}>
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

export function EmailView(){
  const classes = useClasses(styles)
  const [formAlert, setFormAlert] = useState(null)
  const swiper = useSwiper()

  const handleFormAlert = (data) => {
    setFormAlert(data)
  }
  const handleAuth = (email) => {
    localStorage.setItem('email', email)
    swiper.slideNext()
    
  }
  return (
    <Grid className={classes.page}>
      <Grid 
        container 
        item 
        className={classes.gridColumn}
        md={6}
      >
       {formAlert && (
        <Box mb={3}>
          <Alert severity={formAlert.type}>{formAlert.message}</Alert>
        </Box>
      )}

      <AuthForm
        type='signup'
        buttonAction='Sign Up'
        onAuth={handleAuth}
        onFormAlert={handleFormAlert}
      />
          <>
            <Box textAlign="center" fontSize={12} my={2}>
              OR
            </Box>
            <AuthSocial
              buttonAction={'Sign Up'}
              providers={['google', 'facebook']}
              showLastUsed={true}
              onAuth={handleAuth}
              onError={(message) => {
                handleFormAlert({
                  type: 'error',
                  message: message,
                })
              }}
            />
          </>
      </Grid>
    </Grid>
  )
}
export function FinishView(props){
  const classes = useClasses(styles)
  const router = useRouter()
  const auth = useAuth()
  const email = localStorage.getItem('email')
  const { values } = props
  const multi = [
    "fnmi",
    "language",
    "interests"
  ]
  
  function handleExit(){
    router.push('/dashboard')
  }
  function handleClick(){
    const data = {}
    values.map((val,i) => {
      data[val] = localStorage.getItem(val)
      if(multi.includes(val)) data[val] = data[val].split(",")
    })

    updateUser(auth.user.sub, data)
    handleExit()
  }
 
  return (
    <Grid className={classes.page}>
      <Grid 
        container 
        item 
        className={classes.gridColumn}
        md={6}
      >
        {!auth.user ?
          <>
            <p>We’ve sent a confirmation email to {email}. Please check your email to complete account registration</p>
        
          </> :
          <>
            <Button 
              variant='contained' 
              component="button" 
              size="lg"
              fullWidth
              onClick={handleClick}
            >
              Finish Setup
            </Button> 
          </>
        }
        
        
      </Grid>
    </Grid>
  )
}