<script setup lang="ts">
import NavBar from '../components/NavBar.vue'
import Footer from '../components/Footer.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <NavBar />
    <main class="flex-grow container mx-auto px-4 py-8">
      <slot />
    </main>
    <Footer />
  </div>
</template>