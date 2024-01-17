import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'

import { useTranslation } from 'react-i18next'
import { deleteUser } from '../../util/db'
import { useAuth } from '../../util/auth'

function SettingsDeleteAccount({ showComponent, setShowComponent }) {
  const { t } = useTranslation()
  const auth = useAuth()

  const [dialog, setDialog] = useState(false)
  //   const [confirmDeletedDialog, setConfirmDeletedDialog] = useState(false)
  return (
    showComponent === 'deleteAccount' && (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '700px',
        }}
      >
        <Box sx={{ padding: '1.5rem 0' }}>
          <Typography variant="h6" fontWeight={700} color={'lavender'}>
            {t('settings.delete-your-account')}
          </Typography>
          <Typography variant="body1">
            Info about deleting your account. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nunc vulputate libero et velit
            interdum, ac aliquet odio mattis.
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            padding: '1.5rem 0',
            flexGrow: 1,
            alignItems: 'flex-end',
          }}
        >
          <Button fullWidth onClick={() => setDialog(true)} color="error">
            {t('settings.delete-my-account')}
          </Button>
        </Box>
        <Dialog onClose={() => setDialog(false)} open={dialog}>
          <Box sx={{ paddingBottom: '10px' }}>
            <Typography variant="h3">{t('settings.confirm-delete')}</Typography>
          </Box>
          <Box sx={{ paddingBottom: '20px', textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              {t('settings.are-you-sure')}
            </Typography>
          </Box>
          <Grid container>
            <Grid item xs={6}>
              <Button
                variant="text"
                size="large"
                fullWidth
                onClick={() => {
                  deleteUser(auth.user.uid)
                  auth.signout()
                  // setConfirmDeletedDialog(true)
                }}
              >
                {t('settings.yes-delete')}
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={() => setDialog(false)}
              >
                {t('cancel')}
              </Button>
            </Grid>
          </Grid>
        </Dialog>
        {/* To do: local storage has to be cleared when deleting a user and
      defaults to the login screen. // Would love to be able to show the
      'account deleted successful' instead of defaulting to the login */}
        {/* <Dialog
        onClose={() => setConfirmDeletedDialog(false)}
        open={confirmDeletedDialog}
      >
        <Box sx={{ paddingBottom: '10px' }}>
          <Typography variant="h3" sx={{ color: 'white' }}>
            {t('settings.account-deleted')}
          </Typography>
        </Box>
        <Box sx={{ paddingBottom: '20px', textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            {t('settings.account-deleted-success')}
          </Typography>
        </Box>
        <Button
          variant="text"
          size="large"
          fullWidth
          onClick={() => {
            auth.signout()
            setShowComponent('nav')
          }}
        >
          {t('settings.okay-got-it')}
        </Button>
      </Dialog> */}
      </Box>
    )
  )
}

export default SettingsDeleteAccount
