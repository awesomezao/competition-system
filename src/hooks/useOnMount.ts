import { useEffect } from 'react';

const useOnMount=(fn: Function)=> {
  useEffect(() => {
    fn();
  }, []);
}

export default useOnMount 
