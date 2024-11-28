import { defineStore } from 'pinia'
import type { CartItem, Product } from '../types'

interface CartState {
  items: CartItem[]
  customerName: string
  customerPhone: string
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: [],
    customerName: '',
    customerPhone: ''
  }),

  getters: {
    total: (state) => {
      return state.items.reduce((sum, item) => sum + item.quantity * item.product.price, 0)
    },
    
    itemCount: (state) => {
      return state.items.reduce((sum, item) => sum + item.quantity, 0)
    }
  },

  actions: {
    addItem(product: Product) {
      const existingItem = this.items.find(item => item.product.id === product.id)
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.items.push({ product, quantity: 1 })
      }
    },

    removeItem(productId: number) {
      this.items = this.items.filter(item => item.product.id !== productId)
    },

    updateQuantity(productId: number, quantity: number) {
      const item = this.items.find(item => item.product.id === productId)
      if (item) {
        item.quantity = quantity
      }
    },

    setCustomerInfo(name: string, phone: string) {
      this.customerName = name
      this.customerPhone = phone
    },

    clearCart() {
      this.items = []
      this.customerName = ''
      this.customerPhone = ''
    }
  }
})