import type { Team } from "@/types"

// Mock data for demo purposes
const mockTeams: Team[] = [
  {
    id: 1,
    name: "Frontend Development",
    department: "Engineering",
    members: [
      { id: 1, name: "John Smith", role: "Team Lead", email: "john@example.com" },
      { id: 2, name: "Sarah Johnson", role: "Senior Developer", email: "sarah@example.com" },
      { id: 3, name: "Michael Brown", role: "Developer", email: "michael@example.com" },
      { id: 4, name: "Emily Davis", role: "UI/UX Designer", email: "emily@example.com" },
    ],
    projects: 8,
    completed: 5,
    inProgress: 3,
    completionRate: 85,
  },
  {
    id: 2,
    name: "Backend Development",
    department: "Engineering",
    members: [
      { id: 5, name: "David Wilson", role: "Team Lead", email: "david@example.com" },
      { id: 6, name: "Jennifer Adams", role: "Senior Developer", email: "jennifer@example.com" },
      { id: 7, name: "Robert Taylor", role: "Developer", email: "robert@example.com" },
      { id: 8, name: "Lisa Clark", role: "Database Specialist", email: "lisa@example.com" },
      { id: 9, name: "Thomas Moore", role: "DevOps Engineer", email: "thomas@example.com" },
    ],
    projects: 10,
    completed: 7,
    inProgress: 3,
    completionRate: 92,
  },
  {
    id: 3,
    name: "Product Design",
    department: "Design",
    members: [
      { id: 10, name: "Amanda Lewis", role: "Design Lead", email: "amanda@example.com" },
      { id: 11, name: "Daniel Martin", role: "Senior Designer", email: "daniel@example.com" },
      { id: 12, name: "Sophia Rodriguez", role: "UI Designer", email: "sophia@example.com" },
      { id: 13, name: "William Harris", role: "UX Researcher", email: "william@example.com" },
    ],
    projects: 6,
    completed: 4,
    inProgress: 2,
    completionRate: 78,
  },
  {
    id: 4,
    name: "Digital Marketing",
    department: "Marketing",
    members: [
      { id: 14, name: "Karen White", role: "Marketing Lead", email: "karen@example.com" },
      { id: 15, name: "Steven Garcia", role: "Content Strategist", email: "steven@example.com" },
      { id: 16, name: "Michelle Lee", role: "Social Media Specialist", email: "michelle@example.com" },
    ],
    projects: 5,
    completed: 3,
    inProgress: 2,
    completionRate: 75,
  },
  {
    id: 5,
    name: "Sales Team",
    department: "Sales",
    members: [
      { id: 17, name: "Richard Thompson", role: "Sales Director", email: "richard@example.com" },
      { id: 18, name: "Patricia Anderson", role: "Account Executive", email: "patricia@example.com" },
      { id: 19, name: "James Wilson", role: "Sales Representative", email: "james@example.com" },
      { id: 20, name: "Nancy Miller", role: "Sales Representative", email: "nancy@example.com" },
    ],
    projects: 4,
    completed: 2,
    inProgress: 2,
    completionRate: 68,
  },
  {
    id: 6,
    name: "Customer Support",
    department: "Operations",
    members: [
      { id: 21, name: "Christopher Davis", role: "Support Lead", email: "christopher@example.com" },
      { id: 22, name: "Elizabeth Taylor", role: "Senior Support Specialist", email: "elizabeth@example.com" },
      { id: 23, name: "Matthew Johnson", role: "Support Specialist", email: "matthew@example.com" },
      { id: 24, name: "Jessica Brown", role: "Support Specialist", email: "jessica@example.com" },
    ],
    projects: 3,
    completed: 2,
    inProgress: 1,
    completionRate: 95,
  },
]

export const teamService = {
  getTeams: async (): Promise<Team[]> => {
    try {
      // In a real app, this would be an actual API call
      // const response = await axiosInstance.get('/teams')
      // return response.data

      // Mock response for demo
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return mockTeams
    } catch (error) {
      console.error("Get teams error:", error)
      throw error
    }
  },

  getTeamById: async (id: number): Promise<Team | null> => {
    try {
      // In a real app, this would be an actual API call
      // const response = await axiosInstance.get(`/teams/${id}`)
      // return response.data

      // Mock response for demo
      await new Promise((resolve) => setTimeout(resolve, 800))
      const team = mockTeams.find((team) => team.id === id)

      if (!team) {
        throw new Error("Team not found")
      }

      return team
    } catch (error) {
      console.error("Get team error:", error)
      throw error
    }
  },
}
