import {AxiosRequestConfig} from 'axios'
import {message} from 'antd'

import instance from './instance'

interface Iopt extends AxiosRequestConfig{
  ifHandleError?: boolean; // 统一处理错误
}

// TODO: remember to set production env 
const isDev = process.env.NODE_ENV === 'development'
const envUrl = () => {
  return isDev?'/api':''
}

const request = async (opt: Iopt) => {
  const options:Iopt = {
    method: 'get',
    ifHandleError: true,
    ...opt
  }
  options.baseURL = envUrl()
  try {
    const res = await instance(options);
    // if (res.code < 0 && options.ifHandleError) {
    //   message.error(res)
    // }
    return res
  } catch(err){
    if (options.ifHandleError) {
      message.error(err.message||err.msg||'请求失败!')
    }
    return err
  }
}

export const get = (url:string,opt?:Iopt) => {
  return request({
    method: 'GET',
    url,
    params: opt?.params,
    headers:opt?.headers
  })
}
export const post = (url:string,opt ?: Iopt)=> {
  return request({
    method:'post'
  })
}