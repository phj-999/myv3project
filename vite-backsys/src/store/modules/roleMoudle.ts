import { defineStore } from 'pinia'
import { roledatatype } from '@/types/store/role'
import { piniaPersistConfig } from '../config/persist'
import { roleListRequest } from '@/request/api'

export const useRolesStore = defineStore({
  id: 'roleModel',

  state: (): roledatatype => ({
    roleList: [] //角色列表
  }),

  persist: piniaPersistConfig('role-key'),

  actions: {
    // 角色列表
    async getroleListsAction() {
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
