import { message } from 'antd';
import request, { RequestOptionsInit } from 'umi-request'
import instance from './index';

interface Iopt extends RequestOptionsInit {
  ifHandleError?: boolean; // 统一处理错误
  ifCanceled?: boolean;
  msg?: string; // 提示信息
}

// 统一处理返回200但code为负的情况
const errorHandler = (res: any) => {
  if (res && res.code < 0) {
    message.error(res.message)
  }
}

const req = async (url: string, opt: Iopt) => {
  const options: Iopt = {
    method: 'get',
    ifHandleError: true,
    ifCanceled: false,
    // cancelToken: source.token,
    ...opt
  }
  const res=await instance

  try {
    const res = await instance(url, { ...opt });
    if (options.ifHandleError) {
      errorHandler(res)
    }
    return res
  } catch (err) {
    // if (options.ifHandleError && !options.ifCanceled) {
    //   message.error(err.message || err.msg || '请求失败!')
    // }
    throw err
  }
}

export const get = (url: string, opt?: Iopt) => {
 
  
  return req(url, {
    method: 'GET',
    params: opt?.params,
    headers: opt?.headers,
    msg: opt?.msg
  })
}

export const post = (url: string, opt?: Iopt, multipart?: boolean) => {

  return req(url, {
    method: 'POST',
    requestType: 'form',
    data: opt?.data,
    msg: opt?.msg
  })
}

export const deleteFile = (url: string, opt?: Iopt) => {

  return req(url, {
    method: 'DELETE',
    requestType: 'form',
    data: opt?.data,
    msg: opt?.msg
  })
}
