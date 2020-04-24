import React, { ReactElement } from 'react';

import {
  message,
  Spin,
} from 'antd';

import Button from '@/components/commons/Button';
import Input from '@/components/forms/Input/Input';
import Textarea from '@/components/forms/Textarea';
import { useChange } from '@/hooks';
import { publishItem } from '@/services/apis/item';
import { useRequest, useBoolean, useDebounceFn } from '@umijs/hooks';
import { meetingTypes } from '@/constant'
import style from './Team.module.scss';
import validate from '@/utils/validate';
import { useImmer } from 'use-immer'
interface Props {

}

function Team({ }: Props): ReactElement {
  const name = useChange('')
  const location = useChange('')
  const time = useChange('')
  const introduction = useChange('')
  const organizer = useChange('')
  const communicate = useChange('')
  const claim = useChange('')
  const validateRight = useBoolean(false)
  const [validateMsg, setValidateMsg] = useImmer({
    mName: { msg: '请输入项目名称', warn: false, isRight: false },
    location: { msg: '请输入地点', warn: false, isRight: false },
    startTime: { msg: '请输入时间', warn: false, isRight: false },
    introduction: { msg: '请输入项目介绍', warn: false, isRight: false },
  })
  const publishItemR = useRequest(publishItem, {
    manual: true,
    onSuccess: (result, params) => {
      if (result.code >= 0) {
        message.success('发布成功')
      }
    }
  })

  const validateForm = {
    validateName: () => {
      if (validate.required(name.value)) {
        setValidateMsg(draft => {
          draft.mName.msg = '请输入项目名称'
          draft.mName.warn = false
          draft.mName.isRight = true
        })
        return true
      } else {
        setValidateMsg(draft => {
          draft.mName.msg = '名称不能为空'
          draft.mName.warn = true
          draft.mName.isRight = false
        })
        return false
      }
    },
    validateLocation: () => {
      if (validate.required(location.value)) {
        setValidateMsg(draft => {
          draft.location.msg = '请输入地点'
          draft.location.warn = false
          draft.location.isRight = true
        })
        return true
      } else {
        setValidateMsg(draft => {
          draft.location.msg = '地点不能为空'
          draft.location.warn = true
          draft.location.isRight = false
        })
        return false
      }
    },
    validateStartTime: () => {
      if (validate.required(time.value)) {
        setValidateMsg(draft => {
          draft.startTime.msg = '请输入时间'
          draft.startTime.warn = false
          draft.startTime.isRight = true
        })
        return true
      } else {
        setValidateMsg(draft => {
          draft.startTime.msg = '时间不能为空'
          draft.startTime.warn = true
          draft.startTime.isRight = false
        })
        return false
      }
    },
    validateIntroduction: () => {
      if (validate.required(introduction.value)) {
        setValidateMsg(draft => {
          draft.introduction.msg = '请输入项目介绍'
          draft.introduction.warn = false
          draft.introduction.isRight = true
        })
        return true
      } else {
        setValidateMsg(draft => {
          draft.introduction.msg = '介绍不能为空'
          draft.introduction.warn = true
          draft.introduction.isRight = false
        })
        return false
      }
    },
  }

  const validateName = useDebounceFn(validateForm.validateName, 300)
  const validateLocation = useDebounceFn(validateForm.validateLocation, 300)
  const validateTime = useDebounceFn(validateForm.validateStartTime, 300)
  const validateIntroduction = useDebounceFn(validateForm.validateIntroduction, 300)

  const checkValidate = useDebounceFn(() => {
    if (validateMsg.mName.isRight && validateMsg.location.isRight && validateMsg.introduction.isRight) {
      validateRight.setTrue()
    } else {
      validateRight.setFalse()
    }
  }, 300)

  const handleSubmit = async (e: React.SyntheticEvent) => {

    e.preventDefault()
    if (validateRight.state) {
      publishItemR.run({
        mName: name.value,
        location: location.value,
        startTime: time.value,
        introduction: introduction.value,
        organizer: organizer.value,
        communicate: communicate.value,
        schedule: claim.value,
        typeid: meetingTypes.researchTeams,
      })
    }
  }
  const handleDate = (date: any, dateString: any) => {
    time.setValue(dateString)
  }
  return (
    <Spin spinning={publishItemR.loading}>
      <form className={style.container} onSubmit={handleSubmit} onInput={checkValidate.run}>
        <Input type='text' onInput={validateName.run} bind={name} name='项目名称' msg={validateMsg.mName.msg} warn={validateMsg.mName.warn} />
        <Input type='text' onInput={validateLocation.run} bind={location} name='地点' msg={validateMsg.location.msg} warn={validateMsg.location.warn} />
        <Input type='Date' onInput={validateTime.run} bind={time} name='报名时间' dateCallback={handleDate} msg={validateMsg.startTime.msg} warn={validateMsg.startTime.warn} />
        <Textarea onInput={validateIntroduction.run} bind={introduction} name='项目简介' msg={validateMsg.introduction.msg} warn={validateMsg.introduction.warn} />
        <Input type='text' bind={organizer} name='负责老师' />
        <Input type='text' bind={communicate} name='联系电话' />
        <Textarea bind={claim} name='报名要求' />
        {/* <UploadInput name='相关文档' /> */}
        <Button type='submit' value='确定' className={style.btn} disabled={!validateRight.state} loading={publishItemR.loading} />
      </form>
    </Spin>
  )
}

export default Team
