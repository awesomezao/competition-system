import React, { ReactElement,useState } from 'react';

import { Spin, Collapse} from 'antd';

import systemMsgContainer from '@/store/systemMsg';
import style from './Message.module.scss';

interface Props {

}

interface ImessageHeader{
  isRead?: boolean;
  content?: string;
}

function MessageHeader({isRead,content}:ImessageHeader):ReactElement {
  return (
    <div className={style.msgHeader}>
      {isRead?null:<div className={style.msgDot}></div>}
      <div className={style.msgContent}>{content}</div>
    </div>
  )
}

function Message({ }: Props): ReactElement {
  const systemMsg = systemMsgContainer.useContainer()
  const {Panel}=Collapse
  return (
    <Spin spinning={systemMsg.loading} wrapperClassName={style.container}>
      <Collapse bordered={false} className={style.collapse} expandIconPosition='right'>
         {systemMsg.msgList.map((item) => {
        return (
          <Panel key={item.id as any} header={<MessageHeader isRead={item.isRead} content={item.title}/>} className={style.item}>
            {item.title}
          </Panel>
        )
      })}
      </Collapse>
    </Spin>
  )
}

export default Message
