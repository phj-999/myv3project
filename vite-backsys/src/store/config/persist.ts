import { PersistedStateOptions } from 'pinia-plugin-persistedstate'

export const piniaPersistConfig = (key: string, paths?: Array<string>) => {
  const persist: PersistedStateOptions = {
    key,
    storage: window.localStorage,
    paths
  }
  return persist
}
