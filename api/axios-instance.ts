import axios from "axios"
import * as SecureStore from "expo-secure-store"

const API_URL = "http://localhost:8080/api"

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor for adding auth token
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("auth_token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor for handling errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Handle token expiration
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      // Here you could implement token refresh logic
      // For now, we'll just sign out the user
      await SecureStore.deleteItemAsync("auth_token")
      await SecureStore.deleteItemAsync("user_data")

      // You might want to redirect to login screen here
      // This would require navigation context or other approach
    }

    return Promise.reject(error)
  },
)

export default axiosInstance
