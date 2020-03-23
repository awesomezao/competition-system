import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from 'react';

const useRefState = <T>(
  initialState: T | (() => T)
): [T, Dispatch<SetStateAction<T>>, MutableRefObject<T | undefined>] => {
  const latestState = useRef<T | undefined>();
  const [state, setState] = useState(() => {
    const value =
      typeof initialState === 'function'
        ? (initialState as () => T)()
        : initialState;
    latestState.current = value;
    return value;
  });

  const setValue = useCallback(value => {
    if (typeof value === 'function') {
      setState(prevState => {
        const finalValue = value(prevState);
        latestState.current = finalValue;
        return finalValue;
      });
    } else {
      latestState.current = value;
      setState(value);
    }
  }, []);

  return [state, setValue, latestState];
}

export default useRefState;
