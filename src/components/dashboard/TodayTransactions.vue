<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md">
    <div class="p-6 border-b border-gray-200 dark:border-gray-700">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Today's Transactions</h2>
    </div>
    <div v-if="transactions.length === 0" class="px-6 py-4 text-center text-gray-500">
      No transactions today
    </div>
    <div v-else class="overflow-x-auto">
      <table class="w-full text-left">
        <thead class="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th class="px-6 py-3">Transaction ID</th>
            <th class="px-6 py-3">Items</th>
            <th class="px-6 py-3">Total</th>
            <th class="px-6 py-3">Time</th>
            <th class="px-6 py-3">Status</th>
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
            <td class="px-6 py-4">{{ new Date(transaction.date).toLocaleTimeString() }}</td>
            <td class="px-6 py-4">
              <span :class="{
                'text-green-600': transaction.payment_status === 'paid',
                'text-yellow-600': transaction.payment_status === 'partially_paid',
                'text-red-600': transaction.payment_status === 'unpaid'
              }">
                {{ transaction.payment_status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Transaction } from '@/types'
import { useTransactionStore } from '@/stores/transaction'

const transactionStore = useTransactionStore()
const transactions = ref<Transaction[]>([])

onMounted(async () => {
  try {
    await transactionStore.fetchTransactions()
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    transactions.value = transactionStore.transactions.filter(t => {
      const transactionDate = new Date(t.date)
      return transactionDate >= today
    })
  } catch (error) {
    console.error('Failed to load today\'s transactions:', error)
  }
})
</script>

<style scoped>
/* Add any custom styles here if needed */
</style>