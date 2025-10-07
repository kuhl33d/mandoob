"use client"

import { useState, useEffect } from "react"
import { View, Text, ScrollView, RefreshControl, StyleSheet, TouchableOpacity, Dimensions } from "react-native"
import { Layout } from "@/components/Layout"
import { Header } from "@/components/Header"
import { Card } from "@/components/Card"
import { useAuth } from "@/context/auth-context"
import { useTheme } from "@/context/theme-context"
import { Users, Layers, TrendingUp, Calendar } from "lucide-react-native"
import { LineChart, BarChart, PieChart } from "react-native-chart-kit"
import { useRouter } from "expo-router"

export default function Dashboard() {
  const { user } = useAuth()
  const { colors } = useTheme()
  const [refreshing, setRefreshing] = useState(false)
  const [activeProjects, setActiveProjects] = useState(12)
  const [totalTeams, setTotalTeams] = useState(8)
  const [upcomingDeadlines, setUpcomingDeadlines] = useState(5)
  const router = useRouter()
  const screenWidth = Dimensions.get("window").width - 32

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setActiveProjects(Math.floor(Math.random() * 5) + 10)
      setTotalTeams(Math.floor(Math.random() * 3) + 7)
      setUpcomingDeadlines(Math.floor(Math.random() * 3) + 4)
    }, 5000)

    return () => clearTimeout(timer)
  }, [refreshing])

  const onRefresh = async () => {
    setRefreshing(true)
    // Simulate data fetching
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setRefreshing(false)
  }

  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  }

  const projectStatusData = {
    labels: ["Completed", "In Progress", "Planning", "On Hold"],
    datasets: [
      {
        data: [35, 45, 15, 5],
      },
    ],
  }

  const teamPerformanceData = {
    labels: ["Team A", "Team B", "Team C", "Team D"],
    datasets: [
      {
        data: [80, 65, 90, 75],
      },
    ],
  }

  const pieData = [
    {
      name: "Design",
      population: 25,
      color: "#FF6384",
      legendFontColor: colors.text,
      legendFontSize: 12,
    },
    {
      name: "Development",
      population: 40,
      color: "#36A2EB",
      legendFontColor: colors.text,
      legendFontSize: 12,
    },
    {
      name: "Marketing",
      population: 20,
      color: "#FFCE56",
      legendFontColor: colors.text,
      legendFontSize: 12,
    },
    {
      name: "Research",
      population: 15,
      color: "#4BC0C0",
      legendFontColor: colors.text,
      legendFontSize: 12,
    },
  ]

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

  const styles = StyleSheet.create({
    container: {
      padding: 16,
    },
    welcomeText: {
      fontSize: 20,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 8,
    },
    subtitleText: {
      color: colors.textSecondary,
      marginBottom: 24,
    },
    row: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginHorizontal: -8,
    },
    col: {
      width: "50%",
      paddingHorizontal: 8,
      marginBottom: 16,
    },
    cardHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 8,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.text,
    },
    cardValue: {
      fontSize: 24,
      fontWeight: "700",
      color: colors.text,
    },
    cardTrend: {
      fontSize: 14,
      color: colors.success,
    },
    cardTrendNegative: {
      fontSize: 14,
      color: colors.error,
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
    activityCard: {
      marginBottom: 24,
    },
    activityTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 16,
    },
    activityItem: {
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    activityItemLast: {
      borderBottomWidth: 0,
    },
    activityItemTitle: {
      color: colors.text,
      fontWeight: "500",
    },
    activityItemTime: {
      color: colors.textSecondary,
      fontSize: 14,
    },
    viewMoreButton: {
      alignSelf: "center",
      marginTop: 16,
      paddingVertical: 8,
      paddingHorizontal: 16,
      backgroundColor: `${colors.primary}20`,
      borderRadius: 20,
    },
    viewMoreText: {
      color: colors.primary,
      fontWeight: "500",
    },
    notificationBadge: {
      position: "absolute",
      top: -5,
      right: -5,
      backgroundColor: colors.error,
      borderRadius: 10,
      width: 20,
      height: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    notificationText: {
      color: "#fff",
      fontSize: 12,
      fontWeight: "bold",
    },
  })

  return (
    <Layout>
      <Header
        title="Dashboard"
        showNotification
        notificationCount={3}
        onNotificationPress={() => {
          // Handle notification press
        }}
      />
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.welcomeText}>Welcome back, {user?.name}</Text>
          <Text style={styles.subtitleText}>Here's what's happening with your projects today.</Text>

          <View style={styles.row}>
            <View style={styles.col}>
              <Card>
                <TouchableOpacity onPress={() => router.push("/teams")}>
                  <View style={{ padding: 16 }}>
                    <View style={styles.cardHeader}>
                      <Text style={styles.cardTitle}>Teams</Text>
                      <Users size={20} color={colors.primary} />
                    </View>
                    <Text style={styles.cardValue}>{totalTeams}</Text>
                    <Text style={styles.cardTrend}>+2 new this month</Text>
                  </View>
                </TouchableOpacity>
              </Card>
            </View>

            <View style={styles.col}>
              <Card>
                <TouchableOpacity onPress={() => router.push("/analytics")}>
                  <View style={{ padding: 16 }}>
                    <View style={styles.cardHeader}>
                      <Text style={styles.cardTitle}>Revenue</Text>
                      <TrendingUp size={20} color={colors.primary} />
                    </View>
                    <Text style={styles.cardValue}>$142,580</Text>
                    <Text style={styles.cardTrend}>+8.2% from last month</Text>
                  </View>
                </TouchableOpacity>
              </Card>
            </View>

            <View style={styles.col}>
              <Card>
                <TouchableOpacity onPress={() => router.push("/companies")}>
                  <View style={{ padding: 16 }}>
                    <View style={styles.cardHeader}>
                      <Text style={styles.cardTitle}>Projects</Text>
                      <Layers size={20} color={colors.primary} />
                    </View>
                    <Text style={styles.cardValue}>{activeProjects}</Text>
                    <Text style={styles.cardTrend}>+3 new this week</Text>
                  </View>
                </TouchableOpacity>
              </Card>
            </View>

            <View style={styles.col}>
              <Card>
                <TouchableOpacity>
                  <View style={{ padding: 16 }}>
                    <View style={styles.cardHeader}>
                      <Text style={styles.cardTitle}>Deadlines</Text>
                      <Calendar size={20} color={colors.primary} />
                    </View>
                    <Text style={styles.cardValue}>{upcomingDeadlines}</Text>
                    <Text style={styles.cardTrendNegative}>Due this week</Text>
                  </View>
                </TouchableOpacity>
              </Card>
            </View>
          </View>

          <Card style={styles.chartCard}>
            <Text style={styles.chartTitle}>Monthly Revenue</Text>
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
            <Text style={styles.chartTitle}>Team Performance</Text>
            <BarChart
              data={teamPerformanceData}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
              style={{ borderRadius: 8 }}
              fromZero
            />
          </Card>

          <Card style={styles.chartCard}>
            <Text style={styles.chartTitle}>Project Allocation</Text>
            <PieChart
              data={pieData}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          </Card>

          <Card style={styles.activityCard}>
            <View style={{ padding: 16 }}>
              <Text style={styles.activityTitle}>Recent Activity</Text>
              {[
                "New team member added to Project Alpha",
                "Client meeting scheduled for Project Beta",
                "Milestone completed for Project Gamma",
                "Budget approved for new marketing campaign",
              ].map((item, index, arr) => (
                <View key={index} style={[styles.activityItem, index === arr.length - 1 && styles.activityItemLast]}>
                  <Text style={styles.activityItemTitle}>{item}</Text>
                  <Text style={styles.activityItemTime}>{Math.floor(Math.random() * 12) + 1} hours ago</Text>
                </View>
              ))}
              <TouchableOpacity style={styles.viewMoreButton} onPress={() => router.push("/analytics")}>
                <Text style={styles.viewMoreText}>View Detailed Analytics</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      </ScrollView>
    </Layout>
  )
}
