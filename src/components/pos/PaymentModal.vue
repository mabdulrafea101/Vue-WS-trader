<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Transaction } from '@/types'

const props = defineProps<{
  transaction: Transaction
  show: boolean
}>()

const emit = defineEmits(['close', 'payment-made'])

const amount = ref<number>(0)
const paymentMethod = ref<'cash' | 'card' | 'other'>('cash')
const notes = ref('')

const remainingAmount = computed(() => {
  return props.transaction.total - props.transaction.paid_amount
})

const makePayment = async () => {
  if (amount.value <= 0 || amount.value > remainingAmount.value) return

  emit('payment-made', {
    amount: amount.value,
    payment_method: paymentMethod.value,
    notes: notes.value
  })

  // Reset form
  amount.value = 0
  paymentMethod.value = 'cash'
  notes.value = ''
}
</script>

<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div class="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
      <h2 class="text-xl font-bold mb-4">Make Payment</h2>
      
      <div class="space-y-4">
        <div>
          <p class="text-sm text-gray-600 dark:text-gray-400">Total Amount: ${{ transaction.total.toFixed(2) }}</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">Paid Amount: ${{ transaction.paid_amount.toFixed(2) }}</p>
          <p class="text-sm font-semibold">Remaining: ${{ remainingAmount.toFixed(2) }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Payment Amount</label>
          <input
            v-model="amount"
            type="number"
            :max="remainingAmount"
            step="0.01"
            class="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-700"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Payment Method</label>
          <select
            v-model="paymentMethod"
            class="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-700"
          >
            <option value="cash">Cash</option>
            <option value="card">Card</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Notes</label>
          <textarea
            v-model="notes"
            class="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-700"
            rows="2"
          ></textarea>
        </div>

        <div class="flex justify-end space-x-3">
          <button
            @click="emit('close')"
            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            @click="makePayment"
            :disabled="amount <= 0 || amount > remainingAmount"
            class="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-md disabled:opacity-50"
          >
            Make Payment
          </button>
        </div>
      </div>
    </div>
  </div>
</template>