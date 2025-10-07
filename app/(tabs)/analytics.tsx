"use client"

import { useState } from "react"
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from "react-native"
import { Layout } from "@/components/Layout"
import { Header } from "@/components/Header"
import { Card } from "@/components/Card"
import { useTheme } from "@/context/theme-context"
import { LineChart, BarChart, PieChart, ProgressChart } from "react-native-chart-kit"
import { Calendar, Download, Filter, TrendingUp, TrendingDown } from "lucide-react-native"
import * as Sharing from "expo-sharing"
import * as FileSystem from "expo-file-system"

export default function Analytics() {
  const { colors } = useTheme()
  const [timeRange, setTimeRange] = useState("month")
  const screenWidth = Dimensions.get("window").width - 32

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
        color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: [15, 35, 20, 60, 85, 35],
        color: (opacity = 1) => `rgba(239, 68, 68, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ["2023", "2022"],
  }

  const expensesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [12, 25, 18, 40, 50, 30],
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

  const progressData = {
    labels: ["Project A", "Project B", "Project C", "Project D"],
    data: [0.8, 0.6, 0.9, 0.7],
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

  const exportData = async () => {
    try {
      // Create a CSV string
      const csvData = `Month,Revenue 2023,Revenue 2022,Expenses
Jan,20,15,12
Feb,45,35,25
Mar,28,20,18
Apr,80,60,40
May,99,85,50
Jun,43,35,30`

      // Create a temporary file
      const fileUri = FileSystem.documentDirectory + "analytics_data.csv"
      await FileSystem.writeAsStringAsync(fileUri, csvData)

      // Share the file
      await Sharing.shareAsync(fileUri, {
        mimeType: "text/csv",
        dialogTitle: "Export Analytics Data",
        UTI: "public.comma-separated-values-text",
      })
    } catch (error) {
      console.error("Error exporting data:", error)
    }
  }

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
    filterContainer: {
      flexDirection: "row",
      marginBottom: 24,
      backgroundColor: colors.cardBackground,
      borderRadius: 8,
      padding: 4,
    },
    filterButton: {
      flex: 1,
      paddingVertical: 8,
      alignItems: "center",
      borderRadius: 6,
    },
    filterButtonActive: {
      backgroundColor: colors.primary,
    },
    filterText: {
      color: colors.textSecondary,
      fontWeight: "500",
    },
    filterTextActive: {
      color: "#fff",
    },
    actionButtons: {
      flexDirection: "row",
      marginBottom: 24,
      gap: 8,
    },
    actionButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.cardBackground,
      paddingHorizontal: 16,
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
    summaryRow: {
      flexDirection: "row",
      marginBottom: 24,
      gap: 12,
    },
    summaryCard: {
      flex: 1,
      padding: 16,
      borderRadius: 8,
      backgroundColor: colors.cardBackground,
      borderWidth: 1,
      borderColor: colors.border,
    },
    summaryTitle: {
      color: colors.textSecondary,
      marginBottom: 8,
    },
    summaryValue: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.text,
    },
    summaryTrend: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 4,
    },
    summaryTrendUp: {
      color: colors.success,
      fontSize: 12,
    },
    summaryTrendDown: {
      color: colors.error,
      fontSize: 12,
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
    chartDescription: {
      color: colors.textSecondary,
      marginTop: 8,
    },
  })

  return (
    <Layout>
      <Header title="Analytics" showBack />
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Business Performance</Text>
            <TouchableOpacity onPress={() => {}}>
              <Calendar size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          <View style={styles.filterContainer}>
            <TouchableOpacity
              style={[styles.filterButton, timeRange === "week" && styles.filterButtonActive]}
              onPress={() => setTimeRange("week")}
            >
              <Text style={[styles.filterText, timeRange === "week" && styles.filterTextActive]}>Week</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterButton, timeRange === "month" && styles.filterButtonActive]}
              onPress={() => setTimeRange("month")}
            >
              <Text style={[styles.filterText, timeRange === "month" && styles.filterTextActive]}>Month</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterButton, timeRange === "quarter" && styles.filterButtonActive]}
              onPress={() => setTimeRange("quarter")}
            >
              <Text style={[styles.filterText, timeRange === "quarter" && styles.filterTextActive]}>Quarter</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterButton, timeRange === "year" && styles.filterButtonActive]}
              onPress={() => setTimeRange("year")}
            >
              <Text style={[styles.filterText, timeRange === "year" && styles.filterTextActive]}>Year</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton} onPress={exportData}>
              <Download size={18} color={colors.text} />
              <Text style={styles.actionButtonText}>Export</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Filter size={18} color={colors.text} />
              <Text style={styles.actionButtonText}>Filter</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.summaryRow}>
            <Card style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Revenue</Text>
              <Text style={styles.summaryValue}>$142,580</Text>
              <View style={styles.summaryTrend}>
                <TrendingUp size={14} color={colors.success} style={{ marginRight: 4 }} />
                <Text style={styles.summaryTrendUp}>+12.5%</Text>
              </View>
            </Card>
            <Card style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Expenses</Text>
              <Text style={styles.summaryValue}>$87,325</Text>
              <View style={styles.summaryTrend}>
                <TrendingDown size={14} color={colors.error} style={{ marginRight: 4 }} />
                <Text style={styles.summaryTrendDown}>-3.2%</Text>
              </View>
            </Card>
            <Card style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Profit</Text>
              <Text style={styles.summaryValue}>$55,255</Text>
              <View style={styles.summaryTrend}>
                <TrendingUp size={14} color={colors.success} style={{ marginRight: 4 }} />
                <Text style={styles.summaryTrendUp}>+8.7%</Text>
              </View>
            </Card>
          </View>

          <Card style={styles.chartCard}>
            <Text style={styles.chartTitle}>Revenue Comparison</Text>
            <LineChart
              data={revenueData}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={{ borderRadius: 8 }}
              legend={["2023", "2022"]}
            />
            <Text style={styles.chartDescription}>
              Revenue is trending upward compared to last year with a 15% overall increase.
            </Text>
          </Card>

          <Card style={styles.chartCard}>
            <Text style={styles.chartTitle}>Monthly Expenses</Text>
            <BarChart
              data={expensesData}
              width={screenWidth}
              height={220}
              chartConfig={{
                ...chartConfig,
                color: (opacity = 1) => `rgba(239, 68, 68, ${opacity})`,
              }}
              style={{ borderRadius: 8 }}
              fromZero
            />
            <Text style={styles.chartDescription}>
              Expenses peaked in May due to new equipment purchases and marketing campaigns.
            </Text>
          </Card>

          <Card style={styles.chartCard}>
            <Text style={styles.chartTitle}>Project Status Distribution</Text>
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
            <Text style={styles.chartDescription}>
              Development projects make up the largest portion of our current workload.
            </Text>
          </Card>

          <Card style={styles.chartCard}>
            <Text style={styles.chartTitle}>Project Completion Rate</Text>
            <ProgressChart
              data={progressData}
              width={screenWidth}
              height={220}
              chartConfig={{
                ...chartConfig,
                color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
              }}
              style={{ borderRadius: 8 }}
            />
            <Text style={styles.chartDescription}>
              Project C has the highest completion rate at 90%, while Project B is behind schedule.
            </Text>
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
            <Text style={styles.chartDescription}>
              Team C is our highest performing team with a 90% efficiency rating.
            </Text>
          </Card>
        </View>
      </ScrollView>
    </Layout>
  )
}
