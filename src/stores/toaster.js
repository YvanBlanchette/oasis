import { defineStore } from 'pinia'

export const useToasterStore = defineStore('toaster', {
  state: () => ({
    isVisible: false,
    title: '',
    message: '',
    style: 'info',
  }),
  actions: {
    showToast(style, title, message) {
      this.isVisible = true
      this.title = title
      this.message = message
      this.style = style
      setTimeout(() => {
        this.isVisible = false
      }, 3000)
    },
  },
})