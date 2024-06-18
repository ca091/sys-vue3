const routes = [
  {
    path: '/acc',
    component: () => import('@/layout/Layout.vue'),
    redirect: 'info',
    meta: {label: '账户管理', nav: true, sort: 6, icon: 'icon-saas-shezhi'},
    children: [
      {
        path: 'info',
        name: 'accInfo',
        meta: {label: '账户信息', nav: true, icon: 'icon-saas-zhanghu'},
        component: () => import('@/views/account/Info.vue'),
      },
      {
        path: 'home',
        name: 'accHome',
        meta: {label: '个人主页', nav: true, icon: 'icon-saas-wodeguanzhu'},
        component: () => import('@/views/account/UserHome.vue'),
      },
    ],
  },
]

export default routes
