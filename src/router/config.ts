import { lazy} from 'react';

import BasicLayout from '@/layouts/BasicLayout';
import LoginLayout from '@/layouts/LoginLayout'
import CenterLayout from '@/layouts/CenterLayout';

import { Iroute } from '@/utils/renderRoutes.tsx'

const config: Iroute[] =
  [
    {
      path: '/',
      component: BasicLayout,
      childRoutes: [
        {
          path: '/',
          exact:true,
          name: '首页',
          component: lazy(() => import('@/pages/Home')),
        },
        {
          path: '/recruit',
          name: '招募人员',
          component:lazy(()=>import('@/pages/Recruit'))
        },
        {
          path: '/awesome',
          name: '精彩幻灯',
          component:lazy(()=>import('@/pages/Awesome'))
        },
        {
          path: '/related',
          name: '与我相关',
          component:lazy(()=>import('@/pages/Related'))
        },
        {
          path: '/login',
          name: '登录/注册',
          component: LoginLayout,
          childRoutes: [
            {
              path: '/login',
              exact:true,
              name: '短信登陆/注册',
              component:lazy(()=>import('@/pages/Login/Msg'))
            },
            {
              path: '/login/pwd',
              name: '密码登陆',
              component:lazy(()=>import('@/pages/Login/Pwd'))
            }
          ]
        },
        {
          path: '/signup',
          name: '注册',
          component:lazy(()=>import('@/pages/Signup'))
        },
        {
          path: '/center',
          name: '个人中心',
          component: CenterLayout,
          childRoutes: [
            {
              path: '/center',
              exact:true,
              name: '个人资料',
              component: lazy(() => import('@/pages/Center/Info')),
            },
            {
              path: '/center/favorite',
              name: '我的收藏',
              component: lazy(() => import('@/pages/Center/Favorite')),
            },
            {
              path: '/center/message',
              name: '系统消息',
              component: lazy(() => import('@/pages/Center/Message')),
            },
          ],
        },
        {
          path: '/exception',
          name: '异常页',
          childRoutes: [
            {
              path: '/exception/403',
              name: '403',
              component: lazy(() => import('@/pages/Exception/403')),
            },
            {
              path: '/exception/404',
              name: '404',
              exact: true,
              component: lazy(() => import('@/pages/Exception/404')),
            },
            {
              path: '/exception/500',
              name: '500',
              component: lazy(() => import('@/pages/Exception/500')),
            },
          ],
        },
        { path: '*', exact: true, redirect: '/exception/404' },
      ],
    },
  ]


export default config;
