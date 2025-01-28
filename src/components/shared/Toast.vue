<script setup>
import { useToasterStore } from '@/stores/toaster'
import { computed } from 'vue'

const toasterStore = useToasterStore()

const isVisible = computed(() => toasterStore.isVisible)
const title = computed(() => toasterStore.title)
const message = computed(() => toasterStore.message)

const toastClass = computed(() => {
  switch (toasterStore.style) {
    case 'success':
      return 'border-l-8 border-green-500'
    case 'error':
      return 'border-l-8 border-red-600'
    case 'info':
      return 'border-l-8 border-blue-500'
    default:
      return 'border-l-8 border-gray-500'
  }
})
</script>

<template>
  <div v-if="isVisible" class="fixed bottom-4 right-4 bg-white/80 text-black p-4 rounded-md w-[400px]" :class="toastClass">
    <h1 class="text-2xl font-bold mb-2 animate-pulse">{{ title }}</h1>
    <p class="font-medium tracking-wide">{{ message }}</p>
  </div>
</template>