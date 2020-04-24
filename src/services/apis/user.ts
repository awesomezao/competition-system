import * as config from './config'
import { get, post } from '../umi/method'

interface IuserJson {
  username?: string;
  gender?: '男' | '女';
  emailaddr?: string;
  phone?: string;
  password?: string
}

export interface IuserMsg{
  content?: string;
  isread?: number;
  msgid?: number;
  sendfrom?: string;
  sendto?: string;
}

/**
 * 获取系统消息
 * @returns {IuserMsg[]}
 */
export const getMessage = () => get(config._GET_USER_NOTIFICATION)

/**
 * 注册
 * @param userJson 用户信息
 * @param verificationCode 验证码
 */
export const signup = (userJson: IuserJson, verificationCode: string) => post(config.SIGINUP, {
  data: {
    userJson: encodeURIComponent(JSON.stringify(userJson)), verificationCode
  }
})

/**
 * 登录
 * @param key 登录邮箱或者电话
 * @param password 登录密码
 */
export const login = (key: string, password: string) => post(config.LOGIN, { data: { key, password } })

/**
 * 获取用户的信息
 */
export const getUserInfo = () => get(config._GET_USER_INFO)

/**
 * 获取用户公开的信息
 * @param userId 
 */
export const getUserPublicInfo = (userId: number) => post(config.GET_USER_PUBLICINFO, { data: { userId } })

/**
 * 获取用户头像
 * @param filename 文件名
 */
export const getUserIcon = (filename: string) => get(config._GET_USER_ICON + filename)

/**
 * 上传用户头像
 * @param img 图像formData
 * @param phone 用户电话
 */
export const uploadUserIcon = (formData: any) => {

  return post(config.UPLOAD_USER_IMG, {
    data:formData
  }, true)
}

/**
 * 更新用户信息
 * @param userJson 
 */
export const updateUser = (userJson: IuserJson) => post(config.UPDATA_USER_INFO,
  {
    data: { userJson: encodeURIComponent(JSON.stringify(userJson)) }
  })

/**
 * 修改密码
 * @param mailAddr_or_Phone 用户邮箱或者电话
 * @param password 新密码
 * @param verificationCode 验证码
 */
export const updatePwd = (mailAddr_or_Phone: string, password: string, verificationCode: string) => post(config.UPDATA_USER_PASSWORD, { data: { mailAddr_or_Phone, password, verificationCode } })

/**
 * 获得验证码
 * @param mailAddr_or_Phone 用户邮箱或者电话
 */
export const getVerificationCode = (mailAddr_or_Phone: string) => post(config.GET_USER_VERIFICATION_CODE, { data: { mailAddr_or_Phone } })



