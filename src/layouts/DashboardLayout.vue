<script setup>
import DashboardHeader from '@/components/DashboardHeader.vue';
</script>
 
<template>
 <div class="w-full h-full min-h-screen flex justify-between">
    <DashboardSidebar />
    <div class="w-full h-full flex flex-col">
      <DashboardHeader />
      <RouterView />
    </div>
 </div>
</template>
