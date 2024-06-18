const routes = [
  {
    path: '/material',
    component: () => import('@/layout/Layout.vue'),
    redirect: 'word',
    meta: {label: '资料管理', nav: true, sort: 3, icon: 'icon-saas-shoucang'},
    children: [
      {
        path: 'word',
        name: 'materialWord',
        meta: {label: '文档管理', nav: true, icon: 'icon-saas-wendang'},
        component: () => import('@/views/material/Word.vue'),
      },
      {
        path: 'video',
        name: 'materialVideo',
        meta: {label: '音视频管理', nav: true, icon: 'icon-saas-yuyin'},
        component: () => import('@/views/material/Video.vue'),
      },
    ],
  },
]

export default routes
