<style scoped>
.p-galleria-thumbnail {
  width: 116px;
  height: 80px;
  object-fit: cover;
  display: block;
  margin-top: 8px;
  margin-inline: 2px
}
</style>

<script setup>
import { ref, onMounted } from "vue";

//* Stores imports
import { useMainStore } from "@/stores/main";

//* Components imports
import { Galleria } from "primevue";


const images = ref();

const coordinates = useMainStore().coordinates;

onMounted(() => {
  const photos = [
    { itemImageSrc: '/images/galleria01.jpg', alt: 'Image 1', thumbnailImageSrc: '/images/galleria01.jpg' },
    { itemImageSrc: '/images/galleria02.jpg', alt: 'Image 2', thumbnailImageSrc: '/images/galleria02.jpg' },
    { itemImageSrc: '/images/galleria03.jpg', alt: 'Image 3', thumbnailImageSrc: '/images/galleria03.jpg' },
    { itemImageSrc: '/images/galleria04.jpg', alt: 'Image 4', thumbnailImageSrc: '/images/galleria04.jpg' },
    { itemImageSrc: '/images/galleria05.jpg', alt: 'Image 5', thumbnailImageSrc: '/images/galleria05.jpg' },
    { itemImageSrc: '/images/galleria06.jpg', alt: 'Image 6', thumbnailImageSrc: '/images/galleria06.jpg' },
    { itemImageSrc: '/images/galleria07.jpg', alt: 'Image 7', thumbnailImageSrc: '/images/galleria07.jpg' },
    { itemImageSrc: '/images/galleria08.jpg', alt: 'Image 8', thumbnailImageSrc: '/images/galleria08.jpg' },
    { itemImageSrc: '/images/galleria09.jpg', alt: 'Image 9', thumbnailImageSrc: '/images/galleria09.jpg' },
    { itemImageSrc: '/images/galleria10.jpg', alt: 'Image 10', thumbnailImageSrc: '/images/galleria10.jpg' },
    { itemImageSrc: '/images/galleria11.jpg', alt: 'Image 11', thumbnailImageSrc: '/images/galleria11.jpg' },
  ];
  images.value = photos;
});

const responsiveOptions = ref([
    {
        breakpoint: '1300px',
        numVisible: 4
    },
    {
        breakpoint: '575px',
        numVisible: 1
    }
]);

</script>
 
<template>
 <section id="contact" class="bg-neutral-100 text-neutral-900 w-full h-full min-h-[300px] py-12">
   <h2 class="text-5xl uppercase text-center tracking-wide font-bold pb-12">Auberge du Lac de la Montagne</h2>
  <div class="w-[90%] max-w-7xl mx-auto h-full text-center grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <h1 class="text-4xl uppercase text-left font-bold tracking-wide pb-6">Nous Joindre</h1>
      <p class="text-left">Nous sommes ravis de vous accueillir à l'Auberge du Lac de la Montagne ! Si vous avez des questions, des commentaires ou souhaitez simplement réserver votre séjour, nous sommes à votre écoute. Notre équipe dévouée est prête à répondre à vos besoins et à vous aider à planifier votre prochaine aventure au bord du lac. N'hésitez pas à nous contacter par téléphone ou par courriel.</p>

      <img src="@/assets/images/bar.svg" class="mx-auto my-8 w-52">

      <h2 class="text-xl font-bold text-start uppercase tracking-wide pb-2">Coordonnées</h2>
      <a href="https://maps.app.goo.gl/ab15vzEwabKPp3SBA" target="_blank" class="w-fit hover:text-[#F4C887] transition-all duration-200 text-neutral-900 flex items-start gap-2 text-left"><i class="fa-solid fa-map-location-dot text-xl"></i> {{ coordinates.address.street }}, {{ coordinates.address.city }},<br /> {{ coordinates.address.province }}, {{ coordinates.address.postalCode }}</a>
      <a href="tel:{{ coordinates.phone }}" target="_blank" class="w-fit hover:text-[#F4C887] transition-all duration-200 text-neutral-900 flex items-start gap-2 text-left pt-2"><i class="fa-solid fa-phone text-xl"></i> {{ coordinates.phone }}</a>
      <a href="tel:{{ coordinates.fax }}" target="_blank" class="w-fit hover:text-[#F4C887] transition-all duration-200 text-neutral-900 flex items-start gap-2 text-left pt-2"><i class="fa-solid fa-fax text-xl"></i> {{ coordinates.fax }}</a>
      <a href="mailto:{{ coordinates.email }}" target="_blank" class="w-fit hover:text-[#F4C887] transition-all duration-200 text-neutral-900 flex items-start gap-2 text-left pt-2"><i class="fa-solid fa-envelope text-xl"></i> {{ coordinates.email }}</a>
    </div>
    
    <div class="card">
        <Galleria :value="images" :responsiveOptions="responsiveOptions" :numVisible="5" containerStyle="border: 0;">
            <template #item="slotProps">
                <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 640px; height: 400px" />
            </template>
            <template #thumbnail="slotProps">
                <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" class="p-galleria-thumbnail" />
            </template>
        </Galleria>
    </div>
  </div>
  </section>
</template>
