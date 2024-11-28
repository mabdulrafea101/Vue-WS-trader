<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <div class="text-center">
    <h1 class="text-4xl font-bold mb-8">Welcome to Vue</h1>
    <div class="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md dark:bg-gray-800">
      <button type="button" @click="count++" class="text-white bg-primary hover:bg-primary-hover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-blue-800">
        Count is {{ count }}
      </button>
      <p class="mt-4 text-gray-600 dark:text-gray-300">
        Edit <code class="text-sm font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">views/HomeView.vue</code> to test HMR
      </p>
    </div>
  </div>
</template>