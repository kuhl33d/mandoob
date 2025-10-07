"use client"

import { View, Text, ScrollView, Switch, TouchableOpacity, StyleSheet } from "react-native"
import { Layout } from "@/components/Layout"
import { Header } from "@/components/Header"
import { Card } from "@/components/Card"
import { useTheme } from "@/context/theme-context"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/Button"
import { Moon, Sun, Bell, Shield, Globe, HelpCircle, LogOut, ChevronRight } from "lucide-react-native"
import Toast from "react-native-toast-message"

export default function Settings() {
  const { theme, setTheme, colors } = useTheme()
  const { signOut, user } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
      Toast.show({
        type: "success",
        text1: "Signed Out",
        text2: "You have been successfully signed out",
      })
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to sign out",
      })
    }
  }

  const styles = StyleSheet.create({
    container: {
      padding: 16,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 8,
    },
    sectionContainer: {
      marginBottom: 24,
    },
    profileContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
    },
    profileAvatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: `${colors.primary}20`,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 16,
    },
    profileAvatarText: {
      color: colors.primary,
      fontSize: 18,
      fontWeight: "700",
    },
    profileName: {
      color: colors.text,
      fontWeight: "600",
    },
    profileEmail: {
      color: colors.textSecondary,
    },
    menuItem: {
      padding: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    menuItemLast: {
      borderBottomWidth: 0,
    },
    menuItemLeft: {
      flexDirection: "row",
      alignItems: "center",
    },
    menuItemIcon: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: `${colors.primary}20`,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 12,
    },
    menuItemText: {
      color: colors.text,
    },
    menuItemRight: {
      flexDirection: "row",
      alignItems: "center",
    },
    menuItemRightText: {
      color: colors.textSecondary,
      marginRight: 8,
    },
    signOutButton: {
      marginBottom: 32,
    },
  })

  return (
    <Layout>
      <Header title="Settings" />
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Account</Text>
            <Card>
              <View style={{ padding: 16 }}>
                <View style={styles.profileContainer}>
                  <View style={styles.profileAvatar}>
                    <Text style={styles.profileAvatarText}>{user?.name?.charAt(0) || "U"}</Text>
                  </View>
                  <View>
                    <Text style={styles.profileName}>{user?.name}</Text>
                    <Text style={styles.profileEmail}>{user?.email}</Text>
                  </View>
                </View>
                <Button variant="outline" title="Edit Profile" />
              </View>
            </Card>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            <Card>
              <View>
                <TouchableOpacity style={styles.menuItem}>
                  <View style={styles.menuItemLeft}>
                    <View style={styles.menuItemIcon}>
                      {theme === "dark" ? (
                        <Moon size={18} color={colors.primary} />
                      ) : (
                        <Sun size={18} color={colors.primary} />
                      )}
                    </View>
                    <Text style={styles.menuItemText}>Dark Mode</Text>
                  </View>
                  <Switch
                    value={theme === "dark"}
                    onValueChange={(value) => setTheme(value ? "dark" : "light")}
                    trackColor={{ false: "#e5e7eb", true: "#93c5fd" }}
                    thumbColor={theme === "dark" ? "#2563eb" : "#f3f4f6"}
                  />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                  <View style={styles.menuItemLeft}>
                    <View style={styles.menuItemIcon}>
                      <Bell size={18} color={colors.primary} />
                    </View>
                    <Text style={styles.menuItemText}>Notifications</Text>
                  </View>
                  <ChevronRight size={20} color={colors.textSecondary} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItemLast}>
                  <View style={styles.menuItemLeft}>
                    <View style={styles.menuItemIcon}>
                      <Globe size={18} color={colors.primary} />
                    </View>
                    <Text style={styles.menuItemText}>Language</Text>
                  </View>
                  <View style={styles.menuItemRight}>
                    <Text style={styles.menuItemRightText}>English</Text>
                    <ChevronRight size={20} color={colors.textSecondary} />
                  </View>
                </TouchableOpacity>
              </View>
            </Card>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Security</Text>
            <Card>
              <View>
                <TouchableOpacity style={styles.menuItem}>
                  <View style={styles.menuItemLeft}>
                    <View style={styles.menuItemIcon}>
                      <Shield size={18} color={colors.primary} />
                    </View>
                    <Text style={styles.menuItemText}>Change Password</Text>
                  </View>
                  <ChevronRight size={20} color={colors.textSecondary} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItemLast}>
                  <View style={styles.menuItemLeft}>
                    <View style={styles.menuItemIcon}>
                      <Shield size={18} color={colors.primary} />
                    </View>
                    <Text style={styles.menuItemText}>Two-Factor Authentication</Text>
                  </View>
                  <Switch
                    value={false}
                    onValueChange={() => {}}
                    trackColor={{ false: "#e5e7eb", true: "#93c5fd" }}
                    thumbColor={"#f3f4f6"}
                  />
                </TouchableOpacity>
              </View>
            </Card>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Support</Text>
            <Card>
              <View>
                <TouchableOpacity style={styles.menuItem}>
                  <View style={styles.menuItemLeft}>
                    <View style={styles.menuItemIcon}>
                      <HelpCircle size={18} color={colors.primary} />
                    </View>
                    <Text style={styles.menuItemText}>Help Center</Text>
                  </View>
                  <ChevronRight size={20} color={colors.textSecondary} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItemLast}>
                  <View style={styles.menuItemLeft}>
                    <View style={styles.menuItemIcon}>
                      <HelpCircle size={18} color={colors.primary} />
                    </View>
                    <Text style={styles.menuItemText}>Contact Support</Text>
                  </View>
                  <ChevronRight size={20} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>
            </Card>
          </View>

          <Button
            variant="destructive"
            title="Sign Out"
            icon={<LogOut size={18} color="#fff" style={{ marginRight: 8 }} />}
            style={styles.signOutButton}
            onPress={handleSignOut}
          />
        </View>
      </ScrollView>
    </Layout>
  )
}
