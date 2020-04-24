import React from 'react'
import { Modal, Button } from 'antd';
import { useHistory } from 'react-router-dom'
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

export default function useAuthModal() {
  const history = useHistory()
  confirm({
    title: '若要进行此操作请先登录!',
    icon: <ExclamationCircleOutlined />,
    // content: 'Some descriptions',
    onOk() {
      history.push('/login')
    },
    // onCancel() {
    //   return -1
    // },
  });
}