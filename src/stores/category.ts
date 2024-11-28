import { defineStore } from 'pinia'
import api from '@/api'
import type { Category } from '@/types'

interface CategoryState {
  categories: Category[]
  loading: boolean
  error: string | null
}

export const useCategoryStore = defineStore('category', {
  state: (): CategoryState => ({
    categories: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchCategories() {
      this.loading = true
      try {
        const response = await api.get('/categories/')
        this.categories = response.data
      } catch (error) {
        this.error = 'Failed to fetch categories'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async createCategory(category: Omit<Category, 'id'>) {
      try {
        const response = await api.post('/categories/', category)
        this.categories.push(response.data)
        return response.data
      } catch (error) {
        this.error = 'Failed to create category'
        throw error
      }
    },

    async updateCategory(id: number, category: Partial<Category>) {
      try {
        const response = await api.patch(`/categories/${id}/`, category)
        const index = this.categories.findIndex(c => c.id === id)
        if (index !== -1) {
          this.categories[index] = response.data
        }
        return response.data
      } catch (error) {
        this.error = 'Failed to update category'
        throw error
      }
    },

    async deleteCategory(id: number) {
      try {
        await api.delete(`/categories/${id}/`)
        this.categories = this.categories.filter(c => c.id !== id)
      } catch (error) {
        this.error = 'Failed to delete category'
        throw error
      }
    }
  }
})