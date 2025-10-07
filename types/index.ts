export interface User {
  id: number
  name: string
  email: string
  role: string
  phone?: string
}

export interface Company {
  id: number
  name: string
  industry: string
  location: string
  logo: string | null
  employees: number
  projects: number
  founded: number
  revenue: number
  website: string
  email: string
  phone: string
  team?: { name: string; role: string }[]
  activeProjects?: { name: string; status: string; dueDate: string }[]
}

export interface TeamMember {
  id: number
  name: string
  role: string
  email: string
}

export interface Team {
  id: number
  name: string
  department: string
  members: TeamMember[]
  projects: number
  completed: number
  inProgress: number
  completionRate: number
}
