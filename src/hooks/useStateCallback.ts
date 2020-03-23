import {
  useCallback,
  useEffect,
  useState,
} from 'react';

const useStateCallback=<T>(
  initialState: T | (() => T)
): [T, (value: T, callback?: () => any) => any] =>{
  const [_state, _setState] = useState<T>(initialState);

  useEffect(() => {
    
  }, [_state]);

  const mySetState = useCallback((value: T, callback?: () => any) => {
    _setState(value);
  }, []);

  return [_state, mySetState];
}

export default useStateCallback