import React, { ReactElement,useState } from 'react'

import { Upload } from 'antd';

import style from './UploadInputUI.module.scss'

interface Ifile{
  uid: string;      // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
  name: string;   // 文件名
  status: 'uploading|error|done|removed'; // 状态有：uploading done error removed
  response: any, // 服务端响应内容
}

interface Props {
  name: string;
}
// TODO:remember to change the action url
function UploadInput({name }: Props): ReactElement {
  const [fileList, setFileList] = useState<any>()

  const handleChange = (e:any) => {
    let fileList = [...e.fileList];
    // fileList = fileList.slice(-2);

    fileList = fileList.map(file => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });
    setFileList(fileList)
  }
  const props = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange: handleChange,
    multiple: true,
  };

  return (
    <div className={style.container}>
      <Upload {...props} fileList={fileList} className={style.antdUpload}>
        <div className={style.upload}>
          <span className={style.name}>{name}</span>
          <div className={style.input}>+添加附件</div>
        </div>
      </Upload>
    </div>
  )
}

export default UploadInput
