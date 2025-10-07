"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Alert, ActivityIndicator } from "react-native"
import { Layout } from "@/components/Layout"
import { Header } from "@/components/Header"
import { Card } from "@/components/Card"
import { useTheme } from "@/context/theme-context"
import {
  Search,
  Filter,
  Download,
  Mail,
  Users,
  Calendar,
  ChevronRight,
  Plus,
  ArrowUpDown,
  CheckCircle2,
} from "lucide-react-native"
import { teamService } from "@/api/services/team-service"
import type { Team } from "@/types"
import { Modal } from "@/components/Modal"
import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import * as Sharing from "expo-sharing"
import * as FileSystem from "expo-file-system"
import * as MailComposer from "expo-mail-composer"

export default function Teams() {
  const { colors } = useTheme()
  const [teams, setTeams] = useState<Team[]>([])
  const [filteredTeams, setFilteredTeams] = useState<Team[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [filterModalVisible, setFilterModalVisible] = useState(false)
  const [emailModalVisible, setEmailModalVisible] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)
  const [emailSubject, setEmailSubject] = useState("")
  const [emailBody, setEmailBody] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")
  const [departmentFilter, setDepartmentFilter] = useState("All")
  const [sendingEmail, setSendingEmail] = useState(false)

  useEffect(() => {
    fetchTeams()
  }, [])

  useEffect(() => {
    if (teams.length > 0) {
      filterAndSortTeams()
    }
  }, [searchQuery, teams, sortBy, sortOrder, departmentFilter])

  const fetchTeams = async () => {
    try {
      setIsLoading(true)
      const data = await teamService.getTeams()
      setTeams(data)
      setFilteredTeams(data)
    } catch (error) {
      console.error("Error fetching teams:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterAndSortTeams = () => {
    // First filter
    let filtered = teams.filter(
      (team) =>
        (searchQuery
          ? team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            team.department.toLowerCase().includes(searchQuery.toLowerCase())
          : true) && (departmentFilter !== "All" ? team.department === departmentFilter : true),
    )

    // Then sort
    filtered = [...filtered].sort((a, b) => {
      let comparison = 0
      if (sortBy === "name") {
        comparison = a.name.localeCompare(b.name)
      } else if (sortBy === "members") {
        comparison = a.members.length - b.members.length
      } else if (sortBy === "projects") {
        comparison = a.projects - b.projects
      }

      return sortOrder === "asc" ? comparison : -comparison
    })

    setFilteredTeams(filtered)
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await fetchTeams()
    setIsRefreshing(false)
  }

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("asc")
    }
  }

  const exportTeamsData = async () => {
    try {
      // Create CSV header
      let csvContent = "Team Name,Department,Members,Projects,Completion Rate\n"

      // Add data rows
      filteredTeams.forEach((team) => {
        csvContent += `"${team.name}","${team.department}",${team.members.length},${team.projects},${team.completionRate}%\n`
      })

      // Create a temporary file
      const fileUri = FileSystem.documentDirectory + "teams_data.csv"
      await FileSystem.writeAsStringAsync(fileUri, csvContent)

      // Share the file
      await Sharing.shareAsync(fileUri, {
        mimeType: "text/csv",
        dialogTitle: "Export Teams Data",
        UTI: "public.comma-separated-values-text",
      })
    } catch (error) {
      console.error("Error exporting teams data:", error)
    }
  }

  const sendEmailToTeam = async () => {
    if (!selectedTeam) return

    try {
      setSendingEmail(true)

      const emailAddresses = selectedTeam.members.map((member) => member.email).join(",")

      const isAvailable = await MailComposer.isAvailableAsync()
      if (!isAvailable) {
        Alert.alert("Error", "Email is not available on this device")
        return
      }

      await MailComposer.composeAsync({
        recipients: [emailAddresses],
        subject: emailSubject,
        body: emailBody,
      })

      setEmailModalVisible(false)
      setEmailSubject("")
      setEmailBody("")
      setSelectedTeam(null)
    } catch (error) {
      console.error("Error sending email:", error)
      Alert.alert("Error", "Failed to send email")
    } finally {
      setSendingEmail(false)
    }
  }

  const departments = ["All", "Engineering", "Design", "Marketing", "Sales", "Operations"]

  const styles = StyleSheet.create({
    container: {
      padding: 16,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },
    title: {
      fontSize: 20,
      fontWeight: "600",
      color: colors.text,
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
    actionButton: {
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
    tableHeader: {
      flexDirection: "row",
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: colors.cardBackground,
      borderRadius: 8,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    tableHeaderCell: {
      flexDirection: "row",
      alignItems: "center",
    },
    tableHeaderText: {
      fontWeight: "600",
      color: colors.text,
      marginRight: 4,
    },
    teamCard: {
      marginBottom: 12,
    },
    teamCardContent: {
      padding: 16,
    },
    teamHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 8,
    },
    teamName: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.text,
    },
    teamDepartment: {
      color: colors.textSecondary,
    },
    teamStats: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 8,
    },
    teamStat: {
      alignItems: "center",
    },
    teamStatValue: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
    },
    teamStatLabel: {
      fontSize: 12,
      color: colors.textSecondary,
    },
    teamActions: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 12,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    teamAction: {
      flexDirection: "row",
      alignItems: "center",
      padding: 8,
    },
    teamActionText: {
      color: colors.primary,
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
    modalContent: {
      padding: 16,
    },
    modalLabel: {
      fontSize: 16,
      fontWeight: "500",
      color: colors.text,
      marginBottom: 8,
    },
    modalInput: {
      marginBottom: 16,
    },
    modalActions: {
      flexDirection: "row",
      justifyContent: "flex-end",
      gap: 8,
      marginTop: 16,
    },
    emailTeamName: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 16,
    },
    emailRecipients: {
      backgroundColor: `${colors.primary}10`,
      padding: 12,
      borderRadius: 8,
      marginBottom: 16,
    },
    emailRecipientsText: {
      color: colors.text,
    },
    emailRecipientsHighlight: {
      color: colors.primary,
      fontWeight: "500",
    },
  })

  const renderTeamItem = ({ item }: { item: Team }) => (
    <Card style={styles.teamCard}>
      <View style={styles.teamCardContent}>
        <View style={styles.teamHeader}>
          <View>
            <Text style={styles.teamName}>{item.name}</Text>
            <Text style={styles.teamDepartment}>{item.department}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <CheckCircle2 size={16} color={colors.success} style={{ marginRight: 4 }} />
            <Text style={{ color: colors.success }}>{item.completionRate}%</Text>
          </View>
        </View>

        <View style={styles.teamStats}>
          <View style={styles.teamStat}>
            <Text style={styles.teamStatValue}>{item.members.length}</Text>
            <Text style={styles.teamStatLabel}>Members</Text>
          </View>
          <View style={styles.teamStat}>
            <Text style={styles.teamStatValue}>{item.projects}</Text>
            <Text style={styles.teamStatLabel}>Projects</Text>
          </View>
          <View style={styles.teamStat}>
            <Text style={styles.teamStatValue}>{item.completed}</Text>
            <Text style={styles.teamStatLabel}>Completed</Text>
          </View>
          <View style={styles.teamStat}>
            <Text style={styles.teamStatValue}>{item.inProgress}</Text>
            <Text style={styles.teamStatLabel}>In Progress</Text>
          </View>
        </View>

        <View style={styles.teamActions}>
          <TouchableOpacity
            style={styles.teamAction}
            onPress={() => {
              setSelectedTeam(item)
              setEmailModalVisible(true)
            }}
          >
            <Mail size={16} color={colors.primary} />
            <Text style={styles.teamActionText}>Email</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.teamAction}>
            <Calendar size={16} color={colors.primary} />
            <Text style={styles.teamActionText}>Schedule</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.teamAction}>
            <Users size={16} color={colors.primary} />
            <Text style={styles.teamActionText}>Members</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.teamAction}>
            <ChevronRight size={16} color={colors.primary} />
            <Text style={styles.teamActionText}>Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  )

  return (
    <Layout>
      <Header title="Teams" />
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Search size={20} color={colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search teams..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.actionButton} onPress={() => setFilterModalVisible(true)}>
            <Filter size={20} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={exportTeamsData}>
            <Download size={20} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton}>
            <Plus size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.filterChipsContainer}>
          {departments.map((department) => (
            <TouchableOpacity
              key={department}
              style={[styles.filterChip, departmentFilter === department && styles.filterChipActive]}
              onPress={() => setDepartmentFilter(department)}
            >
              <Text style={[styles.filterChipText, departmentFilter === department && styles.filterChipTextActive]}>
                {department}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.tableHeader}>
          <TouchableOpacity style={[styles.tableHeaderCell, { flex: 2 }]} onPress={() => handleSort("name")}>
            <Text style={styles.tableHeaderText}>Team</Text>
            <ArrowUpDown size={16} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tableHeaderCell, { flex: 1 }]} onPress={() => handleSort("members")}>
            <Text style={styles.tableHeaderText}>Members</Text>
            <ArrowUpDown size={16} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tableHeaderCell, { flex: 1 }]} onPress={() => handleSort("projects")}>
            <Text style={styles.tableHeaderText}>Projects</Text>
            <ArrowUpDown size={16} color={colors.text} />
          </TouchableOpacity>
        </View>

        {isLoading ? (
          <View style={{ padding: 40 }}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : filteredTeams.length > 0 ? (
          <FlatList
            data={filteredTeams}
            renderItem={renderTeamItem}
            keyExtractor={(item) => item.id.toString()}
            onRefresh={handleRefresh}
            refreshing={isRefreshing}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No teams found matching your criteria</Text>
            <Button
              title="Reset Filters"
              onPress={() => {
                setSearchQuery("")
                setDepartmentFilter("All")
              }}
            />
          </View>
        )}
      </View>

      <Modal
        visible={emailModalVisible}
        onClose={() => {
          if (!sendingEmail) {
            setEmailModalVisible(false)
            setSelectedTeam(null)
            setEmailSubject("")
            setEmailBody("")
          }
        }}
        title="Send Email to Team"
      >
        <View style={styles.modalContent}>
          {selectedTeam && (
            <>
              <Text style={styles.emailTeamName}>{selectedTeam.name}</Text>
              <View style={styles.emailRecipients}>
                <Text style={styles.emailRecipientsText}>
                  Recipients:{" "}
                  <Text style={styles.emailRecipientsHighlight}>
                    {selectedTeam.members.map((m) => m.name).join(", ")}
                  </Text>
                </Text>
              </View>

              <Text style={styles.modalLabel}>Subject</Text>
              <Input
                placeholder="Enter email subject"
                value={emailSubject}
                onChangeText={setEmailSubject}
                style={styles.modalInput}
              />

              <Text style={styles.modalLabel}>Message</Text>
              <Input
                placeholder="Enter your message"
                value={emailBody}
                onChangeText={setEmailBody}
                multiline
                numberOfLines={4}
                style={[styles.modalInput, { height: 100, textAlignVertical: "top" }]}
              />

              <View style={styles.modalActions}>
                <Button
                  variant="outline"
                  title="Cancel"
                  onPress={() => {
                    setEmailModalVisible(false)
                    setSelectedTeam(null)
                    setEmailSubject("")
                    setEmailBody("")
                  }}
                  disabled={sendingEmail}
                  style={{ marginRight: 8 }}
                />
                <Button
                  title="Send Email"
                  onPress={sendEmailToTeam}
                  isLoading={sendingEmail}
                  loadingText="Sending..."
                />
              </View>
            </>
          )}
        </View>
      </Modal>
    </Layout>
  )
}
