import { ROUTES } from '../constants/routing'
import { useRouter } from '../util/router'

export const useAfterAuthPath = () => {
  const { query } = useRouter()
  const afterAuthPath = query.next || ROUTES.DASHBOARD

  return { afterAuthPath }
}
