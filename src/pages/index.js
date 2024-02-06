import React from 'react'
import Meta from './../components/Meta'
import { useTranslation } from 'react-i18next'
import SignUpSection from 'components/SignUp/SignUpSection'


function IndexPage() {
  const { t } = useTranslation()
  return (
    <>
      <Meta />
      <SignUpSection 
        title={t('create-to-learn')}
        startSignUp={0}
      />
    </>
  )
}

export default IndexPage
