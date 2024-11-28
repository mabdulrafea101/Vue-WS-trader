// Models that match Django REST Framework serializers
export interface Product {
  id: number
  name: string
  price: number
  category: string
  stock: number
  created_at?: string
  updated_at?: string
}

export interface Category {
  id: number
  name: string
  description?: string
  created_at?: string
  updated_at?: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Payment {
  id: number
  amount: number
  date: string
  payment_method: 'cash' | 'card' | 'other'
  notes?: string
}

export interface Transaction {
  id: number
  items: CartItem[]
  total: number
  paid_amount: number
  remaining_amount: number
  date: string
  customer_name: string
  customer_phone: string
  status: 'pending' | 'completed' | 'cancelled'
  payment_status: 'unpaid' | 'partially_paid' | 'paid'
  payments: Payment[]
  expenses?: number
  created_at: string
  updated_at?: string
}

// API Response Types
export interface ApiResponse<T> {
  count?: number
  next?: string | null
  previous?: string | null
  results: T[]
}

export interface ApiError {
  message: string
  errors?: Record<string, string[]>
}