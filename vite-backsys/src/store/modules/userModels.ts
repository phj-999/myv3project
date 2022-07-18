import { defineStore } from 'pinia'
import { UserState } from '@/types/store/user'
import localCache from '@/utils/cache'
import { LoginFormInt } from '@/types/view/login/login'
import { loginRequest, roleListRequest, userListRequest } from '@/request/api'
/**
 *  1. 定义并导出容器
 *   参数1： 容器的 ID , 必须唯一， 将来 Pinia 会把所有的容器挂载到跟容器
 *   参数2： 选项对象
 *   返回值： 一个函数, 调用得到容器实例
 */
export const useUserStore = defineStore({
  id: 'userModel',

  state: (): UserState => ({
    token: localCache.getCache('token') || '',
    userList: [], //用户列表
    roleList: [] //角色列表
  }),

  persist: {
    key: 'user-key',
    // 该属性可以不写，不写的话默认是存储到sessionStorage里边，默认存储state里边的所有数据**
    // storage: window.localStorage,
    // 部分持久化状态的点符号路径数组，[]意味着没有状态被持久化(默认为undefined，持久化整个状态)
    paths: ['userList, roleList']
  },

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
    },
    // 用户列表
    async getuserListAction() {
      try {
        const userlistRes = await userListRequest()
        this.userList = userlistRes?.data
        // console.log(this.userList, 'this')
      } catch (error) {
        console.log(error)
      }
    },
    // 角色列表
    async getroleListAction() {
      try {
        const roleListRes = await roleListRequest()
        this.roleList = roleListRes.data
        // console.log(this.roleList, 'this')
      } catch (error) {
        console.log(error)
      }
    }
  }
})
