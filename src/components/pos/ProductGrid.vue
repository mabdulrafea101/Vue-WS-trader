<script setup lang="ts">
import { ref } from 'vue'
import type { Product } from '../../types'
import ProductCard from './ProductCard.vue'

const products = ref<Product[]>([
  { id: 1, name: 'Product 1', price: 9.99, category: 'Category 1', stock: 10 },
  { id: 2, name: 'Product 2', price: 19.99, category: 'Category 2', stock: 15 },
  // Add more sample products
])

const emit = defineEmits(['add-to-cart'])

const addToCart = (product: Product) => {
  emit('add-to-cart', product)
}
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
      @add-to-cart="addToCart"
    />
  </div>
</template>