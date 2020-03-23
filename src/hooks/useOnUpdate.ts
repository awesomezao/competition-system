import {
  useEffect,
  useRef,
} from 'react';

const useOnUpdate=(fn: () => void, dep?: any[])=> {
  const ref = useRef({ fn, mounted: false });
  ref.current.fn = fn;

  useEffect(() => {
    if (!ref.current.mounted) {
      ref.current.mounted = true;
    } else {
      ref.current.fn();
    }
  }, dep);
}

export default useOnUpdate