import { message } from 'antd';
import axios, { AxiosRequestConfig } from 'axios';

import instance from './instance';

interface Iopt extends AxiosRequestConfig {
  ifHandleError?: boolean; // 统一处理错误
  ifCanceled?: boolean;
  msg?: string;
}

// const isDev = process.env.NODE_ENV === 'development'

// // 根据环境获取url地址
// const envUrl = () => {
//   return isDev ? '/meeting-v2' : ''
// }

const request = async (opt: Iopt) => {
  // let cancelToken = axios.CancelToken
  // let source = cancelToken.source()
  // if ((config as any).ifCanceled) {
  //   config.cancelToken = source.token
  //   source.cancel('cancel request')
  // }

  const options: Iopt = {
    method: 'get',
    ifHandleError: true,
    ifCanceled: false,
    // cancelToken: source.token,
    ...opt
  }
  // options.baseURL = envUrl()

  // const cancelReq = () => {
  //   options.ifCanceled = true
  //   source.cancel('cancel request')
  // }
  
  try {

    const res = await instance(options);
    // if (res.code < 0 && options.ifHandleError) {
    //   message.error(res)
    // }
    return res.data
  } catch (err) {
    if (options.ifHandleError && !options.ifCanceled) {
      message.error(err.message || err.msg || '请求失败!')
    }
    return err
  }
}

export const get = (url: string, opt?: Iopt) => {
  return request({
    method: 'GET',
    url,
    params: opt?.params,
    headers: opt?.headers,
    msg: opt?.msg
  })
}
export const post = (url: string, opt?: Iopt, multipart?: boolean) => {
  let contentType: string = 'application/x-www-form-urlencoded;charset=UTF-8'
  if (multipart) {
    contentType = 'multipart/form-data;charset=UTF-8'
  }
  return request({
    method: 'post',
    url,
    data: opt?.data,
    headers: {
      'Content-Type': contentType
    },
    msg: opt?.msg
  })
}