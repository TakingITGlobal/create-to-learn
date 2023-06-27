import React, { useState, useEffect } from 'react'
import useClasses from '../hooks/useClasses'
import {
  Grid,
  Button,
  Box,
  TextField,
  Alert,
  Stack,
  CardMedia,
  Typography,
  Chip,
} from '@mui/material'
import Check from '@mui/icons-material/Check'
import { useTranslation } from 'react-i18next'
import { useSwiper } from 'swiper/react'
import { FixedSizeList as List } from 'react-window'
import { updateUser } from '../util/db'
import AuthSocial from './auth/AuthSocial'
import { useRouter } from '../util/router'
import { useAuth } from '../util/auth'
import AuthForm from './auth/AuthForm'
import { Link } from 'react-router-dom'

const styles = (theme) => ({
  gridColumn: {
    flexDirection: 'column',
    alignItems: 'stretch',
    alignContent: 'stretch',
    gap: 8,
  },
  scrollBox: {
    overflowY: 'scroll',
    height: '40vh',
    textAlign: 'left',
    gap: 8,
  },
})

function InputView(props) {
  const { t } = useTranslation()
  const swiper = useSwiper()
  const [cur, setCur] = useState(0)

  const { data, value, formProgress, setFormProgress } = props
  const required = props.required ? props.required : false

  useEffect(() => {
    swiper.on('slideChange', (swipe) => {
      setCur(swipe.activeIndex)
    })
  }, [swiper])

  function handleFormProgress() {
    if (formProgress <= cur) setFormProgress((formProgress) => formProgress + 1)
  }
  const setLocal = (id, val) => {
    localStorage.setItem(id, val)
    handleFormProgress()
    swiper.slideNext()
  }

  return (
    <Box
      sx={{
        padding: '50px 1em 1em 1em',
        maxWidth: { md: '850px' },
        margin: { md: '0 auto' },
      }}
    >
      <Stack direction="column" sx={{ pb: '40px' }}>
        <Typography variant="decorative">
          {t(`onboarding.${props.value}.header`)}
        </Typography>
        <Typography variant="secondary" sx={{ color: '#D2CCFB' }}>
          {t(`onboarding.${props.value}.header2`)}
        </Typography>
        <Typography variant="secondary">
          {t(`onboarding.${props.value}.subheader`)}
        </Typography>
      </Stack>

      <Grid
        sx={{ maxHeight: '350px', overflow: 'scroll', padding: '20px 0' }}
        container
      >
        {props.children}
      </Grid>
      <Stack
        spacing={2}
        sx={{ flexDirection: { xs: 'column', md: 'row' }, padding: '20px 0' }}
      >
        <Button
          color="info"
          sx={{
            backgroundColor: 'white !important',
            color: 'black !important',
          }}
          onClick={() => setLocal(value, data)}
          disabled={!data.length > 0}
        >
          {t('btn.continue')}
        </Button>
        {!required ? (
          <Button variant="text" onClick={() => setLocal(value, '')}>
            {t(`onboarding.${value}.skip-btn`)}
          </Button>
        ) : (
          <Box style={{ height: 36.5 }} />
        )}
      </Stack>
    </Box>
  )
}

export function WelcomeView(props) {
  const swiper = useSwiper()
  const { t } = useTranslation()

  const { setFormProgress, formProgress } = props

  const setLocal = () => {
    setFormProgress(formProgress + 1)
    swiper.slideNext()
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '75vh',
      }}
    >
      <CardMedia
        component="img"
        alt=""
        sx={{
          width: '300px',
          height: '300px',
          borderRadius: '24px',
        }}
        image={props.image}
      />
      <Stack
        sx={{
          width: '90%',
          gap: '5px',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Button fullWidth variant="contained" onClick={() => setLocal()}>
          {t('get-started')}
        </Button>
        <Button fullWidth color="info" component={Link} to="/auth/signin">
          {t('sign-in')}
        </Button>
      </Stack>
      <Button fullWidth component={Link} to="/dashboard">
        {t('let-me-browse')}
      </Button>
    </Box>
  )
}

export function WindowView(props) {
  return (
    <Stack
      direction="column"
      spacing={4}
      alignItems="center"
      sx={{ margin: '0 auto' }}
    >
      <CardMedia
        component="img"
        alt=""
        sx={{
          width: '300px',
          height: '300px',
          borderRadius: '24px',
        }}
        image={props.image}
      />
      <Typography sx={{ padding: '1em' }} variant="bold" textAlign="center">
        {props.text}
      </Typography>
    </Stack>
  )
}

export function InputSelectView(props) {
  const { multi, value, options } = props
  const classes = useClasses(styles)
  const cols = props.cols ? props.cols : 1

  const [data, setData] = useState(multi ? [] : '')

  function onChange(e) {
    multi
      ? !data.includes(e.target.value)
        ? setData([...data, e.target.value])
        : setData(data.filter((x) => x !== e.target.value))
      : setData(e.target.value)
  }

  return (
    <InputView data={data} {...props}>
      {multi ? (
        <Grid
          container
          sx={{
            gap: '10px',
            justifyContent: 'space-between',
            marginBottom: '2em',
          }}
        >
          {options?.map((val, i) => (
            <Box
              as="div"
              key={i}
              className={classes.btnInput}
              sx={{
                flex: `0 1 calc(calc(100% / ${cols}) - (10px * ${cols - 1}))`,
              }}
            >
              <input
                onChange={onChange}
                type="checkbox"
                value={val}
                name={value}
                id={val}
                hidden
              />
              <Button
                variant="selection"
                component="label"
                fullWidth
                htmlFor={val}
                className={data.includes(val) ? 'active' : ''}
              >
                {val}
                <Check />
              </Button>
            </Box>
          ))}
        </Grid>
      ) : (
        <Grid
          container
          style={{ gap: '10px', justifyContent: 'space-between' }}
        >
          {options?.map((val, i) => (
            <Box
              as="div"
              key={i}
              className={classes.btnInput}
              sx={{
                flex: `0 1 calc(calc(100% / ${cols}) - (10px * ${cols - 1}))`,
              }}
            >
              <input
                onChange={onChange}
                type="radio"
                value={val}
                name={value}
                id={val}
                hidden
              />
              <Button
                variant="selection"
                component="label"
                fullWidth
                htmlFor={val}
                size="small"
              >
                {val}
                <Check />
              </Button>
            </Box>
          ))}
        </Grid>
      )}
    </InputView>
  )
}

