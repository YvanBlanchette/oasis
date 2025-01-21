<script setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

 
</script>
 
<template>
 <div class="w-full h-full min-h-screen flex flex-col justify-between">
    <Header />
    <slot />
    <Footer />
 </div>
</template>
