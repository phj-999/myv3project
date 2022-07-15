import { useGoodsStore } from './modules/goodsListModule'
import { useUserStore } from './modules/userModels'

const useStore = () => ({
  user: useUserStore(),
  goodsLists: useGoodsStore()
})

export default useStore
