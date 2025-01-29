<script setup>
</script>

<template>
  <div class="fixed bottom-4 left-4 bg-white/80 text-black p-2 rounded-md w-[350px] animate-pulse">
  <div class="px-4 py-2 border-2 border-dashed border-primary">
    <h1 class="text-2xl font-bold text-center -mb-1">Mode développement</h1>
    <p class="text-lg text-center tracking-tight mb-2">Utilisateurs pré-enregistrés</p>
    
    <div class="mb-2">
      <p class="text-base font-medium tracking-wide underline">Administrateur</p>
      <p class="text-xs  tracking-tight">À accès au tableau de bord et toutes les opérations CRUD</p>
      <p class="text-sm tracking-wide">Adresse courriel: <span class=font-medium>admin@oasis.com</span></p>
      <p class="text-sm tracking-wide">Mot de passe: <span class=font-medium>password</span></p>
    </div>

    <div class="mb-2">
      <p class="text-base font-medium tracking-wide underline">Employé</p>
      <p class="text-xs  tracking-tight">À accès au tableau de bord mais ne peut rien supprimer</p>
      <p class="text-sm tracking-wide">Adresse courriel: <span class=font-medium>staff@oasis.com</span></p>
      <p class="text-sm tracking-wide">Mot de passe: <span class=font-medium>password</span></p>
    </div>

    <div class="mb-2">
      <p class="text-base font-medium tracking-wide underline">Client</p>
      <p class="text-xs  tracking-tight">Il n'a pas accès au tableau de bord</p>
      <p class="text-sm tracking-wide">Adresse courriel: <span class=font-medium>client@oasis.com</span></p>
      <p class="text-sm tracking-wide">Mot de passe: <span class=font-medium>password</span></p>
    </div>
  </div>
  </div>
</template>