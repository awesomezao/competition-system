// TODO: remember to set request
// TODO: remember to set UploadInput loadStatus

import React, {
  FormEvent,
  ReactElement,
  useState
} from 'react';

import { Spin, message } from 'antd';
import { useParams } from 'react-router-dom';
import { useImmer } from 'use-immer';

import Button from '@/components/commons/Button';
import Input from '@/components/forms/Input/Input';
import Textarea from '@/components/forms/Textarea';
import UploadInput from '@/components/forms/UploadInput'
import {
  applyItem,
  favoriteItem,
  getItemInfo,
  Iitem,
  quitFavorite,
  quitItem,
} from '@/services/apis/item';
import { uploadFiles, downloadFile, deleteMyFile } from '@/services/apis/files'
import {
  StarFilled,
  StarOutlined,
} from '@ant-design/icons';
import {
  useRequest,
  useUnmount,
} from '@umijs/hooks';
import { download } from '@/utils'
import { meetingTypes } from '@/constant'
import style from './Info.module.scss';

interface Props {
  type: number;
}
interface Iinfo extends Iitem {
  isFavorited: boolean;
  isApplied: boolean;
  files: {
    fileid: number;
    meetingid: number;
    path: string;
    name: string;
  }[]
}
function Info({ type }: Props): ReactElement {
  const { meetingId } = useParams()
  const _meetingId = Number(meetingId)
  const [roleType, setRoleType] = useState(0)
  const [fileStatus, setFileStatus] = useState(false)
  const [info, setInfo] = useImmer<Iinfo>({
    mName: '',
    startTime: '',
    introduction: '',
    organizer: '',
    communicate: '',
    schedule: '',
    isFavorited: false,
    isApplied: false,
    files: []
  })
  enum relationType {
    created = 1,// 创建的会议
    applied = 2,// 参加的会议
    favorited = 3,// 收藏的会议
  }
  enum btnStatus {
    applied = 'rgba(255,190,14,1)',// 已参加会议
    unApplied = 'rgba(255,190,14,1)',// 未参加会议
    appliedValue = '取消报名',
    unAppliedValue = '我要报名'
  }
  const meetingInfoR = useRequest((meetingId = _meetingId) => getItemInfo(meetingId), {
    onSuccess: (result, params) => {
      if (result.data) {
        const { relations, meeting, files } = result.data
        if (relations.includes(relationType.created)) {
          setRoleType(relationType.created)
        } else {
          setRoleType(0)
        }
        setInfo(draft => {
          draft.isFavorited = relations.includes(relationType.favorited)
          draft.isApplied = relations.includes(relationType.applied)
          draft.mName = meeting.mName
          draft.location=meeting.location
          draft.startTime = meeting.startTime
          draft.introduction = meeting.introduction
          draft.organizer = meeting.organizer
          draft.communicate = meeting.communicate
          draft.schedule = meeting.schedule
          draft.typeid = meeting.typeid
          draft.needvolunteer = meeting.needvolunteer
          draft.files = files.map((item: any) => {
            return {
              uid: item.fileid,
              name: item.name,
              meetingId: item.meetingid,
            }
          })
        })
      }
    }
  })

  const applyItemR = useRequest((meetingId = _meetingId) => applyItem(meetingId), {
    manual: true,
    onSuccess: (result, param) => {
      if (result && result.code >= 0) {
        setInfo(draft => { draft.isApplied = true })
      } else {
        setInfo(draft => { draft.isApplied = false })
      }
    }
  })
  const quitItemR = useRequest((meetingId = _meetingId) => quitItem(meetingId), {
    manual: true,
    onSuccess: (result, param) => {
      if (result && result.code >= 0) {
        setInfo(draft => { draft.isApplied = false })
      } else {
        setInfo(draft => { draft.isApplied = true })
      }
    }
  })
  const favoriteR = useRequest((meetingId = _meetingId) => favoriteItem(meetingId), {
    manual: true,
    onSuccess: (result, param) => {
      if (result && result.code >= 0) {
        setInfo(draft => { draft.isFavorited = true })
      } else {
        setInfo(draft => { draft.isFavorited = false })
      }
    }
  })
  const quitFavoriteR = useRequest((meetingId = _meetingId) => quitFavorite(meetingId), {
    manual: true,
    onSuccess: (result, param) => {
      if (result && result.code >= 0) {
        setInfo(draft => { draft.isFavorited = false })
      } else {
        setInfo(draft => { draft.isFavorited = true })
      }
    }
  })
  const downloadFileR = useRequest((meetingId, fileName) => downloadFile(meetingId, fileName), {
    manual: true,
    onSuccess: (result, params) => {
      if (result.code < 0) {
        message.error(result.message)
      } else {
        download(result, params[1])
      }
    }
  })


  const uploadFileR = useRequest((formData) => uploadFiles(formData), {
    manual: true,
    onSuccess: (result, params) => {
      console.log(result)

      if (result.code >= 0) {
        setFileStatus(true)
        message.success('上传成功')
      } else {
        setFileStatus(false)
      }
    }
  })
  const deleteMyFileR = useRequest((meetingId, fileId) => deleteMyFile(meetingId, fileId), {
    manual: true,
    onSuccess: (result, params) => {
      if (result.data) {
        setFileStatus(true)
        message.success('删除成功')
      } else {
        setFileStatus(false)
      }
    },
    onError: (error) => {
      setFileStatus(false)
    }
  })

  // 报名
  const handleApply = async (e: FormEvent) => {
    e.preventDefault()
    if (info.isApplied) {
      quitItemR.run()
    } else {
      applyItemR.run()
    }
  }

  // 收藏
  const handleFavorite = async () => {
    if (info.isFavorited) {
      quitFavoriteR.run()
    } else {
      favoriteR.run()
    }
  }


  return (
    <Spin spinning={meetingInfoR.loading}>
      <form className={style.container} onSubmit={handleApply}>
        <div className={style.header}>
          <h2 className={style.title}>{info.mName}</h2>
          {/* <Button type='submit' value={info.isApplied ? btnStatus.appliedValue : btnStatus.unAppliedValue} fontSize={10} color={btnStatus.unApplied} className={style.btn} loading={favoriteR.loading}/> */}
          <Button type='submit' value={info.isApplied ? btnStatus.appliedValue : btnStatus.unAppliedValue} fontSize={10} loading={info.isApplied ? quitItemR.loading : applyItemR.loading} size='small' />
          {info.isFavorited ? <StarFilled className={style.starFiled} onClick={handleFavorite} /> : <StarOutlined className={style.star} onClick={handleFavorite} />}
        </div>
        <Input type='text' name={info.typeid === meetingTypes.studentTeams ? '比赛时间' : '报名时间'} readOnly value={info.startTime} />
        <Input type='text' name={'地点'} readOnly value={info.location}/>
        <Textarea name={info.typeid === meetingTypes.studentTeams ? '比赛简介' : '项目简介'} readOnly value={info.introduction} />
        <Input type='text' name={info.typeid === meetingTypes.researchTeams ? '负责老师' : info.typeid === meetingTypes.studentTeams ? '队长' : '联系人'} readOnly value={info.organizer} />
        <Input type='text' name='联系方式' readOnly value={info.communicate} />
        {info.typeid === meetingTypes.studentTeams ? <Input type='text' name='招募人数' readOnly value={info.needvolunteer} /> : null}
        <Textarea name='报名要求' readOnly value={info.schedule} />
        <UploadInput
          name={'上传附件'}
          needUpload={roleType === relationType.created} defaultFileList={info.files}
          loadStatus={false}
          meetingId={_meetingId}
          uploadFile={uploadFileR.run}
          deleteFile={deleteMyFileR.run}
          downloadFile={downloadFileR.run}
          refresh={meetingInfoR.refresh} />
      </form>
    </Spin>
  )
}

export default Info


