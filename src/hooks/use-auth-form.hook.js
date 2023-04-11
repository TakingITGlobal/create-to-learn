import { useState } from 'react'
import { useRouter } from '../util/router'
import { useAfterAuthPath } from './use-after-auth-path.hook'

export const useAuthForm = () => {
  const { push } = useRouter()
  const { afterAuthPath } = useAfterAuthPath()
  const [formAlert, setFormAlert] = useState(null)
  console.log(formAlert, router)


  const handleAuth = () => {
    router.push(afterAuthPath)
  }

  const handleFormAlert = (data) => {
    setFormAlert(data)
  }

  console.log(formAlert)
  return { formAlert, handleAuth, handleFormAlert, type }

}
