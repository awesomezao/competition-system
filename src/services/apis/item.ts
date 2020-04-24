import * as config from './config'
import { get, post } from '../umi/method'

export interface Iitem {
  meetingid?: number;
  mName?: string;
  location?: string;
  startTime?: string;
  closeTime?: string;
  introduction?: string;
  schedule?: string;
  needvolunteer?: string;
  typeid?: number;
  organizer?: string;
  hostedby?: string;
  communicate?: string;
}


/**
 * 发布会议
 * @param meeting 会议json
 * @param volunt 志愿者json
 * @param guests 嘉宾json
 */
export const publishItem = (meetingJson: Iitem, taskJson?: any) => post(config.ADD_MEETING_INFO, { data: { meetingJson: encodeURIComponent(JSON.stringify(meetingJson)), taskJson }, msg: '发布成功' })

/**
 * 获取主页会议列表
 * @param offset 起始位置
 * @param limit 条数
 * @returns 
 */
export const getHomeItemList = (offset: number, limit: number) => {
  return get(
    config._GET_MEETING_Time_Sort_PAGE_DATA,
    { params: { offset, limit } })
}

/**
 * 获取会议主题图
 * @param meetingId 会议id
 */
export const getItemIcon = (meetingId: number) => {
  return get(config._GET_MEETING_ICON + meetingId)
}

/**
 * 
 * @param meetingId 会议id
 * @param icon file文件
 */
export const uploadItemIcon = (meetingId: number, icon: any) => {
  return post(config.UPLOAD_MEETING_ICON + meetingId,
    { data: icon }, true)
}

/**
 * 获取会议类型
 */
export const getItemTypes = () => get(config._GET_MEETING_TYPE)

/**
 * 根据会议类型获得列表
 * @param type 会议类型
 */
export const getHomeItemListByCondition = (type?: number) => get(config._SEARCH_MEETING_CONFITION, { params: { type } })

/**
 * 获得会议详情
 * @param meetingId 会议id
 */
export const getItemInfo = (meetingId: number) => get(config._GET_MEETING_INFO + meetingId)

/**
 * 获取与自己相关的会议信息
 * @param type 路径变量中类型：（1为创建 2为参加 3为收藏）
 */
export const getMyItem = (type: number) => get(config.FAVORITE_MEETING)

/**
 * 参加会议
 * @param meetingId 会议id
 */
export const applyItem = (meetingId: number) => post(config.ATTEND_MEETING, { data: { meetingId }, msg: '报名成功' })

/**
 * 收藏会议
 * @param meetingId 会议id
 */
export const favoriteItem = (meetingId: number) => post(config.FAVORITE_MEETING, { data: { meetingId }, msg: '收藏成功' })

/**
 * 退出会议
 * @param meetingId 
 */
export const quitItem = (meetingId: number) => post(config.QUIT_MEETING + meetingId, { data: { type: 2 }, msg: '取消成功' })

/**
 * 取消收藏会议
 * @param meetingId
 */
export const quitFavorite = (meetingId: number) => post(config.QUIT_MEETING + meetingId, { data: { type: 3 }, msg: '取消成功' })

/**
 * 获取与自己相关的会议
 * @param type 1为创建,2为参加,3为收藏
 */
export const getUserRelatedItem = (type: number) => get(config._GET_USER_RELATED_MEET + type)

/**
 * 获取会议被参加、收藏的次数
 * @param meetingId
 * @param （2为参加 3为收藏）
 */
export const getRelatedCount = (meetingId: number, type: number) => get(config._GET_MEETING_STATUS_COUNT + type, { params: { meetingId } })

/**
 * 获取自己会议 被参加、收藏、申请志愿者的详细信息
 * @param meetingId 
 * @param type （2为参加 3为收藏）
 */
export const getRelatedInfo = (meetingId: number, type: number) => get(config._GET_USER_CREATED_MEET_INFO + type, { params: { meetingId } })