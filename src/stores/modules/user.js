import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUserMes } from '@/api/user'
export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const userMes = ref({})
    const setToken = (newToken) => {
      token.value = newToken
    }
    const clearToken = () => {
      token.value = ''
    }
    const getUserMessage = async () => {
      const data = await getUserMes()
      userMes.value = data.data.data
    }
    const setUserMes = (obj) => {
      userMes.value = obj
    }
    return { token, setToken, clearToken, userMes, getUserMessage, setUserMes }
  },
  {
    persist: true
  }
)