export function InputPillView(props) {
  const { value, options } = props

  const [data, setData] = useState([])

  function onChange(val) {
    !data.includes(val)
      ? setData([...data, val])
      : setData(data.filter((x) => x !== val))
  }

  return (
    <InputView data={data} {...props}>
      <Grid
        container
        sx={{
          gap: '10px',
          justifyContent: 'space-between',
          marginBottom: '2em',
        }}
      >
        {options?.map((val, i) => (
          <Box as="div" key={i}>
            <Chip
              key={i}
              label={val}
              clickable
              style={{
                marginLeft: 0,
                backgroundColor: data.includes(val) ? '#6956F1' : '#211E34',
                padding: '5px !important',
              }}
              onClick={() => onChange(val)}
              variant="default"
              disabled={data.length === 3 && !data.includes(val)}
            />
          </Box>
        ))}
      </Grid>
    </InputView>
  )
}

export function InputTextView(props) {
  const classes = useClasses(styles)
  const [data, setData] = useState('')
  function onChange(e) {
    setData(e.target.value)
  }

  return (
    <InputView data={data} {...props}>
      <Grid container item className={classes.gridColumn} onChange={onChange}>
        <TextField variant="outlined" fullWidth />
      </Grid>
    </InputView>
  )
}

export function InputSearchView(props) {
  const { value, formProgress, options } = props

  const classes = useClasses(styles)
  const { t } = useTranslation()
  const [inputValue, setInputValue] = useState('')
  const filtered = options.filter((x) =>
    x.toLowerCase().includes(inputValue.toLowerCase()),
  )

  const [data, setData] = useState('')
  function onInputChange(e) {
    setInputValue(e.target.value)
  }
  function onChange(e) {
    setData(e.target.value)
  }
  const Row = ({ data, index, style, e }) => (
    <div>
      <input
        onChange={onChange}
        type="radio"
        value={data[index]}
        name={value}
        id={data[index]}
        hidden
      />
      <Button
        variant="selection"
        component="label"
        htmlFor={data[index]}
        size="small"
        fullWidth
        sx={{ marginBottom: '5px' }}
      >
        {data[index]}
        <Check />
      </Button>
    </div>
  )
  return (
    <InputView data={data} {...props}>
      <Stack direction="column" sx={{ padding: '10px 0' }}>
        {data.length > 0 && (
          <Button variant="contained" size="small">
            {data}
          </Button>
        )}
      </Stack>

      <TextField variant="outlined" onChange={onInputChange} fullWidth />

      <Grid container item className={classes.gridColumn}>
        <Grid className={classes.scrollBox}>
          <Box sx={{ padding: '10px 0' }}>
            <input
              type="radio"
              value="other"
              id="other"
              name={value}
              hidden
              onChange={onChange}
            />
            <Button
              variant="selection"
              component="label"
              htmlFor="other"
              size="small"
              fullWidth
            >
              {t('btn.missing', { value: value })}
            </Button>
          </Box>
          <List
            itemData={filtered}
            itemCount={filtered.length}
            height={420}
            itemSize={65}
            width="100%"
          >
            {Row}
          </List>
        </Grid>
      </Grid>
    </InputView>
  )
}

export function EmailView() {
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
    <Box sx={{ padding: '50px 1em 1em 1em' }}>
      <Grid container item className={classes.gridColumn} md={6}>
        {formAlert && (
          <Box mb={3}>
            <Alert severity={formAlert.type}>{formAlert.message}</Alert>
          </Box>
        )}

        <AuthForm
          type="signup"
          buttonAction="Sign Up"
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
    </Box>
  )
}
export function FinishView(props) {
  const classes = useClasses(styles)
  const router = useRouter()
  const auth = useAuth()
  const email = localStorage.getItem('email')
  const { values } = props
  const multi = ['fnmi', 'language', 'interests']

  function handleExit() {
    router.push('/dashboard')
  }
  function handleClick() {
    const data = {}
    values.map((val, i) => {
      data[val] = localStorage.getItem(val)
      if (multi.includes(val)) data[val] = data[val].split(',')
    })

    updateUser(auth.user.sub, data)
    handleExit()
  }

  return (
    <Box sx={{ padding: '50px 1em 1em 1em' }}>
      <Grid container item className={classes.gridColumn} md={6}>
        {!auth.user ? (
          <>
            <p>
              We’ve sent a confirmation email to {email}. Please check your
              email to complete account registration
            </p>
          </>
        ) : (
          <>
            <Button
              variant="contained"
              component="button"
              size="lg"
              fullWidth
              onClick={handleClick}
            >
              Finish Setup
            </Button>
          </>
        )}
      </Grid>
    </Box>
  )
}
