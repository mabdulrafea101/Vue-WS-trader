<script setup lang="ts">
import { ref } from 'vue'
import type { Transaction } from '@/types'

const transactions = ref<Transaction[]>([
  {
    id: 1,
    items: [
      { product: { id: 1, name: 'Product 1', price: 9.99, category: 'Category 1', stock: 10 }, quantity: 2 }
    ],
    total: 19.98,
    date: new Date()
  }
])
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold">Transactions History</h1>
    
    <div class="bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3">Transaction ID</th>
              <th class="px-6 py-3">Items</th>
              <th class="px-6 py-3">Total</th>
              <th class="px-6 py-3">Date</th>
              <th class="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="transaction in transactions" :key="transaction.id" class="border-b dark:border-gray-700">
              <td class="px-6 py-4">#{{ transaction.id }}</td>
              <td class="px-6 py-4">
                <ul class="list-disc list-inside">
                  <li v-for="item in transaction.items" :key="item.product.id">
                    {{ item.product.name }} (x{{ item.quantity }})
                  </li>
                </ul>
              </td>
              <td class="px-6 py-4">${{ transaction.total.toFixed(2) }}</td>
              <td class="px-6 py-4">{{ new Date(transaction.date).toLocaleString() }}</td>
              <td class="px-6 py-4">
                <button class="text-primary hover:text-primary-hover">View Details</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>