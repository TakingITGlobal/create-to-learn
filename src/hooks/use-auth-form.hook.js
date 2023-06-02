import { useState } from 'react'
import { useRouter } from '../util/router'

export const useAuthForm = () => {
  const router = useRouter()
  const [formAlert, setFormAlert] = useState(null)

  const type = router.query.type
  const afterAuthPath = router.query.next || '/dashboard'

  const handleAuth = () => {
    router.push(afterAuthPath)
  }

  const handleFormAlert = (data) => {
    setFormAlert(data)
  }

  console.log(formAlert)
  return { formAlert, handleAuth, handleFormAlert, type }
}
