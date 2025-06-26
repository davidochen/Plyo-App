import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function WorkoutsScreen() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All', color: '#10B981' },
    { id: 'beginner', label: 'Beginner', color: '#F97316' },
    { id: 'intermediate', label: 'Intermediate', color: '#1E40AF' },
    { id: 'advanced', label: 'Advanced', color: '#DC2626' },
  ];

  const workoutPlans = [
    {
      id: 1,
      title: 'Explosive Power',
      description: 'Build maximum vertical jump power',
      duration: '20 min',
      level: 'Beginner',
      intensity: 'High',
      exercises: 8,
      completed: true,
      rating: 4.8,
      gradient: ['#10B981', '#059669'],
    },
    {
      id: 2,
      title: 'Plyometric Foundations',
      description: 'Master the basics of plyometric training',
      duration: '15 min',
      level: 'Beginner',
      intensity: 'Medium',
      exercises: 6,
      completed: false,
      rating: 4.6,
      gradient: ['#F97316', '#EA580C'],
    },
    {
      id: 3,
      title: 'Advanced Jump Training',
      description: 'Elite-level plyometric conditioning',
      duration: '30 min',
      level: 'Advanced',
      intensity: 'High',
      exercises: 12,
      completed: false,
      rating: 4.9,
      gradient: ['#DC2626', '#B91C1C'],
    },
    {
      id: 4,
      title: 'Recovery & Mobility',
      description: 'Active recovery and injury prevention',
      duration: '12 min',
      level: 'All Levels',
      intensity: 'Low',
      exercises: 5,
      completed: false,
      rating: 4.7,
      gradient: ['#1E40AF', '#1D4ED8'],
    },
  ];

  const weeklyProgress = {
    planned: 5,
    completed: 3,
    streak: 7,
  };

  const upcomingWorkouts = [
    { day: 'Today', workout: 'Explosive Power', time: '6:00 PM' },
    { day: 'Tomorrow', workout: 'Recovery & Mobility', time: '7:00 AM' },
    { day: 'Wednesday', workout: 'Plyometric Foundations', time: '6:00 PM' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Workouts</Text>
            <Text style={styles.subtitle}>Choose your training plan</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconButton}>
              <Feather name="search" size={20} color="#9CA3AF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Feather name="filter" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Weekly Progress */}
        <View style={styles.progressSection}>
          <LinearGradient
            colors={['#1F2937', '#111827']}
            style={styles.progressCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.progressHeader}>
              <Feather name="calendar" size={24} color="#10B981" />
              <Text style={styles.progressTitle}>This Week</Text>
            </View>
            <View style={styles.progressStats}>
              <View style={styles.progressStat}>
                <Text style={styles.progressNumber}>{weeklyProgress.completed}</Text>
                <Text style={styles.progressLabel}>Completed</Text>
              </View>
              <View style={styles.progressStat}>
                <Text style={styles.progressNumber}>{weeklyProgress.planned}</Text>
                <Text style={styles.progressLabel}>Planned</Text>
              </View>
              <View style={styles.progressStat}>
                <Text style={styles.progressNumber}>{weeklyProgress.streak}</Text>
                <Text style={styles.progressLabel}>Day Streak</Text>
              </View>
            </View>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${(weeklyProgress.completed / weeklyProgress.planned) * 100}%` }
                ]} 
              />
            </View>
          </LinearGradient>
        </View>

        {/* Upcoming Workouts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming</Text>
          <View style={styles.upcomingList}>
            {upcomingWorkouts.map((item, index) => (
              <View key={index} style={styles.upcomingCard}>
                <View style={styles.upcomingTime}>
                  <Text style={styles.upcomingDay}>{item.day}</Text>
                  <Text style={styles.upcomingTimeText}>{item.time}</Text>
                </View>
                <View style={styles.upcomingInfo}>
                  <Text style={styles.upcomingWorkout}>{item.workout}</Text>
                  <View style={styles.upcomingMeta}>
                    <Feather name="clock" size={12} color="#9CA3AF" />
                    <Text style={styles.upcomingMetaText}>20 min</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.upcomingAction}>
                  <Feather name="play" size={16} color="#10B981" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* Filters */}
        <View style={styles.filtersSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.filters}>
              {filters.map((filter) => (
                <TouchableOpacity
                  key={filter.id}
                  style={[
                    styles.filterButton,
                    activeFilter === filter.id && { backgroundColor: filter.color }
                  ]}
                  onPress={() => setActiveFilter(filter.id)}
                >
                  <Text style={[
                    styles.filterText,
                    activeFilter === filter.id && { color: 'white' }
                  ]}>
                    {filter.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Workout Plans */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Training Plans</Text>
          <View style={styles.workoutsList}>
            {workoutPlans.map((workout) => (
              <View key={workout.id} style={styles.workoutCard}>
                <LinearGradient
                  colors={workout.gradient}
                  style={styles.workoutHeader}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.workoutHeaderContent}>
                    <View style={styles.workoutBadges}>
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>{workout.level}</Text>
                      </View>
                      {workout.completed && (
                        <Feather name="check-circle" size={20} color="white" />
                      )}
                    </View>
                    <Text style={styles.workoutTitle}>{workout.title}</Text>
                    <Text style={styles.workoutDescription}>{workout.description}</Text>
                  </View>
                </LinearGradient>
                
                <View style={styles.workoutContent}>
                  <View style={styles.workoutMeta}>
                    <View style={styles.metaItem}>
                      <Feather name="clock" size={16} color="#9CA3AF" />
                      <Text style={styles.metaText}>{workout.duration}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Feather name="zap" size={16} color="#9CA3AF" />
                      <Text style={styles.metaText}>{workout.intensity}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Feather name="target" size={16} color="#9CA3AF" />
                      <Text style={styles.metaText}>{workout.exercises} exercises</Text>
                    </View>
                  </View>
                  
                  <View style={styles.workoutFooter}>
                    <View style={styles.rating}>
                      <Feather name="star" size={16} color="#F59E0B" />
                      <Text style={styles.ratingText}>{workout.rating}</Text>
                    </View>
                    <TouchableOpacity style={styles.startButton}>
                      <Feather name="play" size={16} color="white" />
                      <Text style={styles.startButtonText}>
                        {workout.completed ? 'Repeat' : 'Start'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
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
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1F2937',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#374151',
  },
  progressSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  progressCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#374151',
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  progressStat: {
    alignItems: 'center',
  },
  progressNumber: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  progressLabel: {
    color: '#9CA3AF',
    fontSize: 12,
    marginTop: 4,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#374151',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10B981',
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
  upcomingList: {
    gap: 12,
  },
  upcomingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  upcomingTime: {
    marginRight: 16,
    minWidth: 80,
  },
  upcomingDay: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  upcomingTimeText: {
    color: '#9CA3AF',
    fontSize: 12,
    marginTop: 2,
  },
  upcomingInfo: {
    flex: 1,
  },
  upcomingWorkout: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  upcomingMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  upcomingMetaText: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  upcomingAction: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filtersSection: {
    marginBottom: 32,
  },
  filters: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1F2937',
    borderWidth: 1,
    borderColor: '#374151',
  },
  filterText: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '500',
  },
  workoutsList: {
    gap: 20,
  },
  workoutCard: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#374151',
  },
  workoutHeader: {
    padding: 20,
  },
  workoutHeaderContent: {
  },
  workoutBadges: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  badge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  workoutTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  workoutDescription: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  workoutContent: {
    padding: 20,
  },
  workoutMeta: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  workoutFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '500',
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  startButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});