import React from 'react';
import { Redirect } from 'react-router-dom';
import Meta from './../components/Meta';
import { useTranslation } from 'react-i18next';
import { BrowserView, MobileView } from 'react-device-detect';
import SignUpSection from 'components/SignUp/SignUpSection'

function IndexPage() {
  const { t } = useTranslation();
  return (
    <>
      <Meta />
      <BrowserView>
        <Redirect to="/dashboard" />
      </BrowserView>
      <MobileView>
        <SignUpSection title={t('create-to-learn')} startSignUp={0}/>
      </MobileView>
    </>
  );
}

export default IndexPage;
