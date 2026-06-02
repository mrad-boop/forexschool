export type UserStatus = 'free' | 'premium'
export type ModuleType = 'free' | 'premium'

export interface User {
  id: string
  email: string
  status: UserStatus
  created_at: string
}

export interface Module {
  id: string
  title: string
  description: string
  content: string
  type: ModuleType
  category: string
  level: number
  duration_hours: number
  order_index: number
  created_at: string
}

export interface Payment {
  id: string
  user_id: string
  amount: number
  currency: string
  transaction_hash: string
  status: 'pending' | 'confirmed' | 'failed'
  created_at: string
}

export interface UserProgress {
  id: string
  user_id: string
  module_id: string
  completed: boolean
  quiz_score: number | null
  completed_at: string | null
}
