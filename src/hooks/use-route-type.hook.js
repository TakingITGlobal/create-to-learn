import { useRouter } from '../util/router'

export const useRouteType = () => {
  const { query } = useRouter()

  return {
    type: query?.type || '',
  }
}
