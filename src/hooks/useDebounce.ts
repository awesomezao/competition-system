import {
  useEffect,
  useRef,
} from 'react';

const useDebounce = (fn:()=>any, ms:number = 30, deps = []) => {
  let timeout = useRef<any>()
  useEffect(() => {
    if (timeout.current) clearTimeout(timeout.current)
    timeout.current = setTimeout(() => {
      fn()
    }, ms)
  }, deps)

  const cancel = () => {
    clearTimeout(timeout.current)
    // timeout = null
  }

  return [cancel]
}

export default useDebounce

