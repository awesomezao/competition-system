import { AxiosResponse } from 'axios'

export interface Idata {
  code: number;
  massage: string;
  data: any;
}

export default function checkStatus(response: AxiosResponse<any>) {

  const status = response.status || -1000;
  if ((status >= 200 && status < 300) || status === 304) {
    return response.data 
  } else {
    let errorInfo = '';
    switch (status) {
      case -1:
        errorInfo = '远程服务响应失败,请稍后重试';
        break;
      case 400:
        errorInfo = '400: 错误请求';
        break;
      case 401:
        errorInfo = '401: 访问令牌无效或已过期';
        break;
      case 403:
        errorInfo = '403: 拒绝访问';
        break;
      case 404:
        errorInfo = '404: 资源不存在';
        break;
      case 405:
        errorInfo = '405: 请求方法未允许';
        break;
      case 408:
        errorInfo = '408: 请求超时';
        break;
      case 500:
        errorInfo = '500: 访问服务失败';
        break;
      case 501:
        errorInfo = '501: 未实现';
        break;
      case 502:
        errorInfo = '502: 无效网关';
        break;
      case 503:
        errorInfo = '503: 服务不可用';
        break;
      default:
        errorInfo = '连接错误';
    }
    return {
      status,
      msg:errorInfo
    }
  }
}