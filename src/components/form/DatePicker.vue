<style scoped>
/* Styles the calendar picker icon */
input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(0.5);
  cursor: pointer;
}
</style>

<script setup>
defineProps({
  minDate: Date,
  inputValue: String,
  className: String,
  required: Boolean,
  id: String
});

defineEmits(['update:inputValue']);

  const today = new Date();
</script>

<template>
    <input
      :required="required"
      :id="id" type="date"
      class="bg-black/30
      text-white px-4 py-1 rounded-md h-[40px] w-[150px]"
      :value="inputValue"
      @input="$emit('update:inputValue', $event.target.value)"
      :min="`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`"
      :class="className"
    />
</template>
