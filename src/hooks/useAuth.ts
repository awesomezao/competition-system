import {
  useCallback,
  useState,
} from 'react';
import useStorage from './useStorage'
import useOnMount from './useOnMount'

const useAuth = () => {

  const [token, setToken, clearToken] = useStorage('user_token')
  const [value, setValue] = useState(false);
  useOnMount(() => {
    if (token) {
      
    }
  })
  return {
    token,
    setToken,
    clearToken
  };
}

export default useAuth