/**
 * @ Author: zao
 * @ Create Time: 2020-03-23
 * @ Modified by: zao
 * @ Description: 封装的antd的上传文件组件
 * TODO: remember to change the action url
 */

import React, {
  ReactElement,
  useState,
  FormEvent,
} from 'react';

import { Upload, Spin } from 'antd';
import { UPLOAD_FILE } from '@/services/apis/config'
import { uploadFiles } from '@/services/apis/files'
import { useRequest, useUpdate } from '@umijs/hooks'
import { useOnUpdate } from '@/hooks'
import { CloseOutlined, DownloadOutlined } from '@ant-design/icons'

import style from './UploadInput.module.scss';

interface Ifile {
  uid?: string;      // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
  name?: string;   // 文件名
  meetingId?: string;
  status?: 'uploading|error|done|removed'; // 状态有：uploading done error removed
  response?: any, // 服务端响应内容
}

interface Props {
  name?: string;
  needUpload?: boolean;
  defaultFileList?: Ifile[];
  loadStatus?: boolean;
  isLoadSucess?: boolean;
  meetingId?: number;
  refresh?: () => any;
  uploadFile?: (...params: any) => any;
  deleteFile?: (...params: any) => any;
  downloadFile?: (...params: any) => any;
}
// 
function UploadInput({ name, meetingId, needUpload = true, loadStatus = false, isLoadSucess = true, defaultFileList = [], uploadFile = () => { }, deleteFile = () => { }, downloadFile = () => { }, refresh = () => { } }: Props): ReactElement {
  enum uploadStatus {
    success = '#1890ff',
    error = '#ff4d4f',
    normal = '#000000'
  }
  const handleChange = async (e: any) => {
    e.preventDefault()
    if (needUpload) {
      let file = new FormData()
      file.append('file', e.target.files[0])
      file.append('meetingId', String(meetingId))
      await uploadFile(file)
      if (isLoadSucess) {
        refresh()
      }
    }
  }
  return (
    <div className={style.container}>
      {needUpload ? <label className={style.uploadContainer} onChange={handleChange}>
        <input type='file' />
        <div className={style.upload}>
          <span className={style.name}>{name}</span>
          <div className={style.input}>+添加附件</div>
        </div>
      </label> : <></>}


      <ul className={style.fileList}>
        {defaultFileList.map(item => {
          return <li key={item.uid}>
            <span className={style.tt} style={{ color: uploadStatus.success }}>{item.name}</span>
            {needUpload ?
              <div className={style.actionBar}>
                <DownloadOutlined title='下载文件' onClick={() => downloadFile(item.meetingId, item.name)} />
                <CloseOutlined title='删除文件' onClick={() => deleteFile(item.uid, item.meetingId)} />
              </div> :
              <div className={style.actionBar}>
                <DownloadOutlined title='下载文件' onClick={() => downloadFile(item.meetingId, item.name)} />
              </div>}
          </li>
        })}
      </ul>

    </div >
  )
}

export default UploadInput
