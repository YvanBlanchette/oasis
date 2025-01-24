<script setup>
import DashboardHeader from '@/components/DashboardHeader.vue';
import Toast from '@/components/Toast.vue'
</script>
 
<template>
 <div class="w-full h-full min-h-screen flex justify-between">
    <DashboardSidebar />
    <div class="w-full h-full flex flex-col">
      <DashboardHeader />
      <RouterView />
      <Toast ref="toast" />
    </div>
 </div>
</template>
