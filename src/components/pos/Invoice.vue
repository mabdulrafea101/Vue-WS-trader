<script setup lang="ts">
import { computed } from 'vue'
import type { Transaction } from '../../types'

const props = defineProps<{
  transaction: Transaction
}>()

const printInvoice = () => {
  window.print()
}

const paymentStatus = computed(() => {
  switch (props.transaction.payment_status) {
    case 'paid':
      return 'Paid'
    case 'partially_paid':
      return 'Partially Paid'
    default:
      return 'Unpaid'
  }
})
</script>

<template>
  <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md max-w-2xl mx-auto">
    <!-- Invoice Header -->
    <div class="text-center mb-8">
      <h1 class="text-2xl font-bold">INVOICE</h1>
      <p class="text-gray-600 dark:text-gray-400">Invoice #{{ transaction.id }}</p>
      <p class="text-gray-600 dark:text-gray-400">{{ new Date(transaction.date).toLocaleDateString() }}</p>
    </div>

    <!-- Customer Info -->
    <div class="mb-8">
      <h2 class="text-lg font-semibold mb-2">Customer Information</h2>
      <p>Name: {{ transaction.customer_name }}</p>
      <p>Phone: {{ transaction.customer_phone }}</p>
    </div>

    <!-- Items Table -->
    <div class="mb-8">
      <table class="w-full mb-4">
        <thead>
          <tr class="border-b">
            <th class="text-left py-2">Item</th>
            <th class="text-right py-2">Qty</th>
            <th class="text-right py-2">Price</th>
            <th class="text-right py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in transaction.items" :key="item.product.id" class="border-b">
            <td class="py-2">{{ item.product.name }}</td>
            <td class="text-right py-2">{{ item.quantity }}</td>
            <td class="text-right py-2">${{ item.product.price.toFixed(2) }}</td>
            <td class="text-right py-2">${{ (item.quantity * item.product.price).toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Totals -->
    <div class="mb-8">
      <div class="flex justify-between mb-2">
        <span>Subtotal:</span>
        <span>${{ transaction.total.toFixed(2) }}</span>
      </div>
      <div class="flex justify-between mb-2">
        <span>Paid Amount:</span>
        <span>${{ transaction.paid_amount.toFixed(2) }}</span>
      </div>
      <div class="flex justify-between font-bold">
        <span>Remaining Amount:</span>
        <span>${{ (transaction.total - transaction.paid_amount).toFixed(2) }}</span>
      </div>
      <div class="mt-4 text-right">
        <span class="font-semibold">Payment Status: </span>
        <span :class="{
          'text-green-600': transaction.payment_status === 'paid',
          'text-yellow-600': transaction.payment_status === 'partially_paid',
          'text-red-600': transaction.payment_status === 'unpaid'
        }">{{ paymentStatus }}</span>
      </div>
    </div>

    <!-- Payment History -->
    <div class="mb-8">
      <h2 class="text-lg font-semibold mb-2">Payment History</h2>
      <div v-for="payment in transaction.payments" :key="payment.id" class="mb-2">
        <p class="text-sm">
          <span class="font-semibold">{{ new Date(payment.date).toLocaleDateString() }}</span> - 
          ${{ payment.amount.toFixed(2) }} via {{ payment.payment_method }}
          <span v-if="payment.notes" class="text-gray-600 dark:text-gray-400"> ({{ payment.notes }})</span>
        </p>
      </div>
    </div>

    <!-- Print Button - Hidden when printing -->
    <div class="text-center print:hidden">
      <button
        @click="printInvoice"
        class="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded"
      >
        Print Invoice
      </button>
    </div>
  </div>
</template>

<style>
@media print {
  body * {
    visibility: hidden;
  }
  .invoice-container, .invoice-container * {
    visibility: visible;
  }
  .invoice-container {
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>