"use client"

import { useState, useEffect } from "react"
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, TextInput } from "react-native"
import { Layout } from "@/components/Layout"
import { Header } from "@/components/Header"
import { Card } from "@/components/Card"
import { useTheme } from "@/context/theme-context"
import { Search, Filter, Plus, Building2, MapPin, Users, Briefcase } from "lucide-react-native"
import { useRouter } from "expo-router"
import { companyService } from "@/api/services/company-service"
import type { Company } from "@/types"
import { Button } from "@/components/Button"
import { Loader } from "@/components/Loader"

export default function Companies() {
  const { colors } = useTheme()
  const router = useRouter()
  const [companies, setCompanies] = useState<Company[]>([])
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [filterModalVisible, setFilterModalVisible] = useState(false)
  const [industryFilter, setIndustryFilter] = useState("All")

  useEffect(() => {
    fetchCompanies()
  }, [])

  useEffect(() => {
    if (searchQuery || industryFilter !== "All") {
      const filtered = companies.filter(
        (company) =>
          (searchQuery
            ? company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              company.industry.toLowerCase().includes(searchQuery.toLowerCase())
            : true) && (industryFilter !== "All" ? company.industry === industryFilter : true),
      )
      setFilteredCompanies(filtered)
    } else {
      setFilteredCompanies(companies)
    }
  }, [searchQuery, companies, industryFilter])

  const fetchCompanies = async () => {
    try {
      setIsLoading(true)
      const data = await companyService.getCompanies()
      setCompanies(data)
      setFilteredCompanies(data)
    } catch (error) {
      console.error("Error fetching companies:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await fetchCompanies()
    setIsRefreshing(false)
  }

  const handleCompanyPress = (company: Company) => {
    router.push(`/companies/${company.id}`)
  }

  const industries = ["All", "Technology", "Healthcare", "Finance", "Manufacturing", "Retail"]

  const styles = StyleSheet.create({
    container: {
      padding: 16,
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginBottom: 16,
    },
    searchInput: {
      flex: 1,
      height: 48,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: 16,
      paddingLeft: 40,
      backgroundColor: colors.cardBackground,
      color: colors.text,
    },
    searchIcon: {
      position: "absolute",
      left: 12,
      zIndex: 1,
    },
    filterButton: {
      width: 48,
      height: 48,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.cardBackground,
      alignItems: "center",
      justifyContent: "center",
    },
    addButton: {
      width: 48,
      height: 48,
      borderRadius: 8,
      backgroundColor: colors.primary,
      alignItems: "center",
      justifyContent: "center",
    },
    filterChipsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: 16,
    },
    filterChip: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      backgroundColor: colors.cardBackground,
      borderWidth: 1,
      borderColor: colors.border,
      marginRight: 8,
      marginBottom: 8,
    },
    filterChipActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    filterChipText: {
      color: colors.text,
    },
    filterChipTextActive: {
      color: "#fff",
    },
    companyCard: {
      marginBottom: 16,
    },
    companyCardContent: {
      padding: 16,
    },
    companyHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
    },
    companyLogo: {
      width: 50,
      height: 50,
      borderRadius: 8,
      marginRight: 12,
    },
    companyPlaceholder: {
      width: 50,
      height: 50,
      borderRadius: 8,
      backgroundColor: `${colors.primary}20`,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 12,
    },
    companyInfo: {
      flex: 1,
    },
    companyName: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 4,
    },
    companyIndustry: {
      color: colors.textSecondary,
    },
    companyDetails: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 8,
    },
    companyDetail: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: 16,
      marginBottom: 8,
    },
    companyDetailText: {
      color: colors.textSecondary,
      marginLeft: 4,
    },
    emptyContainer: {
      alignItems: "center",
      justifyContent: "center",
      padding: 40,
    },
    emptyText: {
      color: colors.textSecondary,
      textAlign: "center",
      marginBottom: 16,
    },
  })

  const renderCompanyItem = ({ item }: { item: Company }) => (
    <TouchableOpacity onPress={() => handleCompanyPress(item)}>
      <Card style={styles.companyCard}>
        <View style={styles.companyCardContent}>
          <View style={styles.companyHeader}>
            {item.logo ? (
              <Image source={{ uri: item.logo }} style={styles.companyLogo} />
            ) : (
              <View style={styles.companyPlaceholder}>
                <Building2 size={24} color={colors.primary} />
              </View>
            )}
            <View style={styles.companyInfo}>
              <Text style={styles.companyName}>{item.name}</Text>
              <Text style={styles.companyIndustry}>{item.industry}</Text>
            </View>
          </View>
          <View style={styles.companyDetails}>
            <View style={styles.companyDetail}>
              <MapPin size={16} color={colors.textSecondary} />
              <Text style={styles.companyDetailText}>{item.location}</Text>
            </View>
            <View style={styles.companyDetail}>
              <Users size={16} color={colors.textSecondary} />
              <Text style={styles.companyDetailText}>{item.employees} employees</Text>
            </View>
            <View style={styles.companyDetail}>
              <Briefcase size={16} color={colors.textSecondary} />
              <Text style={styles.companyDetailText}>{item.projects} projects</Text>
            </View>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  )

  return (
    <Layout>
      <Header title="Companies" />
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Search size={20} color={colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search companies..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.filterButton} onPress={() => setFilterModalVisible(true)}>
            <Filter size={20} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton} onPress={() => router.push("/companies/add")}>
            <Plus size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.filterChipsContainer}>
          {industries.map((industry) => (
            <TouchableOpacity
              key={industry}
              style={[styles.filterChip, industryFilter === industry && styles.filterChipActive]}
              onPress={() => setIndustryFilter(industry)}
            >
              <Text style={[styles.filterChipText, industryFilter === industry && styles.filterChipTextActive]}>
                {industry}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {isLoading ? (
          <View style={{ padding: 40 }}>
            <Loader size="large" text="Loading companies..." />
          </View>
        ) : filteredCompanies.length > 0 ? (
          <FlatList
            data={filteredCompanies}
            renderItem={renderCompanyItem}
            keyExtractor={(item) => item.id.toString()}
            onRefresh={handleRefresh}
            refreshing={isRefreshing}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No companies found matching your criteria</Text>
            <Button
              title="Reset Filters"
              onPress={() => {
                setSearchQuery("")
                setIndustryFilter("All")
              }}
            />
          </View>
        )}
      </View>
    </Layout>
  )
}
