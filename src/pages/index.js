import React from 'react'
import Meta from './../components/Meta'
import WelcomeSection from './../components/WelcomeSection'
import { useTranslation } from 'react-i18next'

function IndexPage(props) {
  const { t } = useTranslation();
  return (
    <>
      <Meta />
      <WelcomeSection
        image='https://www.kadencewp.com/wp-content/uploads/2020/10/alogo-2.png'
        title={t('create-to-learn')}
      />
    </>
  )
}

export default IndexPage
