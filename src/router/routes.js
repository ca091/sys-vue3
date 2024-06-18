import routesAccount from './account'
import routesMaterial from './material'

const Routes = [
  {
    path: '/',
    component: () => import('@/layout/Layout.vue'),
    redirect: 'home',
    meta: {nav: true, sort: 1},
    children: [
      {
        path: 'home',
        name: 'home',
        meta: {label: '首页', nav: true, icon: 'icon-saas-home'},
        component: () => import('@/views/Home.vue'),
      },
    ],
  },
  ...routesAccount,
  ...routesMaterial,
  {path: '/login', name: 'login', component: () => import('@/views/login/Login.vue')},
  {path: '/:path(.*)', name: 'notFound', component: () => import('@/views/other/NotFound.vue')},
]

export default Routes
