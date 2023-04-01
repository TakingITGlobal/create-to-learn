import { useState } from 'react'
import { useRouter } from '../util/router'
import { useAfterAuthPath } from './use-after-auth-path.hook'

export const useAuthForm = () => {
  const { push } = useRouter()
  const { afterAuthPath } = useAfterAuthPath()
  const [formAlert, setFormAlert] = useState(null)

  const handleAuth = () => push(afterAuthPath)
  const handleFormAlert = (data) => setFormAlert(data)

  return { formAlert, handleAuth, handleFormAlert }
}
