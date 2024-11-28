<script setup lang="ts">
import { ref } from 'vue'
import type { Product } from '../types'

const inventory = ref<Product[]>([
  { id: 1, name: 'Product 1', price: 9.99, category: 'Category 1', stock: 10 },
  { id: 2, name: 'Product 2', price: 19.99, category: 'Category 2', stock: 15 },
])

const updateStock = (productId: number, newStock: number) => {
  const product = inventory.value.find(p => p.id === productId)
  if (product) {
    product.stock = newStock
  }
}
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold">Inventory Management</h1>
    <div class="bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3">Product</th>
              <th class="px-6 py-3">Category</th>
              <th class="px-6 py-3">Price</th>
              <th class="px-6 py-3">Stock</th>
              <th class="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in inventory" :key="product.id" class="border-b dark:border-gray-700">
              <td class="px-6 py-4">{{ product.name }}</td>
              <td class="px-6 py-4">{{ product.category }}</td>
              <td class="px-6 py-4">${{ product.price.toFixed(2) }}</td>
              <td class="px-6 py-4">
                <input
                  type="number"
                  v-model="product.stock"
                  class="w-20 rounded border-gray-300 dark:bg-gray-700"
                  min="0"
                  @change="updateStock(product.id, product.stock)"
                />
              </td>
              <td class="px-6 py-4">
                <button class="text-primary hover:text-primary-hover">Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>