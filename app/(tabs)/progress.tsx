import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function ProgressScreen() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'jumps', label: 'Jumps' },
    { id: 'workouts', label: 'Workouts' },
    { id: 'achievements', label: 'Awards' },
  ];

  const progressStats = {
    currentVertical: 28.5,
    previousVertical: 26.2,
    improvement: 2.3,
    totalWorkouts: 47,
    currentStreak: 7,
    bestStreak: 12,
    totalJumps: 1247,
    averageJump: 26.8,
  };

  const recentJumps = [
    { date: 'Today', height: 28.5, improvement: +0.3, isPR: true },
    { date: 'Yesterday', height: 28.2, improvement: +0.1, isPR: false },
    { date: '2 days ago', height: 28.1, improvement: -0.2, isPR: false },
    { date: '3 days ago', height: 28.3, improvement: +0.4, isPR: false },
    { date: '4 days ago', height: 27.9, improvement: +0.2, isPR: false },
  ];

  const weeklyData = [
    { day: 'Mon', value: 27.2 },
    { day: 'Tue', value: 27.8 },
    { day: 'Wed', value: 28.1 },
    { day: 'Thu', value: 27.9 },
    { day: 'Fri', value: 28.3 },
    { day: 'Sat', value: 28.2 },
    { day: 'Sun', value: 28.5 },
  ];

  const achievements = [
    { 
      id: 1, 
      title: 'First PR!', 
      description: 'Beat your personal record', 
      icon: '🎯', 
      unlockedAt: 'Today',
      rarity: 'common'
    },
    { 
      id: 2, 
      title: 'Week Warrior', 
      description: '7 days in a row', 
      icon: '🔥', 
      unlockedAt: 'Today',
      rarity: 'rare'
    },
    { 
      id: 3, 
      title: 'Jump Master', 
      description: '1000+ total jumps', 
      icon: '🏆', 
      unlockedAt: '2 days ago',
      rarity: 'epic'
    },
    { 
      id: 4, 
      title: 'Form Perfect', 
      description: 'Perfect form 5 times', 
      icon: '💪', 
      unlockedAt: '1 week ago',
      rarity: 'rare'
    },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return '#10B981';
      case 'rare': return '#3B82F6';
      case 'epic': return '#A855F7';
      case 'legendary': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const maxHeight = Math.max(...weeklyData.map(d => d.value));
  const minHeight = Math.min(...weeklyData.map(d => d.value));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Progress</Text>
            <Text style={styles.subtitle}>Track your vertical journey</Text>
          </View>
          <TouchableOpacity style={styles.measureButton}>
            <Feather name="camera" size={20} color="white" />
            <Text style={styles.measureButtonText}>Measure</Text>
          </TouchableOpacity>
        </View>

        {/* Main Stats */}
        <View style={styles.mainStats}>
          <LinearGradient
            colors={['#10B981', '#059669']}
            style={styles.mainStatCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.mainStatHeader}>
              <Feather name="award" size={32} color="white" />
              <Text style={styles.mainStatLabel}>Current Best</Text>
            </View>
            <Text style={styles.mainStatValue}>{progressStats.currentVertical}"</Text>
            <View style={styles.improvement}>
              <Feather name="trending-up" size={16} color="white" />
              <Text style={styles.improvementText}>
                +{progressStats.improvement}" this month
              </Text>
            </View>
          </LinearGradient>
        </View>

        {/* Quick Stats */}
        <View style={styles.quickStats}>
          <View style={styles.statItem}>
            <View style={styles.statIcon}>
              <Feather name="zap" size={20} color="#F97316" />
            </View>
            <Text style={styles.statValue}>{progressStats.currentStreak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={styles.statItem}>
            <View style={styles.statIcon}>
              <Feather name="target" size={20} color="#1E40AF" />
            </View>
            <Text style={styles.statValue}>{progressStats.totalWorkouts}</Text>
            <Text style={styles.statLabel}>Workouts</Text>
          </View>
          <View style={styles.statItem}>
            <View style={styles.statIcon}>
              <Feather name="bar-chart-2" size={20} color="#7C3AED" />
            </View>
            <Text style={styles.statValue}>{progressStats.averageJump}"</Text>
            <Text style={styles.statLabel}>Average</Text>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.tabs}>
              {tabs.map((tab) => (
                <TouchableOpacity
                  key={tab.id}
                  style={[
                    styles.tab,
                    activeTab === tab.id && styles.activeTab
                  ]}
                  onPress={() => setActiveTab(tab.id)}
                >
                  <Text style={[
                    styles.tabText,
                    activeTab === tab.id && styles.activeTabText
                  ]}>
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Weekly Progress</Text>
            <View style={styles.chartContainer}>
              <View style={styles.chart}>
                {weeklyData.map((data, index) => (
                  <View key={index} style={styles.chartItem}>
                    <View style={styles.chartBar}>
                      <View 
                        style={[
                          styles.chartBarFill,
                          { 
                            height: `${((data.value - minHeight) / (maxHeight - minHeight)) * 100}%`,
                            backgroundColor: data.value === maxHeight ? '#10B981' : '#374151'
                          }
                        ]}
                      />
                    </View>
                    <Text style={styles.chartLabel}>{data.day}</Text>
                    <Text style={styles.chartValue}>{data.value}"</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}

        {activeTab === 'jumps' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Jumps</Text>
            <View style={styles.jumpsList}>
              {recentJumps.map((jump, index) => (
                <View key={index} style={styles.jumpCard}>
                  <View style={styles.jumpInfo}>
                    <Text style={styles.jumpDate}>{jump.date}</Text>
                    <View style={styles.jumpStats}>
                      <Text style={styles.jumpHeight}>{jump.height}"</Text>
                      <View style={[
                        styles.jumpImprovement,
                        { backgroundColor: jump.improvement > 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)' }
                      ]}>
                        <Text style={[
                          styles.jumpImprovementText,
                          { color: jump.improvement > 0 ? '#10B981' : '#EF4444' }
                        ]}>
                          {jump.improvement > 0 ? '+' : ''}{jump.improvement}"
                        </Text>
                      </View>
                    </View>
                  </View>
                  {jump.isPR && (
                    <View style={styles.prBadge}>
                      <Feather name="award" size={16} color="#F59E0B" />
                      <Text style={styles.prText}>PR</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>
        )}

        {activeTab === 'achievements' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            <View style={styles.achievementsList}>
              {achievements.map((achievement) => (
                <View key={achievement.id} style={styles.achievementCard}>
                  <View style={[
                    styles.achievementIcon,
                    { borderColor: getRarityColor(achievement.rarity) }
                  ]}>
                    <Text style={styles.achievementEmoji}>{achievement.icon}</Text>
                  </View>
                  <View style={styles.achievementInfo}>
                    <Text style={styles.achievementTitle}>{achievement.title}</Text>
                    <Text style={styles.achievementDescription}>{achievement.description}</Text>
                    <Text style={styles.achievementDate}>Unlocked {achievement.unlockedAt}</Text>
                  </View>
                  <View style={[
                    styles.rarityBadge,
                    { backgroundColor: getRarityColor(achievement.rarity) }
                  ]}>
                    <Text style={styles.rarityText}>{achievement.rarity}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 4,
  },
  measureButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  measureButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  mainStats: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  mainStatCard: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  mainStatHeader: {
    alignItems: 'center',
    marginBottom: 12,
  },
  mainStatLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 8,
  },
  mainStatValue: {
    color: 'white',
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  improvement: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  improvementText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  quickStats: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 32,
    gap: 16,
  },
  statItem: {
    flex: 1,
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#374151',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  tabsContainer: {
    marginBottom: 24,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 16,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1F2937',
    borderWidth: 1,
    borderColor: '#374151',
  },
  activeTab: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  tabText: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabText: {
    color: 'white',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  chartContainer: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#374151',
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 120,
  },
  chartItem: {
    flex: 1,
    alignItems: 'center',
  },
  chartBar: {
    width: 20,
    height: 80,
    backgroundColor: '#374151',
    borderRadius: 10,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  chartBarFill: {
    width: '100%',
    borderRadius: 10,
    minHeight: 4,
  },
  chartLabel: {
    color: '#9CA3AF',
    fontSize: 12,
    marginBottom: 2,
  },
  chartValue: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  jumpsList: {
    gap: 12,
  },
  jumpCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  jumpInfo: {
    flex: 1,
  },
  jumpDate: {
    color: '#9CA3AF',
    fontSize: 14,
    marginBottom: 4,
  },
  jumpStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  jumpHeight: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  jumpImprovement: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  jumpImprovementText: {
    fontSize: 12,
    fontWeight: '600',
  },
  prBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  prText: {
    color: '#F59E0B',
    fontSize: 12,
    fontWeight: '600',
  },
  achievementsList: {
    gap: 16,
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  achievementIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    marginRight: 16,
  },
  achievementEmoji: {
    fontSize: 24,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  achievementDescription: {
    color: '#9CA3AF',
    fontSize: 14,
    marginBottom: 4,
  },
  achievementDate: {
    color: '#6B7280',
    fontSize: 12,
  },
  rarityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  rarityText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});