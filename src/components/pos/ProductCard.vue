<script setup lang="ts">
import type { Product } from '@/types'

const props = defineProps<{
  product: Product
}>()

const emit = defineEmits(['add-to-cart'])
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-4 dark:bg-gray-800">
    <h3 class="text-lg font-semibold mb-2">{{ product.name }}</h3>
    <p class="text-gray-600 dark:text-gray-300">${{ product.price.toFixed(2) }}</p>
    <p class="text-sm text-gray-500 dark:text-gray-400">Stock: {{ product.stock }}</p>
    <button
      @click="emit('add-to-cart', product)"
      class="mt-4 w-full bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded"
      :disabled="product.stock === 0"
    >
      Add to Cart
    </button>
  </div>
</template>