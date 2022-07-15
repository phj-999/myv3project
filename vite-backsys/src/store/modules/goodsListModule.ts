import { getGoodsList } from '@/request/api'
import { defineStore } from 'pinia'

export const useGoodsStore = defineStore({
  id: 'goodsLists',
  persist: true,
  state: () => ({
    goodsdata: []
  }),

  actions: {
    async getgoodsLists() {
      const res = await getGoodsList()
      this.goodsdata = res.data
    }
  }
})
