import {
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
} from 'react';

const useStorage = <T>(
  key: string,
  // 默认值
  defaultValue?: T | (() => T),
  // 是否在窗口关闭后保持数据
  keepOnWindowClosed: boolean = true
): [T | undefined, Dispatch<SetStateAction<T>>, () => void] => {
  const storage = keepOnWindowClosed ? localStorage : sessionStorage;

  // 尝试从Storage恢复值
  const getStorageValue = () => {
    try {
      const storageValue = storage.getItem(key);
      if (storageValue !== null) {
        return JSON.parse(storageValue);
      } else if (defaultValue) {
        // 设置默认值
        const value =
          typeof defaultValue === 'function'
            ? (defaultValue as () => T)()
            : defaultValue;
        storage.setItem(key, JSON.stringify(value));
        return value;
      }
    } catch (err) {
      console.warn(`useStorage 无法获取${key}: `, err);
    }

    return undefined;
  };

  const [value, setValue] = useState<T | undefined>(getStorageValue);

  // 更新组件状态并保存到Storage
  const save = useCallback<Dispatch<SetStateAction<T>>>(value => {
    setValue(prev => {
      const finalValue =
        typeof value === 'function'
          ? (value as (prev: T | undefined) => T)(prev)
          : value;
      storage.setItem(key, JSON.stringify(finalValue));
      return finalValue;
    });
  }, []);

  // 移除状态
  const clear = useCallback(() => {
    storage.removeItem(key);
    setValue(undefined);
  }, []);

  return [value, save, clear];
}

export default useStorage
// // --------
// // EXAMPLE
// // --------
// function Demo() {
//   // 保存登录状态
//   const [use, setUser, clearUser] = useStorage('user');
//   const handleLogin = user => {
//     setUser(user);
//   };

//   const handleLogout = () => {
//     clearUser();
//   };

//   // ....
// }

