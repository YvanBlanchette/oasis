<script setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Toast from '@/components/Toast.vue';

 
</script>
 
<template>
 <div class="w-full h-full min-h-screen flex flex-col justify-between">
    <Header />
    <slot />
    <Footer />
    <Toast ref="toast" />
 </div>
</template>
