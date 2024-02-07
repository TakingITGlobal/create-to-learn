import React, { useState } from 'react'
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
import Container from '@mui/material/Container'
import Section from './Section'
import SectionHeader from './SectionHeader'

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

function TitleSection({ value }) {
  const { t } = useTranslation()

  return (
    <Box
      sx={{
        padding: '50px 1em 1.5em 1.5em',
        maxWidth: { md: '850px' },
        margin: { md: '0 auto' },
      }}
    >
      <Stack direction="column">
        <Typography variant="decorative">
          {t(`onboarding.${value}.header`)}
        </Typography>
        <Typography variant="secondary" sx={{ color: '#D2CCFB' }}>
          {t(`onboarding.${value}.header2`)}
        </Typography>
        <Typography variant="secondary">
          {t(`onboarding.${value}.subheader`)}
        </Typography>
      </Stack>
    </Box>
  )
}

const stylesWelcome = (theme: Theme) => ({
  container: {
    padding: `0 ${theme.spacing(2)}`,
  },

  signIn: {},
})


export function WelcomeView({ image, startSignUp }) {
  const swiper = useSwiper()
  const { t } = useTranslation()

  const setLocal = () => {
    swiper.slideNext()
  }
  return (
    <Section>
      <Container maxWidth="md">
        <Grid container direction="column" alignItems="center">
          <SectionHeader title={t('create-to-learn')} textAlign="center"/>
          <CardMedia
            component="img"
            alt=""
            sx={{
              width: '300px',
              height: '300px',
              borderRadius: '24px',
            }}
            image={image}
          />
          <Stack direction="column" width="100%" spacing={2}>
            {/* If startSignUp = 0, then show the button */}
            <Typography 
              variant="body1" 
              color="text.primary" 
              sx={{ 
                textAlign:'center', 
                padding:'20px 0',
                display: startSignUp === 0 ? 'block' : 'none',
              }}
              >
              {t('do-not-require-account')}
            </Typography>
            <Button fullWidth variant="contained" onClick={() => setLocal()}>
              {t('get-started')}
            </Button>
            {/* If startSignUp = 0, then show the button */}
            <Button 
              fullWidth 
              color="info" 
              component={Link} 
              to="/auth/signin"
              sx={{
                display: startSignUp === 0 ? 'block' : 'none', // Show if startSignUp === 0
              }}
            >
              {t('sign-in')}
            </Button>
          </Stack>
          <Button fullWidth component={Link} to="/dashboard">
            {t('let-me-browse')}
          </Button>
        </Grid>
      </Container>
    </Section>
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
  const { value, options } = props
  const classes = useClasses(styles)
  const [data, setData] = useState([])

  const cols = props.cols ? props.cols : 1

  function onChange(e) {
    let arr
    if (!data.includes(e.target.value)) {
      arr = [...data, e.target.value]
      setData(arr)
    } else {
      arr = data.filter((x) => x !== e.target.value)
      setData(arr)
    }
    localStorage.setItem(value, arr)
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
              {data.includes(val) ? <Check /> : null}
            </Button>
          </Box>
        ))}
      </Grid>
    </Box>
  )
}

export function InputPillView(props) {
  const { options, value } = props

  const [data, setData] = useState([])

  function onChange(val) {
    let arr
    if (!data.includes(val)) {
      arr = [...data, val]
      setData(arr)
    } else {
      arr = data.filter((x) => x !== val)
      setData(arr)
    }
    localStorage.setItem(value, arr)
  }

  return (
    <Box>
      <TitleSection value={value} />
      <Grid
        container
        sx={{
          gap: '10px',
          justifyContent: 'space-between',
          marginTop: '2em',
          padding: '1.5em',
        }}
      >
        {options?.map((val, i) => (
          <Box as="div" key={i}>
            <Chip
              key={i}
              label={val}
              clickable
              style={{
                fontSize: 16,
                marginLeft: 0,
                backgroundColor: data.includes(val) ? '#6956F1' : '#211E34',
                fontWeight: data.includes(val) ? '700' : '',
                padding: '16px !important',
              }}
              onClick={() => onChange(val)}
              variant="default"
              disabled={data.length === 3 && !data.includes(val)}
            />
          </Box>
        ))}
      </Grid>
    </Box>
  )
}

export function InputTextView({ value }) {
  const classes = useClasses(styles)
  const [data, setData] = useState('')

  function onChange(e) {
    const val = e.target.value
    setData(val)
    localStorage.setItem(value, val)
  }

  return (
    <Box>
      <TitleSection value={value} />
      <Grid
        container
        item
        className={classes.gridColumn}
        onChange={onChange}
        sx={{ padding: '1.5em' }}
      >
        <TextField variant="outlined" fullWidth />
      </Grid>
    </Box>
  )
}

export function InputSearchView(props) {
  const { value, options } = props

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
    const val = e.target.value
    setData(e.target.value)
    localStorage.setItem(value, val)
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
    <>
      <TitleSection value={value} />

      <Box sx={{ margin: '1.5em' }}>
        <Stack direction="column">
          {data.length > 0 && (
            <Button variant="contained" size="small">
              {data}
            </Button>
          )}
        </Stack>

        <TextField variant="outlined" onChange={onInputChange} fullWidth />

        <Grid className={classes.gridColumn}>
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
      </Box>
    </>
  )
}

export function EmailView() {
  const classes = useClasses(styles)
  const [formAlert, setFormAlert] = useState(null)
  const swiper = useSwiper()

  const handleFormAlert = (data) => {
    setFormAlert(data)
  }
  
  const handleAuth = (userData) => {
    const email = userData.email
    if (email) {
      localStorage.setItem('email', email);
      swiper.slideNext();
    } else {
      console.error("Email is missing in userData");
    }
  }

  return (
    <Box sx={{ 
      display: 'flex',
      justifyContent: 'center',
      padding: '50px 1em 1em 1em'
      }}>
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
