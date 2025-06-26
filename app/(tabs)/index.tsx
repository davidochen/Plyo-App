import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const todayStats = {
    streak: 7,
    bestJump: 28.5,
    weeklyGoal: 75,
    weeklyProgress: 60,
  };

  const quickActions = [
    { 
      id: 1, 
      title: 'Measure Jump', 
      icon: 'camera', 
      color: '#10B981', 
      description: 'Track your vertical'
    },
    { 
      id: 2, 
      title: 'Quick Workout', 
      icon: 'play', 
      color: '#F97316', 
      description: '15 min session'
    },
    { 
      id: 3, 
      title: 'View Progress', 
      icon: 'trending-up', 
      color: '#1E40AF', 
      description: 'See your gains'
    },
    { 
      id: 4, 
      title: 'Friends', 
      icon: 'users', 
      color: '#7C3AED', 
      description: 'Compare progress'
    },
  ];

  const recentAchievements = [
    { title: '7-Day Streak!', date: 'Today', icon: '🔥' },
    { title: 'New PR: 28.5"', date: 'Yesterday', icon: '🎯' },
    { title: 'Form Improved', date: '2 days ago', icon: '💪' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning!</Text>
            <Text style={styles.username}>Ready to jump higher?</Text>
          </View>
          <View style={styles.streakBadge}>
            <Feather name="zap" size={16} color="#F97316" />
            <Text style={styles.streakText}>{todayStats.streak}</Text>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <LinearGradient
            colors={['#10B981', '#059669']}
            style={styles.statCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.statHeader}>
              <Feather name="award" size={24} color="white" />
              <Text style={styles.statLabel}>Best Jump</Text>
            </View>
            <Text style={styles.statValue}>{todayStats.bestJump}"</Text>
            <Text style={styles.statSubtext}>Personal Record</Text>
          </LinearGradient>

          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Feather name="target" size={24} color="#F97316" />
              <Text style={styles.statLabel}>Weekly Goal</Text>
            </View>
            <Text style={styles.statValue}>{todayStats.weeklyProgress}%</Text>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${todayStats.weeklyProgress}%` }
                ]} 
              />
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity key={action.id} style={styles.actionCard}>
                <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                  <Feather name={action.icon} size={24} color="white" />
                </View>
                <Text style={styles.actionTitle}>{action.title}</Text>
                <Text style={styles.actionDescription}>{action.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Achievements</Text>
          <View style={styles.achievementsList}>
            {recentAchievements.map((achievement, index) => (
              <View key={index} style={styles.achievementCard}>
                <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                <View style={styles.achievementInfo}>
                  <Text style={styles.achievementTitle}>{achievement.title}</Text>
                  <Text style={styles.achievementDate}>{achievement.date}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Today's Workout Preview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Workout</Text>
          <LinearGradient
            colors={['#1E40AF', '#1D4ED8']}
            style={styles.workoutCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.workoutHeader}>
              <Feather name="calendar" size={24} color="white" />
              <Text style={styles.workoutTitle}>Explosive Power</Text>
            </View>
            <Text style={styles.workoutDescription}>
              Focus on maximizing your vertical with targeted plyometric exercises
            </Text>
            <View style={styles.workoutStats}>
              <Text style={styles.workoutStat}>⏱️ 20 min</Text>
              <Text style={styles.workoutStat}>🔥 High Intensity</Text>
              <Text style={styles.workoutStat}>📈 Beginner</Text>
            </View>
            <TouchableOpacity style={styles.startButton}>
              <Feather name="play" size={16} color="#1E40AF" />
              <Text style={styles.startButtonText}>Start Workout</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
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
  greeting: {
    fontSize: 16,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  username: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 4,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#F97316',
  },
  streakText: {
    color: '#F97316',
    fontWeight: 'bold',
    marginLeft: 4,
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 16,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#374151',
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statLabel: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  statValue: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statSubtext: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#374151',
    borderRadius: 2,
    marginTop: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#F97316',
    borderRadius: 2,
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
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  actionCard: {
    width: (width - 56) / 2,
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#374151',
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  actionDescription: {
    color: '#9CA3AF',
    fontSize: 12,
    textAlign: 'center',
  },
  achievementsList: {
    gap: 12,
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  achievementIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  achievementDate: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  workoutCard: {
    borderRadius: 16,
    padding: 24,
  },
  workoutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  workoutTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  workoutDescription: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  workoutStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  workoutStat: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    fontWeight: '500',
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    gap: 8,
  },
  startButtonText: {
    color: '#1E40AF',
    fontSize: 16,
    fontWeight: '600',
  },
});