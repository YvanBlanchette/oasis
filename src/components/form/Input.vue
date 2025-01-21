<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'text'
  },
  autocomplete: String,
  placeholder: String,
  id: String,
  name: String,
  modelValue: String,
  label: String,
  className: String
})

const emit = defineEmits(['update:modelValue'])

const inputValue = ref(props.modelValue)

watch(inputValue, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>

<template>
  <fieldset class="bg-transparent px-3 py-0.5 pb-1.5 border border-[#F4C887] rounded-lg w-[90%] mx-auto" :class="className">
    <legend class="text-[#F4C887] text-start px-1 tracking-wide">{{ label }}</legend>
    <input novalidate  :type="type" :placeholder="placeholder" :id="id" :name="name" v-model="inputValue" class="bg-transparent focus:outline-none focus:ring-0 focus:ring-offset-0 w-full h-full text-white pb-1 px-2 placeholder:text-neutral-300" :autocomplete="autocomplete">
  </fieldset>
</template>