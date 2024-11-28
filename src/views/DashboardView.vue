<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTransactionStore } from '../stores/transaction'

import type { Transaction } from '../types'
import TodayTransactions from '../components/dashboard/TodayTransactions.vue'


const transactionStore = useTransactionStore()

const stats = ref({
  totalSales: 0,
  totalExpenses: 0,
  profit: 0,
  inventoryItems: 0
})

const todayTransactions = ref<Transaction[]>([])

onMounted(async () => {
  try {
    await transactionStore.fetchTransactions()
    // Calculate stats from transactions
    const transactions = transactionStore.transactions
    stats.value.totalSales = transactions.reduce((sum: number, t: Transaction) => sum + t.total, 0)
    stats.value.totalExpenses = transactions.reduce((sum: number, t: Transaction) => sum + (t.expenses || 0), 0)
    stats.value.profit = stats.value.totalSales - stats.value.totalExpenses
    
    // Filter today's transactions
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    todayTransactions.value = transactions.filter((t: Transaction) => {
      const transactionDate = new Date(t.date)
      return transactionDate >= today
    })
  } catch (error) {
    console.error('Failed to load dashboard data:', error)
  }
})
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold">Dashboard</h1>
    
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Total Sales -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div class="flex items-center">
          <div class="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
            <svg class="w-6 h-6 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <h2 class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Sales</h2>
            <p class="text-lg font-semibold text-gray-900 dark:text-white">Rs.{{ stats.totalSales.toLocaleString() }}</p>
          </div>
        </div>
      </div>

      <!-- Total Expenses -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div class="flex items-center">
          <div class="p-3 bg-red-100 dark:bg-red-900 rounded-full">
            <svg class="w-6 h-6 text-red-600 dark:text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <h2 class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Expenses</h2>
            <p class="text-lg font-semibold text-gray-900 dark:text-white">Rs.{{ stats.totalExpenses.toLocaleString() }}</p>
          </div>
        </div>
      </div>

      <!-- Profit -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div class="flex items-center">
          <div class="p-3 bg-green-100 dark:bg-green-900 rounded-full">
            <svg class="w-6 h-6 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
            </svg>
          </div>
          <div class="ml-4">
            <h2 class="text-sm font-medium text-gray-600 dark:text-gray-400">Profit</h2>
            <p class="text-lg font-semibold text-gray-900 dark:text-white">Rs.{{ stats.profit.toLocaleString() }}</p>
          </div>
        </div>
      </div>

      <!-- Inventory Items -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div class="flex items-center">
          <div class="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
            <svg class="w-6 h-6 text-purple-600 dark:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
            </svg>
          </div>
          <div class="ml-4">
            <h2 class="text-sm font-medium text-gray-600 dark:text-gray-400">Inventory Items</h2>
            <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ stats.inventoryItems }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Today's Transactions -->

    <TodayTransactions :transactions="todayTransactions" />
  </div>
</template>