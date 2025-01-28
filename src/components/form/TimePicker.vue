<style scoped>
/* Styles the calendar picker icon */
input[type="time"]::-webkit-calendar-picker-indicator {
  filter: invert(0.5);
  cursor: pointer;
}
</style>

<script setup>
defineProps({
  inputValue: String,
  className: String,
  required: Boolean,
  id: String
});
defineEmits(['update:inputValue'])
</script>

<template>
  <input
  :required="required"
  type="time"
  :id="id"
  :value="inputValue"
  @input="$emit('update:inputValue', $event.target.value)"
  min="09:00"
  max="18:00"
  step="900"
  class="bg-neutral-900/30 text-neutral-100 px-4 py-1 rounded-md h-[40px] w-[150px]" 
  :class="className"
/>
</template>
