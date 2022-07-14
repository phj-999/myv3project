import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'hello',
    component: () => import('@/components/HelloWorld.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home/Home.vue'),
    children: [
      {
        path: 'goods',
        name: 'gooods',

        meta: {
          isShow: true,
          title: '商品列表'
        },
        component: () => import('@/views/Home/cpns/goods/GoodsView.vue')
      },
      {
        path: 'user',
        name: 'user',

        meta: {
          isShow: true,
          title: '用户列表'
        },
        component: () => import('@/views/Home/cpns/user/UserView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
