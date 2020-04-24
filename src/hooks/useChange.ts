import {
  useCallback,
  useState,
} from 'react';

const useChange=<S>(initial: S | (() => S))=> {
  const [value, setValue] = useState(initial);
  const onChange = useCallback(e => setValue(e.target.value), []);
  const onFocus=useCallback(
    (callback) => {
      callback()
    },
    [],
  )
  const onBlur=useCallback(
    (callback) => {
      callback()
    },
    [],
  )
  const handleChange=useCallback(
    (callback) => {
      callback()
    },
    [],
  )
  

  return {
    value,
    setValue,
    onChange:handleChange,
    onFocus,
    onBlur,
    // 绑定到原生事件
    bindEvent: {
      onChange,
      value
    },
    // 绑定到自定义组件
    bind: {
      onChange: setValue,
      value
    }
  };
}

export default useChange

// ----------
// EXAMPLE
// ----------
// function Demo() {
//   const userName = useChange('');
//   const password = useChange('');

//   return (
//     <div>
//       <input {...userName.bindEvent} />
//       <input type="password" {...password.bindEvent} />
//     </div>
//   );
// }
