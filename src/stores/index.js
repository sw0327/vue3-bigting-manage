import { createPersistedState } from 'pinia-plugin-persistedstate'
import { createPinia } from 'pinia'

const pinia = createPinia()
pinia.use(createPersistedState)
export default pinia

export * from '@/stores/modules/user'
