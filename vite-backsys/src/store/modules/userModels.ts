import { defineStore } from 'pinia'
import { UserState } from '@/types/store/user'
import localCache from '@/utils/cache'
import { LoginFormInt } from '@/views/login/types'
import { loginRequest } from '@/request/api'
/**
 *  1. 定义并导出容器
 *   参数1： 容器的 ID , 必须唯一， 将来 Pinia 会把所有的容器挂载到跟容器
 *   参数2： 选项对象
 *   返回值： 一个函数, 调用得到容器实例
 */
export const useUserStore = defineStore({
  id: 'userModel',

  state: (): UserState => ({
    token: localCache.getCache('token') || ''
  }),

  actions: {
    //登录
    async loginAction(accountdata: LoginFormInt) {
      try {
        //const { username, password } = accountdata
        const loginRes = await loginRequest(accountdata)
        //   this.token = loginRes.data?.token
        localCache.setCache('token', loginRes.data?.token)
      } catch (error) {
        console.log(error)
      }
    }
  }
})
