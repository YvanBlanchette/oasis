<style scoped>
  input[type="number"]::-webkit-inner-spin-button, 
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  id: String,
  name: String,
  modelValue: {
    type: Number,
    default: 0
  },
  className: String,
  required: Boolean
})

const emit = defineEmits(['update:modelValue'])

const inputValue = ref(props.modelValue)

watch(inputValue, (newValue) => {
  emit('update:modelValue', newValue)
})

const increment = () => {
      inputValue.value++
}

const decrement = () => {
  if (inputValue.value > 0) {
    inputValue.value--;
  }
}
</script>

<template>
  <div class="flex items-center w-[150px]">
  <button type="button" @click="decrement" class="px-4 py-1 h-[40px] rounded-l-md text-neutral-500 bg-neutral-900/50 hover:text-neutral-300 text-lg">
    <i class="fa-solid fa-chevron-left"></i>
  </button>
    <input type="number" :id="id" :name="name" v-model="inputValue" class="text-neutral-100 bg-neutral-900/30 text-center focus:outline-none focus:ring-0 focus:ring-offset-0 w-full pb-1 px-2 h-[40px] pointer-events-none text-xl" :class="className">
    <button type="button" @click="increment" class="px-4 py-1 h-[40px] rounded-r-md text-neutral-500 bg-neutral-900/50 hover:text-neutral-300 text-lg">
      <i class="fa-solid fa-chevron-right"></i>
    </button>
  </div>
</template>