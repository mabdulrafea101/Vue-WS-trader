<script setup lang="ts">
import { ref, computed } from 'vue'
import type { CartItem, Transaction } from '../../types'
import { useTransactionStore } from '../../stores/transaction'
import PaymentModal from './PaymentModal.vue'
import Invoice from './Invoice.vue'

const transactionStore = useTransactionStore()
const cart = ref<CartItem[]>([])
const customerName = ref('')
const customerPhone = ref('')
const showPaymentModal = ref(false)
const showInvoice = ref(false)
const currentTransaction = ref<Transaction | null>(null)

const total = computed(() => {
  return cart.value.reduce((sum, item) => sum + item.quantity * item.product.price, 0)
})


const removeFromCart = (itemId: number) => {
  cart.value = cart.value.filter(item => item.product.id !== itemId)
}

const checkout = async () => {
  if (cart.value.length === 0 || !customerName.value || !customerPhone.value) return

  try {
    const transaction = await transactionStore.createTransaction({
  items: cart.value,
  total: total.value,
  paid_amount: 0,
  remaining_amount: total.value,
  customer_name: customerName.value,
  customer_phone: customerPhone.value,
  status: 'completed',
  payment_status: 'unpaid',
  payments: [],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
}
)

    currentTransaction.value = transaction
    showPaymentModal.value = true

    // Clear cart after successful checkout
    cart.value = []
    customerName.value = ''
    customerPhone.value = ''
  } catch (error) {
    console.error('Checkout failed:', error)
  }
}

const handlePayment = async (payment: { amount: number; payment_method: string; notes?: string }) => {
  if (!currentTransaction.value) return

  try {
    const updatedTransaction = await transactionStore.addPayment(
      currentTransaction.value.id,
      payment
    )
    currentTransaction.value = updatedTransaction
    showPaymentModal.value = false
    showInvoice.value = true
  } catch (error) {
    console.error('Payment failed:', error)
  }
}
</script>



<template>
  <div class="bg-white rounded-lg shadow-md p-4 dark:bg-gray-800">
    <h2 class="text-xl font-bold mb-4">Cart</h2>
    
    <!-- Customer Information -->
    <div class="mb-4 space-y-2">
      <input
        v-model="customerName"
        type="text"
        placeholder="Customer Name"
        class="w-full rounded-md border-gray-300 dark:bg-gray-700"
      />
      <input
        v-model="customerPhone"
        type="tel"
        placeholder="Phone Number"
        class="w-full rounded-md border-gray-300 dark:bg-gray-700"
      />
    </div>

    <!-- Cart Items -->
    <div class="space-y-4">
      <div v-for="item in cart" :key="item.product.id" class="flex justify-between items-center">
        <div>
          <h3 class="font-semibold">{{ item.product.name }}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-300">
            ${{ item.product.price.toFixed(2) }} x {{ item.quantity }}
          </p>
        </div>
        <button
          @click="removeFromCart(item.product.id)"
          class="text-red-500 hover:text-red-700"
        >
          Remove
        </button>
      </div>
    </div>

    <!-- Total and Checkout -->
    <div class="mt-4 pt-4 border-t">
      <div class="flex justify-between items-center mb-4">
        <span class="font-bold">Total:</span>
        <span class="font-bold">${{ total.toFixed(2) }}</span>
      </div>
      <button
        @click="checkout"
        class="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        :disabled="cart.length === 0 || !customerName || !customerPhone"
      >
        Checkout
      </button>
    </div>

    <!-- Payment Modal -->
    <PaymentModal
      v-if="currentTransaction"
      :show="showPaymentModal"
      :transaction="currentTransaction"
      @close="showPaymentModal = false"
      @payment-made="handlePayment"
    />

    <!-- Invoice Modal -->
    <div v-if="showInvoice && currentTransaction" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div class="p-4">
          <button
            @click="showInvoice = false"
            class="float-right text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        </div>
        <Invoice :transaction="currentTransaction" />
      </div>
    </div>
  </div>
</template>
