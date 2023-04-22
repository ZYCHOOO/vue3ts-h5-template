import { ref } from 'vue'
import { defineStore } from 'pinia'

export const testStore = defineStore('test', () => {
  const test = ref(0)

  const update = () => test.value++

  const setTest = (val: number) => {
    test.value = val
  }

  return { test, update, setTest }
}, {
  persist: true
})
