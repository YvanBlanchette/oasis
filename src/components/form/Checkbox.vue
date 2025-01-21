<script setup>
 const props = defineProps({
   type: {
     type: String,
     default: 'text'
   },
   placeholder: String,
   id: String,
   name: String,
   modelData: String,
   label: String,
   class: String
 })

</script>
 
<template>
  <label :for="id" class="flex w-full items-center gap-2" :class="class">
    <input type="checkbox" :id="id" :name="name" :v-model="modelData" class="bg-transparent text-white" />
    {{ label }}
  </label>
</template>
