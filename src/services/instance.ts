import { message } from 'antd';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import qs from 'qs';

import { checkStatus } from '@/utils';

const instance: AxiosInstance = axios.create({
  timeout: 15000,
  transformRequest: [
    function (data: any) {
      return data
    }
  ],
  transformResponse: [
    function (data: any) {
      console.log(data)
      return JSON.parse(data)
    }
  ],
  headers: {
    'Cache-Control': 'no-cache',
  }
})

/**
 * 请求拦截
 * @description 处理请求头
 */
instance.interceptors.request.use((config: AxiosRequestConfig) => {
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
  if (config.method === 'post') {
    const contentType: string = config.headers['Content-Type'];
    if (contentType) {
      if (contentType.includes('multipart')) {

      } else if (contentType.includes('json')) {
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
    message.warning(message || '请求失败,请稍候重试...')
    return Promise.resolve({})
  } else {
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