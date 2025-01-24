<script setup>
 import { ref, watch } from 'vue';

const props = defineProps({
  id: String,
  name: String,
  modelValue: String,
  label: String,
  className: String,
  options: Array,
  selected: Boolean
})

const emit = defineEmits(['update:modelValue'])

const inputValue = ref(props.modelValue)

watch(inputValue, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>
 
<template>
   <fieldset class="bg-transparent px-3 py-0.5 pb-1.5 border border-primary rounded-lg w-[90%] mx-auto text-white" :class="className">
    <legend class="text-primary text-start px-1 tracking-wide">{{ label }}</legend>
    <select novalidate :id="id" :name="name" v-model="inputValue" class="bg-transparent focus:outline-none focus:ring-0 focus:ring-offset-0 w-full h-full  pb-1 px-2 placeholder:text-neutral-300">
      <option :selected="selected" v-for="option in options" :key="option.value" :value="option.value">
        {{ option.name }}
      </option>
    </select>
  </fieldset>
</template>
