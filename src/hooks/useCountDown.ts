import { useState } from 'react';

const useCountdown = (
  initial: number
): [number, () => void, boolean] => {
  const [count, setCount] = useState(initial);
  const [timeStatus, setTimeStatus] = useState(false);
  
  let timer: any;
  const countdown = () => {
    setCount(count => {
      if (count > 0) {
        return count-1
      } else {
        clearInterval(timer)
        setTimeStatus(false)
        return initial
      }
    })
  }
  const start = () => {
    setTimeStatus(true)
    timer=setInterval(countdown,1000)
  }

  return [count, start, timeStatus];
};

export default useCountdown