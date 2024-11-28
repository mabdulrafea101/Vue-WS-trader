<script setup lang="ts">
import { ref } from 'vue'
import type { Product } from '../types'

const products = ref<Product[]>([
  { id: 1, name: 'Product 1', price: 9.99, category: 'Category 1', stock: 10 },
  { id: 2, name: 'Product 2', price: 19.99, category: 'Category 2', stock: 15 },
])

const newProduct = ref<Partial<Product>>({
  name: '',
  price: 0,
  category: '',
  stock: 0
})

const editingProduct = ref<Product | null>(null)

const addProduct = () => {
  if (newProduct.value.name && newProduct.value.price && newProduct.value.category) {
    products.value.push({
      id: products.value.length + 1,
      name: newProduct.value.name,
      price: newProduct.value.price,
      category: newProduct.value.category,
      stock: newProduct.value.stock || 0
    })
    newProduct.value = { name: '', price: 0, category: '', stock: 0 }
    editingProduct.value = null // Reset editing state
  }
}

const editProduct = (product: Product) => {
  newProduct.value = { ...product } // Copy product details to form
  editingProduct.value = product // Set the product being edited
}

const updateProduct = () => {
  if (newProduct.value.name && newProduct.value.price && newProduct.value.category) {
    const index = products.value.findIndex(prod => prod.id === editingProduct.value!.id)
    if (index !== -1) {
      products.value[index] = { ...editingProduct.value!, ...newProduct.value }
      editingProduct.value = null // Reset editing state
      newProduct.value = { name: '', price: 0, category: '', stock: 0 } // Clear form
    }
  }
}

const deleteProduct = (product: Product) => {
  const index = products.value.findIndex(prod => prod.id === product.id)
  if (index !== -1) {
    products.value.splice(index, 1)
  }
}
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold">Products Management</h1>
    
    <div class="bg-white rounded-lg shadow-md p-6 dark:bg-gray-800" v-if="!editingProduct">
      <h2 class="text-xl font-semibold mb-4">Add New Product</h2>
      <form @submit.prevent="addProduct" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
            <input
              v-model="newProduct.name"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-700"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Price</label>
            <input
              v-model="newProduct.price"
              type="number"
              step="0.01"
              class="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-700"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
            <input
              v-model="newProduct.category"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-700"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Initial Stock</label>
            <input
              v-model="newProduct.stock"
              type="number"
              class="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-700"
              required
            />
          </div>
        </div>

        <!-- Save Button -->
        <button type="submit" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          Add Product
        </button>
      </form>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6 dark:bg-gray-800" v-if="editingProduct">
      <h2 class="text-xl font-semibold mb-4">Edit Product</h2>
      <form @submit.prevent="updateProduct" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
            <input
              v-model="newProduct.name"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-700"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Price</label>
            <input
              v-model="newProduct.price"
              type="number"
              step="0.01"
              class="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-700"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
            <input
              v-model="newProduct.category"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-700"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Initial Stock</label>
            <input
              v-model="newProduct.stock"
              type="number"
              class="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-700"
              required
            />
          </div>
        </div>

        <!-- Save Button -->
        <button type="submit" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          Update Product
        </button>
      </form>
    </div>

    <!-- Products Table -->
    <div v-if="products.length > 0" class="bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3">Name</th>
              <th class="px-6 py-3">Category</th>
              <th class="px-6 py-3">Price</th>
              <th class="px-6 py-3">Stock</th>
              <th class="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id" class="border-b dark:border-gray-700">
              <td class="px-6 py-4">{{ product.name }}</td>
              <td class="px-6 py-4">{{ product.category }}</td>
              <td class="px-6 py-4">Rs.{{ product.price.toFixed(2) }}</td>
              <td class="px-6 py-4">{{ product.stock }}</td>
              <td class="px-6 py-4">
                <button @click="editProduct(product)" class="inline-flex items-center text-blue-500 hover:text-blue-800 mr-2">
                  <svg class="w-5 h-5 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clip-rule="evenodd"/>
                    <path fill-rule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clip-rule="evenodd"/>
                  </svg>
                  
                  Edit</button>
                <button @click="deleteProduct(product)" class="inline-flex items-center text-red-500 hover:text-red-700">
                  <svg class="w-5 h-5 text-red-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                  </svg>
                  Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- No Products Found Message -->
    <p v-else class="text-gray-600 dark:text-gray-300 text-center mt-4">
      No products found.
    </p>
  </div>
</template>

<style scoped>
/* Ensure any custom styles are scoped to this component */
</style>