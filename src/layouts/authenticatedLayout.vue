<script setup>
import Header from '@/components/shared/Header.vue';
import Footer from '@/components/shared/Footer.vue';
import Toast from '@/components/shared/Toast.vue';

 
</script>
 
<template>
 <div class="w-full h-full min-h-screen flex flex-col justify-between">
    <Header />
    <slot />
    <Footer />
    <Toast ref="toast" />
 </div>
</template>
