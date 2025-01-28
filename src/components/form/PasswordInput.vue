<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'password'
  },
  placeholder: String,
  id: String,
  name: String,
  modelValue: String,
  label: String,
  className: String
})

const emit = defineEmits(['update:modelValue'])

const inputValue = ref(props.modelValue)

const type = ref(props.type)

const toggleType = () => {
  type.value = type.value === 'password' ? 'text' : 'password';
}

watch(inputValue, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>

<template>
  <fieldset class="relative bg-transparent px-3 py-0.5 pb-1.5 border border-primary rounded-lg w-[90%] mx-auto" :class="className">
    <legend class="text-black text-start px-1 tracking-wide">{{ label }}</legend>
    <input novalidate autocomplete="current-password" :type="type" :placeholder="placeholder" :id="id" :name="name" v-model="inputValue" class="bg-transparent focus:outline-none focus:ring-0 focus:ring-offset-0 w-full h-full text-black pb-1 px-2 placeholder:text-neutral-400  placeholder:font-light">
    <button v-tooltip.top="'Afficher le mot de passe'" @click="toggleType" type="button" class="absolute right-6 top-1/2 -translate-y-3/4 text-primary">
      <i v-if="type === 'password'" class="fa-solid fa-lock"></i> <i v-else class="fa-solid fa-lock-open"></i>
    </button>
  </fieldset>
</template>