import {
  useCallback,
  useState,
} from 'react';

import useOnMount from './useOnMount';
import useRefState from './useRefState';

const useRequest = (reqFunction: (...args: any) => Promise<any>, dataTransfer?: (...args: any) => any,delay:boolean=false) => {
  const [isDelay, setIsDelay] = useState(delay)
  const [loading, setLoading] = useState(false)
  const [value, setValue, latestValue] = useRefState<any>(null)
  const init = async () => {
    setLoading(true)
    try {
      const res = await reqFunction()
      if (dataTransfer) {
        setValue(dataTransfer(res))
      } else {
        setValue(res)
      }
    } catch (error) {

    } finally {
      setLoading(false)
    }
  }
  useOnMount(async () => {
    if (!isDelay) {
      init()
    }
  })
  const run = useCallback(
    () => {
      init()
    },
    [],
  )
  const callBack = () => {

  }
  return {
    value,
    setValue,
    latestValue,
    loading,
    setLoading,
    run
  }
}

export default useRequest