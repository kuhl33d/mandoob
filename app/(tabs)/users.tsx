"use client"

import { useState, useEffect } from "react"
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native"
import { Layout } from "@/components/Layout"
import { Header } from "@/components/Header"
import { Card } from "@/components/Card"
import { Input } from "@/components/Input"
import { Button } from "@/components/Button"
import { Search, Filter, User, Mail, Phone } from "lucide-react-native"
import { Modal } from "@/components/Modal"
import { userService } from "@/api/services/user-service"
import { useTheme } from "@/context/theme-context"
import type { User as UserType } from "@/types"

export default function Users() {
  const [users, setUsers] = useState<UserType[]>([])
  const [filteredUsers, setFilteredUsers] = useState<UserType[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null)
  const [filterModalVisible, setFilterModalVisible] = useState(false)
  const { colors } = useTheme()

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    if (searchQuery) {
      const filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredUsers(filtered)
    } else {
      setFilteredUsers(users)
    }
  }, [searchQuery, users])

  const fetchUsers = async () => {
    try {
      setIsLoading(true)
      const data = await userService.getUsers()
      setUsers(data)
      setFilteredUsers(data)
    } catch (error) {
      console.error("Error fetching users:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await fetchUsers()
    setIsRefreshing(false)
  }

  const handleUserPress = (user: UserType) => {
    setSelectedUser(user)
  }

  const styles = StyleSheet.create({
    container: {
      padding: 16,
      paddingTop: 8,
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginBottom: 16,
    },
    searchInput: {
      flex: 1,
    },
    loadingContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 80,
    },
    emptyContainer: {
      paddingVertical: 80,
      alignItems: "center",
    },
    emptyText: {
      color: colors.textSecondary,
      textAlign: "center",
    },
    userCard: {
      marginBottom: 12,
    },
    userCardContent: {
      padding: 16,
      flexDirection: "row",
      alignItems: "center",
    },
    userAvatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: `${colors.primary}20`,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 16,
    },
    userName: {
      color: colors.text,
      fontWeight: "600",
      fontSize: 16,
    },
    userEmail: {
      color: colors.textSecondary,
    },
    userDetailsContainer: {
      flex: 1,
    },
    userDetailsCentered: {
      alignItems: "center",
      marginBottom: 24,
    },
    userDetailsAvatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: `${colors.primary}20`,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 8,
    },
    userDetailsName: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.text,
    },
    userDetailsRole: {
      color: colors.textSecondary,
    },
    userDetailsInfo: {
      gap: 16,
    },
    userDetailsInfoRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    userDetailsInfoIcon: {
      marginRight: 12,
    },
    userDetailsInfoLabel: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    userDetailsInfoValue: {
      color: colors.text,
    },
    userDetailsActions: {
      flexDirection: "row",
      gap: 8,
      marginTop: 24,
    },
    filterChip: {
      marginRight: 8,
      marginBottom: 8,
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 16,
      backgroundColor: `${colors.primary}20`,
    },
    filterChipText: {
      color: colors.primary,
    },
    filterSection: {
      marginBottom: 16,
    },
    filterSectionTitle: {
      color: colors.text,
      fontWeight: "500",
      marginBottom: 8,
    },
    filterChipsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    filterActions: {
      flexDirection: "row",
      gap: 8,
      marginTop: 16,
    },
  })

  const renderUserItem = ({ item }: { item: UserType }) => (
    <TouchableOpacity onPress={() => handleUserPress(item)}>
      <Card style={styles.userCard}>
        <View style={styles.userCardContent}>
          <View style={styles.userAvatar}>
            <User size={24} color={colors.primary} />
          </View>
          <View style={styles.userDetailsContainer}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.userEmail}>{item.email}</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  )

  return (
    <Layout>
      <Header title="Users" />

      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            leftIcon={<Search size={20} color={colors.textSecondary} />}
            style={styles.searchInput}
          />
          <Button
            variant="outline"
            size="icon"
            onPress={() => setFilterModalVisible(true)}
            icon={<Filter size={20} color={colors.text} />}
          />
        </View>

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          <FlatList
            data={filteredUsers}
            renderItem={renderUserItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 20 }}
            onRefresh={handleRefresh}
            refreshing={isRefreshing}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No users found</Text>
              </View>
            }
          />
        )}
      </View>

      <Modal visible={!!selectedUser} onClose={() => setSelectedUser(null)} title="User Details">
        {selectedUser && (
          <View style={{ padding: 16 }}>
            <View style={styles.userDetailsCentered}>
              <View style={styles.userDetailsAvatar}>
                <User size={40} color={colors.primary} />
              </View>
              <Text style={styles.userDetailsName}>{selectedUser.name}</Text>
              <Text style={styles.userDetailsRole}>{selectedUser.role}</Text>
            </View>

            <View style={styles.userDetailsInfo}>
              <View style={styles.userDetailsInfoRow}>
                <Mail size={20} color={colors.textSecondary} style={styles.userDetailsInfoIcon} />
                <View>
                  <Text style={styles.userDetailsInfoLabel}>Email</Text>
                  <Text style={styles.userDetailsInfoValue}>{selectedUser.email}</Text>
                </View>
              </View>

              <View style={styles.userDetailsInfoRow}>
                <Phone size={20} color={colors.textSecondary} style={styles.userDetailsInfoIcon} />
                <View>
                  <Text style={styles.userDetailsInfoLabel}>Phone</Text>
                  <Text style={styles.userDetailsInfoValue}>{selectedUser.phone || "Not provided"}</Text>
                </View>
              </View>
            </View>

            <View style={styles.userDetailsActions}>
              <Button variant="outline" title="Close" style={{ flex: 1 }} onPress={() => setSelectedUser(null)} />
              <Button title="Edit User" style={{ flex: 1 }} />
            </View>
          </View>
        )}
      </Modal>

      <Modal visible={filterModalVisible} onClose={() => setFilterModalVisible(false)} title="Filter Users">
        <View style={{ padding: 16 }}>
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Role</Text>
            <View style={styles.filterChipsContainer}>
              {["All", "Admin", "User", "Editor"].map((role) => (
                <TouchableOpacity key={role} style={styles.filterChip}>
                  <Text style={styles.filterChipText}>{role}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Status</Text>
            <View style={styles.filterChipsContainer}>
              {["All", "Active", "Inactive"].map((status) => (
                <TouchableOpacity key={status} style={styles.filterChip}>
                  <Text style={styles.filterChipText}>{status}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.filterActions}>
            <Button variant="outline" title="Cancel" style={{ flex: 1 }} onPress={() => setFilterModalVisible(false)} />
            <Button title="Apply Filters" style={{ flex: 1 }} onPress={() => setFilterModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </Layout>
  )
}
