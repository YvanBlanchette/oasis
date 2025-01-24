<script setup>
inheritAttrs: false
</script>

<template>
   <!-- Overlay -->
   <div class="fixed inset-0 bg-neutral-100/20 backdrop-blur-sm w-full h-full" />

   <!-- Modal -->
   <div
      class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] z-50 rounded-lg flex items-center justify-center bg-neutral-900/80 p-8">
      <slot />
   </div>
</template>
