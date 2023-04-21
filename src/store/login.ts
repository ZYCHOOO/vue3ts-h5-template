import { ref } from 'vue'
import { defineStore } from 'pinia'

export const loginStore = defineStore('login', () => {
  const token = ref<string>('')

  const setToken = (val: string) => {
    token.value = val
  }

  const resetToken = () => {
    token.value = ''
  }

  return { token, setToken, resetToken }
}, {
  persist: true
})