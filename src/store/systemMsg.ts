import { useState } from 'react'
import { createContainer } from "unstated-next"
import { getMessage, IuserMsg } from '@/services/apis/user'
import { useRequest } from '@umijs/hooks'

interface Imsg {
  content?: string;
  isread?: number;
  msgid?: number;
  sendfrom?: number;
  sendto?: number;
}


function useSystemMsg() {
  const [msgList, setMsgList] = useState<{ id?: number | string, title?: string,isRead?:boolean }[]>([])
  const msgListR = useRequest(getMessage, {
    manual:true,
    onSuccess: (result, params) => {
      if (result.data) {
        const list: IuserMsg[] = result.data.messages
        setMsgList(list.map((item: IuserMsg) => {
          return {
            id: item.msgid || '',
            title: item.content || '',
            isRead:item.isread!==-1
          }
        }))
      }
    }
  })
  return {msgList, loading:msgListR.loading,run:msgListR.run}
}

let systemMsg = createContainer(useSystemMsg)

export default systemMsg