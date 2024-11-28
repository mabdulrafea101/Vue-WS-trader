import { defineStore } from 'pinia'
import api from '@/api'
import type { Transaction } from '@/types'

interface TransactionState {
  transactions: Transaction[]
  loading: boolean
  error: string | null
}

export const useTransactionStore = defineStore('transaction', {
  state: (): TransactionState => ({
    transactions: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchTransactions() {
      this.loading = true
      try {
        const response = await api.get('/transactions/')
        this.transactions = response.data
      } catch (error) {
        this.error = 'Failed to fetch transactions'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async createTransaction(transaction: Omit<Transaction, 'id' | 'date'>) {
      try {
        const response = await api.post('/transactions/', transaction)
        this.transactions.push(response.data)
        return response.data
      } catch (error) {
        this.error = 'Failed to create transaction'
        throw error
      }
    },

    async getTransactionDetails(id: number) {
      try {
        const response = await api.get(`/transactions/${id}/`)
        return response.data
      } catch (error) {
        this.error = 'Failed to fetch transaction details'
        throw error
      }
    },

    async addPayment(transactionId: number, payment: { amount: number; payment_method: string; notes?: string }) {
      try {
        const response = await api.post(`/transactions/${transactionId}/payments/`, payment)
        const index = this.transactions.findIndex(t => t.id === transactionId)
        if (index !== -1) {
          this.transactions[index] = response.data
        }
        return response.data
      } catch (error) {
        this.error = 'Failed to add payment'
        throw error
      }
    }
  }
})