<script setup lang="ts">
import { ref } from 'vue'
import ProductGrid from '../components/pos/ProductGrid.vue'
import Cart from '../components/pos/Cart.vue'
import type { Product } from '@/types'

const cartRef = ref<InstanceType<typeof Cart> | null>(null)
const customerName = ref('')
const customerPhone = ref('')

const handleAddToCart = (product: Product) => {
  cartRef.value?.addToCart(product)
}
</script>

<template>
  <div class="flex flex-col lg:flex-row gap-6">
    <div class="lg:w-3/4">
      <!-- Customer Information -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-xl font-bold mb-4">Customer Information</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Customer Name</label>
            <input
              v-model="customerName"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-700"
              placeholder="Enter customer name"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
            <input
              v-model="customerPhone"
              type="tel"
              class="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-700"
              placeholder="Enter phone number"
            />
          </div>
        </div>
      </div>

      <!-- Products Grid -->
      <ProductGrid @add-to-cart="handleAddToCart" />
    </div>

    <!-- Cart Section -->
    <div class="lg:w-1/4">
      <Cart ref="cartRef" />
    </div>
  </div>
</template>