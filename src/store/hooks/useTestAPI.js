import { useDispatch, useSelector } from 'react-redux'
import useAPI from './useAPI'

function useTestAPI () {
  const dispatch = useDispatch()
  const API = useAPI();

  return {
    forbidden: () => API.get('/forbidden'),
    unauthorized: () => API.get('/unauthorized'),
    notFound: () => API.get('/not-found', null, { suppressErrors: [404] }),
    timeout: () => API.get('/timeout'),
    teapot: () => API.get('/teapot', null, { customMessageMap: { 418: 'This is an optional Custom Message' } }),
    serverErr: () => API.get('/server-error'),
    badGateway: () => API.get('/bad-gateway'),
    unavailable: () => API.get('/unavailable')
  }
}

export default useTestAPI
