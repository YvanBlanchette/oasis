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
  className: String,
  cols: {
    type: Number,
    default: 30
  },
  rows: {
    type: Number,
    default: 2
  }
})

const emit = defineEmits(['update:modelValue'])

const inputValue = ref(props.modelValue)

watch(inputValue, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>

<template>
  <fieldset class="bg-transparent px-3 py-0.5 pb-1.5 border border-primary rounded-md w-[90%] mx-auto text-black" :class="className">
    <legend class="text-black text-start px-1 tracking-wide">{{ label }}</legend>
    <textarea :cols="cols" :rows="rows" noValidate :placeholder="placeholder" :id="id" :name="name" v-model="inputValue" class="bg-transparent focus:outline-none focus:ring-0 focus:ring-offset-0 w-full h-full  pb-1 px-2 placeholder:text-neutral-400 placeholder:font-light resize-none" :autocomplete="autocomplete"></textarea>
  </fieldset>
</template>