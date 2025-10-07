"use client"

import { useState, useEffect } from "react"
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Linking } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"
import { Layout } from "@/components/Layout"
import { Header } from "@/components/Header"
import { Card } from "@/components/Card"
import { useTheme } from "@/context/theme-context"
import { companyService } from "@/api/services/company-service"
import { Loader } from "@/components/Loader"
import { Button } from "@/components/Button"
import {
  Building2,
  MapPin,
  Globe,
  Phone,
  Mail,
  Users,
  Briefcase,
  TrendingUp,
  ChevronRight,
  Edit,
  Share2,
  Download,
} from "lucide-react-native"
import { LineChart, BarChart } from "react-native-chart-kit"
import { Dimensions } from "react-native"
import * as Sharing from "expo-sharing"
import * as FileSystem from "expo-file-system"

export default function CompanyDetails() {
  const { id } = useLocalSearchParams()
  const router = useRouter()
  const { colors } = useTheme()
  const [company, setCompany] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const screenWidth = Dimensions.get("window").width - 32

  useEffect(() => {
    fetchCompanyDetails()
  }, [id])

  const fetchCompanyDetails = async () => {
    try {
      setIsLoading(true)
      const data = await companyService.getCompanyById(Number(id))
      setCompany(data)
    } catch (error) {
      console.error("Error fetching company details:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const chartConfig = {
    backgroundGradientFrom: colors.cardBackground,
    backgroundGradientTo: colors.cardBackground,
    color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
    labelColor: () => colors.text,
  }

  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  }

  const projectData = {
    labels: ["Completed", "In Progress", "Planning"],
    datasets: [
      {
        data: [8, 5, 3],
      },
    ],
  }

  const exportCompanyData = async () => {
    if (!company) return

    try {
      // Create a CSV string
      const csvData = `Company Name,${company.name}
Industry,${company.industry}
Location,${company.location}
Employees,${company.employees}
Projects,${company.projects}
Founded,${company.founded}
Revenue,$${company.revenue.toLocaleString()}
Website,${company.website}
Email,${company.email}
Phone,${company.phone}`

      // Create a temporary file
      const fileUri = FileSystem.documentDirectory + `${company.name.replace(/\s+/g, "_")}_data.csv`
      await FileSystem.writeAsStringAsync(fileUri, csvData)

      // Share the file
      await Sharing.shareAsync(fileUri, {
        mimeType: "text/csv",
        dialogTitle: `${company.name} Data`,
        UTI: "public.comma-separated-values-text",
      })
    } catch (error) {
      console.error("Error exporting company data:", error)
    }
  }

  const styles = StyleSheet.create({
    container: {
      padding: 16,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 24,
    },
    logo: {
      width: 80,
      height: 80,
      borderRadius: 12,
      marginRight: 16,
    },
    logoPlaceholder: {
      width: 80,
      height: 80,
      borderRadius: 12,
      backgroundColor: `${colors.primary}20`,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 16,
    },
    headerInfo: {
      flex: 1,
    },
    companyName: {
      fontSize: 24,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 4,
    },
    companyIndustry: {
      fontSize: 16,
      color: colors.textSecondary,
      marginBottom: 8,
    },
    location: {
      flexDirection: "row",
      alignItems: "center",
    },
    locationText: {
      color: colors.textSecondary,
      marginLeft: 4,
    },
    actionButtons: {
      flexDirection: "row",
      marginBottom: 24,
      gap: 8,
    },
    actionButton: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.cardBackground,
      paddingVertical: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    actionButtonText: {
      color: colors.text,
      marginLeft: 8,
      fontWeight: "500",
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 12,
    },
    infoCard: {
      marginBottom: 24,
    },
    infoRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    infoRowLast: {
      borderBottomWidth: 0,
    },
    infoIcon: {
      marginRight: 12,
    },
    infoLabel: {
      flex: 1,
      color: colors.textSecondary,
    },
    infoValue: {
      flex: 2,
      color: colors.text,
      fontWeight: "500",
    },
    infoLink: {
      color: colors.primary,
      fontWeight: "500",
    },
    chartCard: {
      marginBottom: 24,
      padding: 16,
    },
    chartTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 16,
    },
    teamCard: {
      marginBottom: 24,
    },
    teamMember: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    teamMemberLast: {
      borderBottomWidth: 0,
    },
    teamMemberAvatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: `${colors.primary}20`,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 12,
    },
    teamMemberInitial: {
      color: colors.primary,
      fontSize: 16,
      fontWeight: "bold",
    },
    teamMemberInfo: {
      flex: 1,
    },
    teamMemberName: {
      color: colors.text,
      fontWeight: "500",
    },
    teamMemberRole: {
      color: colors.textSecondary,
      fontSize: 14,
    },
    projectCard: {
      marginBottom: 24,
    },
    project: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    projectLast: {
      borderBottomWidth: 0,
    },
    projectInfo: {
      flex: 1,
    },
    projectName: {
      color: colors.text,
      fontWeight: "500",
    },
    projectStatus: {
      color: colors.textSecondary,
      fontSize: 14,
    },
    viewAllButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 12,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    viewAllText: {
      color: colors.primary,
      fontWeight: "500",
      marginRight: 4,
    },
  })

  if (isLoading) {
    return (
      <Layout>
        <Header title="Company Details" showBack />
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Loader size="large" text="Loading company details..." />
        </View>
      </Layout>
    )
  }

  if (!company) {
    return (
      <Layout>
        <Header title="Company Details" showBack />
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
          <Text style={{ color: colors.text, fontSize: 16, textAlign: "center" }}>
            Company not found or an error occurred.
          </Text>
          <Button title="Go Back" onPress={() => router.back()} style={{ marginTop: 20 }} />
        </View>
      </Layout>
    )
  }

  return (
    <Layout>
      <Header title="Company Details" showBack />
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.header}>
            {company.logo ? (
              <Image source={{ uri: company.logo }} style={styles.logo} />
            ) : (
              <View style={styles.logoPlaceholder}>
                <Building2 size={36} color={colors.primary} />
              </View>
            )}
            <View style={styles.headerInfo}>
              <Text style={styles.companyName}>{company.name}</Text>
              <Text style={styles.companyIndustry}>{company.industry}</Text>
              <View style={styles.location}>
                <MapPin size={16} color={colors.textSecondary} />
                <Text style={styles.locationText}>{company.location}</Text>
              </View>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton} onPress={() => router.push(`/companies/${id}/edit`)}>
              <Edit size={18} color={colors.text} />
              <Text style={styles.actionButtonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => Sharing.shareAsync(`Company: ${company.name}`)}
            >
              <Share2 size={18} color={colors.text} />
              <Text style={styles.actionButtonText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={exportCompanyData}>
              <Download size={18} color={colors.text} />
              <Text style={styles.actionButtonText}>Export</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Company Information</Text>
          <Card style={styles.infoCard}>
            <View style={{ padding: 16 }}>
              <View style={styles.infoRow}>
                <Building2 size={20} color={colors.textSecondary} style={styles.infoIcon} />
                <Text style={styles.infoLabel}>Founded</Text>
                <Text style={styles.infoValue}>{company.founded}</Text>
              </View>
              <View style={styles.infoRow}>
                <Users size={20} color={colors.textSecondary} style={styles.infoIcon} />
                <Text style={styles.infoLabel}>Employees</Text>
                <Text style={styles.infoValue}>{company.employees}</Text>
              </View>
              <View style={styles.infoRow}>
                <Briefcase size={20} color={colors.textSecondary} style={styles.infoIcon} />
                <Text style={styles.infoLabel}>Projects</Text>
                <Text style={styles.infoValue}>{company.projects}</Text>
              </View>
              <View style={styles.infoRow}>
                <TrendingUp size={20} color={colors.textSecondary} style={styles.infoIcon} />
                <Text style={styles.infoLabel}>Revenue</Text>
                <Text style={styles.infoValue}>${company.revenue.toLocaleString()}</Text>
              </View>
              <View style={styles.infoRow}>
                <Globe size={20} color={colors.textSecondary} style={styles.infoIcon} />
                <Text style={styles.infoLabel}>Website</Text>
                <TouchableOpacity onPress={() => Linking.openURL(company.website)}>
                  <Text style={styles.infoLink}>{company.website}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.infoRow}>
                <Mail size={20} color={colors.textSecondary} style={styles.infoIcon} />
                <Text style={styles.infoLabel}>Email</Text>
                <TouchableOpacity onPress={() => Linking.openURL(`mailto:${company.email}`)}>
                  <Text style={styles.infoLink}>{company.email}</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.infoRow, styles.infoRowLast]}>
                <Phone size={20} color={colors.textSecondary} style={styles.infoIcon} />
                <Text style={styles.infoLabel}>Phone</Text>
                <TouchableOpacity onPress={() => Linking.openURL(`tel:${company.phone}`)}>
                  <Text style={styles.infoLink}>{company.phone}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Card>

          <Text style={styles.sectionTitle}>Performance Overview</Text>
          <Card style={styles.chartCard}>
            <Text style={styles.chartTitle}>Revenue Trend</Text>
            <LineChart
              data={revenueData}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={{ borderRadius: 8 }}
            />
          </Card>

          <Card style={styles.chartCard}>
            <Text style={styles.chartTitle}>Project Status</Text>
            <BarChart
              data={projectData}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
              style={{ borderRadius: 8 }}
              fromZero
            />
          </Card>

          <Text style={styles.sectionTitle}>Key Team Members</Text>
          <Card style={styles.teamCard}>
            <View style={{ padding: 16 }}>
              {company.team &&
                company.team.slice(0, 4).map((member: any, index: number) => (
                  <View
                    key={index}
                    style={[styles.teamMember, index === Math.min(3, company.team.length - 1) && styles.teamMemberLast]}
                  >
                    <View style={styles.teamMemberAvatar}>
                      <Text style={styles.teamMemberInitial}>{member.name.charAt(0)}</Text>
                    </View>
                    <View style={styles.teamMemberInfo}>
                      <Text style={styles.teamMemberName}>{member.name}</Text>
                      <Text style={styles.teamMemberRole}>{member.role}</Text>
                    </View>
                    <ChevronRight size={20} color={colors.textSecondary} />
                  </View>
                ))}
            </View>
            {company.team && company.team.length > 4 && (
              <TouchableOpacity style={styles.viewAllButton} onPress={() => router.push(`/companies/${id}/team`)}>
                <Text style={styles.viewAllText}>View All Team Members</Text>
                <ChevronRight size={16} color={colors.primary} />
              </TouchableOpacity>
            )}
          </Card>

          <Text style={styles.sectionTitle}>Active Projects</Text>
          <Card style={styles.projectCard}>
            <View style={{ padding: 16 }}>
              {company.activeProjects &&
                company.activeProjects.slice(0, 4).map((project: any, index: number) => (
                  <View
                    key={index}
                    style={[
                      styles.project,
                      index === Math.min(3, company.activeProjects.length - 1) && styles.projectLast,
                    ]}
                  >
                    <View style={styles.projectInfo}>
                      <Text style={styles.projectName}>{project.name}</Text>
                      <Text style={styles.projectStatus}>
                        {project.status} • Due {project.dueDate}
                      </Text>
                    </View>
                    <ChevronRight size={20} color={colors.textSecondary} />
                  </View>
                ))}
            </View>
            {company.activeProjects && company.activeProjects.length > 4 && (
              <TouchableOpacity style={styles.viewAllButton} onPress={() => router.push(`/companies/${id}/projects`)}>
                <Text style={styles.viewAllText}>View All Projects</Text>
                <ChevronRight size={16} color={colors.primary} />
              </TouchableOpacity>
            )}
          </Card>
        </View>
      </ScrollView>
    </Layout>
  )
}
