import { useEffect } from 'react';

const useOnUnmount=(fn: Function)=> {
  useEffect(() => {
    return () => {
      fn()
    };
  }, [])
}

export default useOnUnmount