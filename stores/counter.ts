import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
    name: 'Eduardo',
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    },
    reset() {
      this.count = 0
    },
    async simulateAsyncAction() {
      // 模拟异步操作
      await new Promise(resolve => setTimeout(resolve, 1000))
      this.count += 10
    }
  },
})
