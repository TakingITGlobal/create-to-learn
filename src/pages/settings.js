import React from 'react'
import Meta from './../components/Meta'
import SettingsSection from './../components/Settings/SettingsSection'
import { useRouter } from './../util/router'

function SettingsPage(props) {
  const router = useRouter()

  return (
    <>
      <Meta title="Settings | Create to Learn" />
      <SettingsSection
        bgColor="default"
        bgImage=""
        bgImageOpacity={1}
        section={router.query.section}
        key={router.query.section}
      />
    </>
  )
}

export default SettingsPage
