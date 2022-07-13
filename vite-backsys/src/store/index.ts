import { useUserStore } from './modules/userModels'

const useStore = () => ({
  user: useUserStore()
})

export default useStore
