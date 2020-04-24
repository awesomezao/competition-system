// 以_开头的为get请求方式

/**
 * 用户信息处理接口
 */
export const SIGINUP = '/signup'; // 用户注册
export const LOGIN = '/login'; // 登录获取token
export const _GET_USER_INFO = '/info'; // 获取当前登录用户信息
export const GET_USER_PUBLICINFO = '/publicInfo'; // 获取用户公开信息
export const GET_USER_VERIFICATION_CODE = '/verificationCode'; // 获取登录验证码
export const UPDATA_USER_INFO = '/update'; // 修改用户信息
export const UPDATA_USER_PASSWORD = '/updatePwd'; // 修改密码

/**
 * component
 * 获取用户通知接口
 */
export const _GET_USER_NOTIFICATION = '/getMessage'; // 获取用户通知操作接口

/**
 * 用户与会议的交互接口
 */
export const _GET_USER_CREATED_MEET_INFO = '/meetPreference/'; // 获取自己会议被参加、收藏、申请志愿者的详细信息，{type}路径，2为参加，3为收藏
export const _GET_USER_RELATED_MEET = '/my/meet/'; // 获取与自己相关的会议信息,{type}路径,1为创建,2为参加,3为收藏
export const _GET_MY_FAVORITE='/my/meet/3'
export const ATTEND_MEETING = '/preference/2'; // 参加会议
export const FAVORITE_MEETING = '/preference/3'; // 收藏会议
export const QUIT_MEETING = '/quit/'; //{meetingId}路径,{type}参数,2为参加，3为收藏
export const _GET_MEETING_STATUS_COUNT = '/statistics/'; // {types}路径，2为参加，3为收藏

/**
 * 会议主题图操作接口
 */
export const _GET_MEETING_ICON = '/meetingIcon/'; // {meetingId}路径
export const UPLOAD_MEETING_ICON = '/meetingIcon/'; // {meeting}路径

/**
 * 会议相关接口
 */
export const PUBLISH_MEETING = '/meeting/add'; // 发布会议
export const ADD_MEETING_INFO = '/meeting/put'; // 添加会议信息(文本部分)
export const _GET_MEETING_INFO = '/meeting/'; // {meetingId}路径,根据会议id得到会议详细信息
export const _GET_MEETING_TYPE = '/meetingTypes';
export const _SEARCH_MEETING_CONFITION = '/meetings/dy'; // 根据条件查询会议
export const _GET_MEETING_HOME_PAGE_DATA = '/meetings/home'; // 会议首页分页会议数据
export const _GET_MEETING_Time_Sort_PAGE_DATA = '/meetings/orderByStart'; // 会议首页分页会议数据
export const _GET_MY_MEETINGS = '/meetings/my'; // 根据id得到和我相关的会议
export const _GET_MY_MEETINGS_MODE = '/meetings/my/'; // {mode}路径

/**
 * 会议相关文档操作接口
 */
export const d_DELETE_MEETING_FILE = '/file'; // 删除一个会议相关文件
export const _DOWNLOAD_DILE = '/file'; // 下载一个文件
export const UPLOAD_FILE = '/file'; // 上传一个会议相关文件
export const _GET_FILE_LIST = '/fileList'; // 获取会议相关的文件ID列表
export const UPLOAD_USER_IMG = '/uploadimg'; // 上传用户头像
export const _GET_USER_ICON = '/userIcon/'; // {filename}路径,文件名

/**
 * 会议的资源活动相关接口
 */
export const PUBLISH_VOLUNT_ACTIVITY = '/addVolunt'; // 创建者发布会议相关的志愿活动
export const SEND_VOLUNT_BROADCAST = '/broadcast/'; //会议组织者向志愿者发送广播信息,{mettingId}路径
export const _VIEW_MEETING_ASSOCIATE_VOLUNTEER = '/joinVolunteer/'; // 会议发起者查看，会议-志愿关系的关联,{meetingId}路径
export const JOIN_VOLUNTEER = '/joinVolunteer/'; // 用户申请志愿者,{meetingId}路径
export const MODIFY_VOLUNT_INFO = '/volunt'; // 创建者更改会议志愿活动信息
export const _GET_VOLUNT_FULL_INFO = '/volunt/info'; // 获取会议志愿活动具体的工作内容信息,{meetingId}
export const _GET_VOLUNT_INFO = '/volunt/'; // 获取会议志愿活动信息,{meetingId}路径
export const _VIEW_VOLUNTEER_INFO = '/volunteer/info/'; // 会议发起者查看申请志愿者的详细信息,{meetingId}路径
export const REVIEW_VOLUNTEER = '/volunteerStatus/'; //会议组织者通过或拒绝志愿者请求,{meetingId}路径

/**
 * 会议志愿工作接口
 */
export const _GET_MY_VOLUNT_ACTIVITY = '/task/my'; // 用户获取自己申请的志愿志愿者活动信息表
export const ADD_VOLUNT_TASKS = '/tasks/add/'; // {meetingId}路径
export const _GET_ALL_VOLUNT_TASKS = '/tasks/all/'; // {meetingId}路径
export const _GET_USER_APPLICATION_VOLUNT_FULL_INFO = '/tasks/my/all'; // 获取用户申请的志愿工作详情

/**
 * 会议嘉宾操作接口
 */
export const ADD_GUEST = '/guest'; // 增加嘉宾信息
export const d_DELETE_GUEST = '/guest/'; // 会议发起者删除嘉宾,{meetingId}路径
export const _GET_GUEST_INFO = '/guest/'; // 获取嘉宾信息(文本),{meetingId}路径
export const _GET_GUEST_IMG = '/guestImg/'; // 获取嘉宾头像,{avatarUrl}路径
export const MODIFY_GUEST_INFO = '/updateGuest'; // 修改嘉宾信息
