import { useState } from 'react'
import { useRouter } from '../util/router'

export const useAuthForm = () => {
  const router = useRouter()
  const [formAlert, setFormAlert] = useState(null)

  const handleAuth = (afterAuthPath) => {
    router.push(afterAuthPath)
  }

  const handleFormAlert = (data) => {
    setFormAlert(data)
  }

  return { formAlert, handleAuth, handleFormAlert }
}
