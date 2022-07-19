import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import localCache from '@/utils/cache'

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
    redirect: 'goods',
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
      },
      {
        path: 'role',
        name: 'role',

        meta: {
          isShow: true,
          title: '角色列表'
        },
        component: () => import('@/views/Home/cpns/role/Role.vue')
      },
      {
        path: 'authority',
        name: 'authority',

        meta: {
          isShow: false,
          title: '权限列表'
        },
        component: () => import('@/views/Home/cpns/role/cps/AuthorityView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token: string | null = localCache.getCache('token')
  if (!token && to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
})

export default router
