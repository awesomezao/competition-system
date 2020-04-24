/**
 * TODO: remember to delete test token
 */

import { message } from 'antd';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import qs from 'qs';

import { checkStatus } from '@/utils';

interface IReqConfig {
  token: string;
}
const isDev = process.env.NODE_ENV === 'development'

const envUrl = () => {
  return isDev ? '/meeting-v2' : ''
}

const instance: AxiosInstance = axios.create({
  timeout: 5000,
  transformRequest: [
    function (data: any) {
      return data
    }
  ],
  transformResponse: [
    function (data: any) {
      return JSON.parse(data)
    }
  ],
  headers: {
    'Cache-Control': 'no-cache',
    'token': ''
  },
  withCredentials: true,
  baseURL:envUrl()
})

/**
 * 请求拦截
 * @description 处理请求头
 */
instance.interceptors.request.use((config: AxiosRequestConfig) => {
  // let cancelToken = axios.CancelToken
  // let source = cancelToken.source()
  // if ((config as any).ifCanceled) {
  //   config.cancelToken = source.token
  //   source.cancel('cancel request')
  // }
  let token = window.localStorage.getItem('user_token')
  config.headers = Object.assign(
    config.method === 'get'
      ? {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
      }
      : {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    config.headers,

  )
  // 测试token
  if (token) {
    config.headers['token'] = JSON.parse(token)
  }
  if (config.method === 'post') {
    const contentType: string = config.headers['Content-Type'];
    if (contentType) {
      if (contentType.includes('multipart')) {

      } else if (contentType.includes('json')) {
        // config.data=encodeURI(config.data)
        config.data = JSON.stringify(config.data)
      } else {
        config.data = qs.stringify(config.data)
      }
    }
  }
  return Promise.resolve(config)
}, (error: AxiosError) => {
  return Promise.reject(error)
})


/**
 * 响应拦截
 * @description 处理请求错误
 */
instance.interceptors.response.use((response: AxiosResponse) => {
  const { code } = response.data || {};
  if (code < 0) {
    message.error(response.data.message || '请求失败,请稍候重试...')
    return Promise.resolve({})
  } else {
    if ((response.config as any).msg) {
      message.success((response.config as any).msg)
    }
    return Promise.resolve(checkStatus(response))
  }
}, (error: AxiosError) => {
  if (error.response) {
    return Promise.reject(checkStatus(error.response))
  } else if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
    return Promise.reject({ msg: '请求超时' });
  } else {
    return Promise.reject({});
  }
})

export default instance