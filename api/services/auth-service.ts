import type { User } from "@/types"

// For demo purposes, we'll mock the API responses
const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
  },
]

interface AuthResponse {
  token: string
  user: User
}

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      // In a real app, this would be an actual API call
      // const response = await axiosInstance.post('/auth/login', { email, password })
      // return response.data

      // Mock response for demo
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulate validation
      if (email !== "john@example.com" || password !== "password") {
        throw new Error("Invalid credentials")
      }

      return {
        token: "mock-jwt-token",
        user: mockUsers[0],
      }
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  },

  register: async (name: string, email: string, password: string): Promise<AuthResponse> => {
    try {
      // In a real app, this would be an actual API call
      // const response = await axiosInstance.post('/auth/register', { name, email, password })
      // return response.data

      // Mock response for demo
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newUser = {
        id: 2,
        name,
        email,
        role: "User",
      }

      return {
        token: "mock-jwt-token",
        user: newUser,
      }
    } catch (error) {
      console.error("Register error:", error)
      throw error
    }
  },
}
