import type { User } from "@/types"

// Mock data for demo purposes
const mockUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    phone: "+1 (555) 123-4567",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    phone: "+1 (555) 987-6543",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Editor",
    phone: "+1 (555) 456-7890",
  },
  {
    id: 4,
    name: "Alice Williams",
    email: "alice@example.com",
    role: "User",
    phone: "+1 (555) 234-5678",
  },
  {
    id: 5,
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "Editor",
    phone: "+1 (555) 876-5432",
  },
]

export const userService = {
  getUsers: async (): Promise<User[]> => {
    try {
      // In a real app, this would be an actual API call
      // const response = await axiosInstance.get('/users')
      // return response.data

      // Mock response for demo
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return mockUsers
    } catch (error) {
      console.error("Get users error:", error)
      throw error
    }
  },

  getUserById: async (id: number): Promise<User> => {
    try {
      // In a real app, this would be an actual API call
      // const response = await axiosInstance.get(`/users/${id}`)
      // return response.data

      // Mock response for demo
      await new Promise((resolve) => setTimeout(resolve, 800))
      const user = mockUsers.find((user) => user.id === id)

      if (!user) {
        throw new Error("User not found")
      }

      return user
    } catch (error) {
      console.error("Get user error:", error)
      throw error
    }
  },
}
