import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [privateProfile, setPrivateProfile] = useState(false);

  const userStats = {
    name: 'Jordan Smith',
    username: '@jordansmith',
    avatar: '👤',
    level: 'Advanced',
    joinDate: 'March 2024',
    currentVertical: 28.5,
    bestVertical: 30.2,
    totalWorkouts: 47,
    currentStreak: 7,
    bestStreak: 15,
    achievements: 12,
    friends: 23,
    rank: 4,
  };

  const achievements = [
    { icon: '🎯', title: 'First PR', description: 'Beat your first record', rarity: 'common' },
    { icon: '🔥', title: 'Week Warrior', description: '7 days streak', rarity: 'rare' },
    { icon: '🏆', title: 'Jump Master', description: '1000+ jumps', rarity: 'epic' },
    { icon: '💪', title: 'Form Perfect', description: 'Perfect form 10x', rarity: 'rare' },
    { icon: '⚡', title: 'Lightning Fast', description: 'Improve 5" in a month', rarity: 'legendary' },
    { icon: '🌟', title: 'Consistency King', description: '30 day streak', rarity: 'epic' },
  ];

  const recentActivity = [
    { type: 'workout', title: 'Explosive Power', date: 'Today', value: '20 min' },
    { type: 'jump', title: 'New Jump Record', date: 'Yesterday', value: '28.5"' },
    { type: 'achievement', title: 'Week Warrior', date: '2 days ago', value: '🔥' },
    { type: 'social', title: 'Added 2 friends', date: '3 days ago', value: '👥' },
  ];

  const settingsItems = [
    { icon: 'bell', title: 'Notifications', hasSwitch: true, switchValue: notificationsEnabled, onToggle: setNotificationsEnabled },
    { icon: 'shield', title: 'Privacy', hasSwitch: true, switchValue: privateProfile, onToggle: setPrivateProfile },
    { icon: 'camera', title: 'Jump Measurement Settings', hasSwitch: false },
    { icon: 'target', title: 'Goal Settings', hasSwitch: false },
    { icon: 'help-circle', title: 'Help & Support', hasSwitch: false },
    { icon: 'share-2', title: 'Share App', hasSwitch: false },
    { icon: 'log-out', title: 'Sign Out', hasSwitch: false, destructive: true },
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

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'workout': return <Feather name="zap" size={16} color="#F97316" />;
      case 'jump': return <Feather name="trending-up" size={16} color="#10B981" />;
      case 'achievement': return <Feather name="award" size={16} color="#A855F7" />;
      case 'social': return <Feather name="users" size={16} color="#1E40AF" />;
      default: return <Feather name="calendar" size={16} color="#9CA3AF" />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Feather name="settings" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View style={styles.profileSection}>
          <LinearGradient
            colors={['#1F2937', '#111827']}
            style={styles.profileCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.profileHeader}>
              <View style={styles.avatarContainer}>
                <Text style={styles.avatar}>{userStats.avatar}</Text>
                <TouchableOpacity style={styles.editAvatarButton}>
                  <Feather name="edit" size={12} color="white" />
                </TouchableOpacity>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.userName}>{userStats.name}</Text>
                <Text style={styles.userHandle}>{userStats.username}</Text>
                <View style={styles.levelBadge}>
                  <Text style={styles.levelText}>{userStats.level}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.shareButton}>
                <Feather name="share-2" size={16} color="#10B981" />
              </TouchableOpacity>
            </View>

            <Text style={styles.joinDate}>Member since {userStats.joinDate}</Text>

            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{userStats.currentVertical}"</Text>
                <Text style={styles.statLabel}>Current Best</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{userStats.totalWorkouts}</Text>
                <Text style={styles.statLabel}>Workouts</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{userStats.currentStreak}</Text>
                <Text style={styles.statLabel}>Day Streak</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>#{userStats.rank}</Text>
                <Text style={styles.statLabel}>Global Rank</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Feather name="edit" size={20} color="#10B981" />
              <Text style={styles.actionText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Feather name="award" size={20} color="#F97316" />
              <Text style={styles.actionText}>View All Stats</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Feather name="users" size={20} color="#1E40AF" />
              <Text style={styles.actionText}>Find Friends</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            <Text style={styles.achievementCount}>{userStats.achievements}/20</Text>
          </View>
          <View style={styles.achievementsGrid}>
            {achievements.map((achievement, index) => (
              <View key={index} style={styles.achievementCard}>
                <View style={[
                  styles.achievementIcon,
                  { borderColor: getRarityColor(achievement.rarity) }
                ]}>
                  <Text style={styles.achievementEmoji}>{achievement.icon}</Text>
                </View>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                <Text style={styles.achievementDescription}>{achievement.description}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityList}>
            {recentActivity.map((activity, index) => (
              <View key={index} style={styles.activityItem}>
                <View style={styles.activityIcon}>
                  {getActivityIcon(activity.type)}
                </View>
                <View style={styles.activityInfo}>
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                  <Text style={styles.activityDate}>{activity.date}</Text>
                </View>
                <Text style={styles.activityValue}>{activity.value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingsList}>
            {settingsItems.map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.settingItem}
                activeOpacity={item.hasSwitch ? 1 : 0.7}
              >
                <View style={styles.settingInfo}>
                  <Feather name={item.icon} size={20} color={item.destructive ? "#EF4444" : "#9CA3AF"} />
                  <Text style={[
                    styles.settingTitle,
                    item.destructive && { color: '#EF4444' }
                  ]}>
                    {item.title}
                  </Text>
                </View>
                {item.hasSwitch ? (
                  <Switch
                    value={item.switchValue}
                    onValueChange={item.onToggle}
                    trackColor={{ false: '#374151', true: '#10B981' }}
                    thumbColor={item.switchValue ? '#ffffff' : '#9CA3AF'}
                  />
                ) : (
                  <Text style={styles.settingArrow}>›</Text>
                )}
              </TouchableOpacity>
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
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1F2937',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#374151',
  },
  profileSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  profileCard: {
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: '#374151',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    fontSize: 48,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#374151',
    textAlign: 'center',
    lineHeight: 80,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userHandle: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  levelBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  levelText: {
    color: '#10B981',
    fontSize: 12,
    fontWeight: '600',
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  joinDate: {
    color: '#9CA3AF',
    fontSize: 14,
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: '#9CA3AF',
    fontSize: 12,
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  achievementCount: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#374151',
    gap: 8,
  },
  actionText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  achievementCard: {
    width: '31%',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#374151',
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    marginBottom: 8,
  },
  achievementEmoji: {
    fontSize: 16,
  },
  achievementTitle: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  achievementDescription: {
    color: '#9CA3AF',
    fontSize: 10,
    textAlign: 'center',
  },
  activityList: {
    gap: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  activityDate: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  activityValue: {
    color: '#10B981',
    fontSize: 14,
    fontWeight: '600',
  },
  settingsList: {
    gap: 4,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingTitle: {
    color: 'white',
    fontSize: 16,
    marginLeft: 12,
  },
  settingArrow: {
    color: '#9CA3AF',
    fontSize: 20,
    fontWeight: '300',
  },
});