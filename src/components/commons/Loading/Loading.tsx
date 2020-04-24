/**
 * @ Author: zao
 * @ Create Time: 2020-03-19
 * @ Modified by: zao
 * @ Description: 封装antd的Spin，主要用于路由加载的fallback
 */

import React from 'react';

import { Spin } from 'antd';

import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;


const LoadingPage = () => (
  <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
    <Spin indicator={antIcon} />
  </div>
);

export default LoadingPage;