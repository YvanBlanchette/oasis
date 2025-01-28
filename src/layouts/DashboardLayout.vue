<script setup>
//*-------------------- Imports --------------------*//
// Components imports
import Toast from '@/components/shared/Toast.vue'
import DashboardHeader from '@/components/dashboard/DashboardHeader.vue';
import DashboardFooter from '@/components/dashboard/DashboardFooter.vue';
</script>
 
<template>

 <div class="w-full h-screen flex justify-between overflow-hidden">
    <DashboardSidebar />
    <div class="w-full h-full flex flex-col justify-between items-center">
      <DashboardHeader />
      <slot />
      <DashboardFooter />
    </div>
    <Toast ref="toast" />
 </div>
</template>
