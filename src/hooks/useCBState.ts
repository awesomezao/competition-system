import { useEffect, useRef, MutableRefObject } from 'react';
import useRefState from './useRefState';

const useCBState = <T>(
  initState: T | (() => T)
): [
  T,
  (state: T | ((prev: T) => T), cb: () => any) => void,
  MutableRefObject<T|undefined>
] => {
  const [state, setState, ins] = useRefState(initState);
  let isUpdate = useRef<any>();
  const setCBState = (state: T | ((prev: T) => T), cb: () => any) => {
    setState(prev => {
      isUpdate.current = cb;
      return typeof state === 'function'
        ? (state as (prev: T) => T)(prev)
        : state;
    });
  };
  useEffect(() => {
    if (isUpdate.current) {
      isUpdate.current();
    }
  });
  return [state, setCBState, ins];
};

export default useCBState;
