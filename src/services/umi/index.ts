import request, { RequestOptionsInit, ResponseError } from 'umi-request'
import { message } from 'antd'
import {isUndefined,isNull} from 'lodash'

// 判断开发环境
const isDev = process.env.NODE_ENV === 'development'

const envUrl = () => {
  return isDev ? '/meeting-v2' : ''
}

// 统一处理错误
const errorHandler = (error: ResponseError) => {
  const codeMap = {
    400: '错误请求',
    401: '访问令牌无效或已过期',
    403: '拒绝访问',
    404: '资源不存在',
    405: '请求方法未允许',
    408: '连接超时',
    500: '访问服务失败',
    503: '服务不可用',
  }
 
  // 统一处理超时
  if (error.type === 'Timeout') {
    message.error('请求超时')
    // return
    throw new Error('请求超时')
  }
  
  // 统一处理错误码
  if (error.response) {
    let resStatus = String(error.response.status)
    if (codeMap.hasOwnProperty(resStatus)) {
      message.error((codeMap as any)[resStatus])
      throw new Error(error.response.statusText)
    } else {
      message.error('发生未知错误')
    }
    // throw new Error('未知错误')
    throw error
    // return
  }
  // throw new Error('未知错误')
  throw error
  // return 
}

// 配置umi的全局配置
request.extendOptions({
  prefix: envUrl(),
  timeout: 5000,
  errorHandler,
  requestType: 'form',
})

// request.use(async (ctx, next) => {
//   console.log(ctx.req)
//   console.log(ctx.res)
//   await next()
// })

// 拦截请求
request.interceptors.request.use((url: string, options: RequestOptionsInit) => {
  let token = window.localStorage.getItem('user_token')
  if (!isNull(token) && token!=='undefined') {
    (options.headers as any)['token'] = JSON.parse(token)
  }
  return {
    url: url,
    options: { ...options, interceptors: true }
  }
})

// 拦截响应
request.interceptors.response.use(async (response: Response, options: RequestOptionsInit) => {
  if (response.headers.get('Content-Type') === 'application/octet-stream') {
    options.responseType='blob'
  }
  return response
})

export default request


