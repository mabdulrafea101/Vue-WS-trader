import { defineStore } from 'pinia'
import api from '../api'
import type { Product } from '../types'

interface ProductState {
  products: Product[]
  loading: boolean
  error: string | null
}

export const useProductStore = defineStore('product', {
  state: (): ProductState => ({
    products: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchProducts() {
      this.loading = true
      try {
        const response = await api.get('/products/')
        this.products = response.data
      } catch (error) {
        this.error = 'Failed to fetch products'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async createProduct(product: Omit<Product, 'id'>) {
      try {
        const response = await api.post('/products/', product)
        this.products.push(response.data)
        return response.data
      } catch (error) {
        this.error = 'Failed to create product'
        throw error
      }
    },

    async updateProduct(id: number, product: Partial<Product>) {
      try {
        const response = await api.patch(`/products/${id}/`, product)
        const index = this.products.findIndex(p => p.id === id)
        if (index !== -1) {
          this.products[index] = response.data
        }
        return response.data
      } catch (error) {
        this.error = 'Failed to update product'
        throw error
      }
    },

    async deleteProduct(id: number) {
      try {
        await api.delete(`/products/${id}/`)
        this.products = this.products.filter(p => p.id !== id)
      } catch (error) {
        this.error = 'Failed to delete product'
        throw error
      }
    }
  }
})