import type { Company } from "@/types"

// Mock data for demo purposes
const mockCompanies: Company[] = [
  {
    id: 1,
    name: "TechNova Solutions",
    industry: "Technology",
    location: "San Francisco, CA",
    logo: "https://via.placeholder.com/80",
    employees: 250,
    projects: 18,
    founded: 2015,
    revenue: 5800000,
    website: "https://technova.example.com",
    email: "info@technova.example.com",
    phone: "+1 (555) 123-4567",
    team: [
      { name: "John Smith", role: "CEO" },
      { name: "Sarah Johnson", role: "CTO" },
      { name: "Michael Brown", role: "Product Manager" },
      { name: "Emily Davis", role: "Lead Developer" },
      { name: "David Wilson", role: "Marketing Director" },
    ],
    activeProjects: [
      { name: "Mobile App Redesign", status: "In Progress", dueDate: "Aug 15, 2023" },
      { name: "Cloud Migration", status: "In Progress", dueDate: "Sep 30, 2023" },
      { name: "Website Overhaul", status: "Planning", dueDate: "Oct 20, 2023" },
      { name: "AI Integration", status: "In Progress", dueDate: "Nov 15, 2023" },
      { name: "Security Audit", status: "Completed", dueDate: "Jul 10, 2023" },
    ],
  },
  {
    id: 2,
    name: "MediCare Health",
    industry: "Healthcare",
    location: "Boston, MA",
    logo: "https://via.placeholder.com/80",
    employees: 420,
    projects: 12,
    founded: 2010,
    revenue: 12500000,
    website: "https://medicare-health.example.com",
    email: "contact@medicare-health.example.com",
    phone: "+1 (555) 987-6543",
    team: [
      { name: "Robert Taylor", role: "CEO" },
      { name: "Jennifer Adams", role: "Medical Director" },
      { name: "Thomas Moore", role: "CTO" },
      { name: "Lisa Clark", role: "Operations Manager" },
    ],
    activeProjects: [
      { name: "Patient Portal", status: "In Progress", dueDate: "Sep 5, 2023" },
      { name: "Telemedicine Platform", status: "Planning", dueDate: "Oct 15, 2023" },
      { name: "Medical Records System", status: "In Progress", dueDate: "Nov 20, 2023" },
    ],
  },
  {
    id: 3,
    name: "FinEdge Capital",
    industry: "Finance",
    location: "New York, NY",
    logo: "https://via.placeholder.com/80",
    employees: 180,
    projects: 9,
    founded: 2012,
    revenue: 8900000,
    website: "https://finedge.example.com",
    email: "info@finedge.example.com",
    phone: "+1 (555) 456-7890",
    team: [
      { name: "William Harris", role: "CEO" },
      { name: "Amanda Lewis", role: "CFO" },
      { name: "Daniel Martin", role: "Investment Director" },
      { name: "Sophia Rodriguez", role: "Risk Manager" },
    ],
    activeProjects: [
      { name: "Investment Platform", status: "In Progress", dueDate: "Aug 25, 2023" },
      { name: "Financial Analytics Dashboard", status: "In Progress", dueDate: "Sep 10, 2023" },
      { name: "Mobile Banking App", status: "Planning", dueDate: "Oct 5, 2023" },
    ],
  },
  {
    id: 4,
    name: "BuildRight Construction",
    industry: "Manufacturing",
    location: "Chicago, IL",
    logo: null,
    employees: 320,
    projects: 15,
    founded: 2008,
    revenue: 15200000,
    website: "https://buildright.example.com",
    email: "info@buildright.example.com",
    phone: "+1 (555) 234-5678",
    team: [
      { name: "Richard Thompson", role: "CEO" },
      { name: "Karen White", role: "Operations Director" },
      { name: "Steven Garcia", role: "Project Manager" },
      { name: "Michelle Lee", role: "Safety Coordinator" },
    ],
    activeProjects: [
      { name: "Office Tower", status: "In Progress", dueDate: "Dec 15, 2023" },
      { name: "Residential Complex", status: "Planning", dueDate: "Jan 20, 2024" },
      { name: "Shopping Center", status: "In Progress", dueDate: "Nov 10, 2023" },
    ],
  },
  {
    id: 5,
    name: "ShopSmart Retail",
    industry: "Retail",
    location: "Seattle, WA",
    logo: null,
    employees: 150,
    projects: 7,
    founded: 2014,
    revenue: 4500000,
    website: "https://shopsmart.example.com",
    email: "contact@shopsmart.example.com",
    phone: "+1 (555) 876-5432",
    team: [
      { name: "Patricia Anderson", role: "CEO" },
      { name: "James Wilson", role: "Retail Operations" },
      { name: "Nancy Miller", role: "Marketing Manager" },
      { name: "Christopher Davis", role: "Supply Chain Manager" },
    ],
    activeProjects: [
      { name: "E-commerce Platform", status: "In Progress", dueDate: "Sep 20, 2023" },
      { name: "Inventory Management System", status: "Planning", dueDate: "Oct 30, 2023" },
      { name: "Customer Loyalty Program", status: "In Progress", dueDate: "Aug 15, 2023" },
    ],
  },
]

export const companyService = {
  getCompanies: async (): Promise<Company[]> => {
    try {
      // In a real app, this would be an actual API call
      // const response = await axiosInstance.get('/companies')
      // return response.data

      // Mock response for demo
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return mockCompanies
    } catch (error) {
      console.error("Get companies error:", error)
      throw error
    }
  },

  getCompanyById: async (id: number): Promise<Company | null> => {
    try {
      // In a real app, this would be an actual API call
      // const response = await axiosInstance.get(`/companies/${id}`)
      // return response.data

      // Mock response for demo
      await new Promise((resolve) => setTimeout(resolve, 800))
      const company = mockCompanies.find((company) => company.id === id)

      if (!company) {
        throw new Error("Company not found")
      }

      return company
    } catch (error) {
      console.error("Get company error:", error)
      throw error
    }
  },
}
