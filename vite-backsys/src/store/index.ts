import { useGoodsStore } from './modules/goodsListModule'
import { useRolesStore } from './modules/roleMoudle'
import { useUserStore } from './modules/userModels'

const useStore = () => ({
  user: useUserStore(),
  goodsLists: useGoodsStore(),
  rolesLists: useRolesStore()
})

export default useStore
