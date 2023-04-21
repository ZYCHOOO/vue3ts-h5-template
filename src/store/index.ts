import { ref } from 'vue'
import { defineStore } from 'pinia'

export const testStore = defineStore('test', () => {
  const count = ref(0)

  const update = () => count.value++

  const setCount = (val: number) => {
    count.value = val
  }

  return { count, update, setCount }
}, {
  persist: true
})