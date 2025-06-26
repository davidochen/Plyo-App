import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

export default function SocialScreen() {
  const [activeTab, setActiveTab] = useState('feed');

  const tabs = [
    { id: 'feed', label: 'Feed' },
    { id: 'leaderboard', label: 'Leaderboard' },
    { id: 'friends', label: 'Friends' },
    { id: 'challenges', label: 'Challenges' },
  ];

  const feedPosts = [
    {
      id: 1,
      user: {
        name: 'Sarah Chen',
        username: '@sarahc',
        avatar: '👩‍🦰',
        level: 'Advanced',
      },
      type: 'achievement',
      content: 'New personal record! 🎯',
      jump: 31.2,
      improvement: 1.4,
      likes: 23,
      comments: 5,
      timestamp: '2h ago',
      isLiked: false,
    },
    {
      id: 2,
      user: {
        name: 'Mike Johnson',
        username: '@mikej',
        avatar: '👨‍🦱',
        level: 'Intermediate',
      },
      type: 'workout',
      content: 'Crushed the Explosive Power workout! 💪',
      workout: 'Explosive Power',
      duration: '22 min',
      likes: 18,
      comments: 3,
      timestamp: '4h ago',
      isLiked: true,
    },
    {
      id: 3,
      user: {
        name: 'Alex Rivera',
        username: '@alexr',
        avatar: '👨‍🦳',
        level: 'Beginner',
      },
      type: 'milestone',
      content: 'First week completed! Thanks for the motivation everyone 🙏',
      streak: 7,
      likes: 34,
      comments: 8,
      timestamp: '6h ago',
      isLiked: false,
    },
  ];

  const leaderboard = [
    { rank: 1, name: 'Jordan Smith', avatar: '👨‍🦲', jump: 34.8, improvement: '+2.1"', isCurrentUser: false },
    { rank: 2, name: 'Emily Davis', avatar: '👩‍🦳', jump: 33.5, improvement: '+1.8"', isCurrentUser: false },
    { rank: 3, name: 'Chris Wilson', avatar: '👨‍🦰', jump: 32.1, improvement: '+1.5"', isCurrentUser: false },
    { rank: 4, name: 'You', avatar: '👤', jump: 28.5, improvement: '+2.3"', isCurrentUser: true },
    { rank: 5, name: 'Sam Lee', avatar: '👩‍🦱', jump: 27.9, improvement: '+0.8"', isCurrentUser: false },
  ];

  const friends = [
    { id: 1, name: 'Sarah Chen', avatar: '👩‍🦰', status: 'online', lastJump: 31.2, streak: 12 },
    { id: 2, name: 'Mike Johnson', avatar: '👨‍🦱', status: 'offline', lastJump: 29.6, streak: 5 },
    { id: 3, name: 'Alex Rivera', avatar: '👨‍🦳', status: 'online', lastJump: 25.3, streak: 7 },
    { id: 4, name: 'Jamie Park', avatar: '👩‍🦲', status: 'offline', lastJump: 30.1, streak: 3 },
  ];

  const challenges = [
    {
      id: 1,
      title: '30-Day Consistency Challenge',
      description: 'Work out every day for 30 days',
      participants: 47,
      timeLeft: '23 days',
      reward: 'Golden Streak Badge',
      progress: 23,
      isJoined: true,
    },
    {
      id: 2,
      title: 'Vertical Boost Challenge',
      description: 'Improve your jump by 2 inches',
      participants: 89,
      timeLeft: '12 days',
      reward: 'Jump Master Badge',
      progress: 0,
      isJoined: false,
    },
    {
      id: 3,
      title: 'Weekend Warriors',
      description: 'Complete 8 workouts this weekend',
      participants: 23,
      timeLeft: '2 days',
      reward: 'Warrior Badge',
      progress: 45,
      isJoined: true,
    },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Feather name="award" size={20} color="#F59E0B" />;
      case 2: return <Feather name="award" size={20} color="#E5E7EB" />;
      case 3: return <Feather name="award" size={20} color="#D97706" />;
      default: return <Text style={styles.rankNumber}>{rank}</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Social</Text>
          <Text style={styles.subtitle}>Connect with the community</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="search" size={20} color="#9CA3AF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="user-plus" size={20} color="#9CA3AF" />
          </TouchableOpacity>
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

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Feed Tab */}
        {activeTab === 'feed' && (
          <View style={styles.feedContainer}>
            {feedPosts.map((post) => (
              <View key={post.id} style={styles.postCard}>
                <View style={styles.postHeader}>
                  <View style={styles.userInfo}>
                    <Text style={styles.avatar}>{post.user.avatar}</Text>
                    <View>
                      <Text style={styles.userName}>{post.user.name}</Text>
                      <Text style={styles.userHandle}>{post.user.username} • {post.timestamp}</Text>
                    </View>
                  </View>
                  <View style={[styles.levelBadge, { backgroundColor: 'rgba(16, 185, 129, 0.1)' }]}>
                    <Text style={styles.levelText}>{post.user.level}</Text>
                  </View>
                </View>

                <Text style={styles.postContent}>{post.content}</Text>

                {post.type === 'achievement' && (
                  <LinearGradient
                    colors={['#10B981', '#059669']}
                    style={styles.achievementCard}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Feather name="award" size={24} color="white" />
                    <View style={styles.achievementInfo}>
                      <Text style={styles.achievementValue}>{post.jump}"</Text>
                      <Text style={styles.achievementLabel}>+{post.improvement}" improvement</Text>
                    </View>
                  </LinearGradient>
                )}

                {post.type === 'workout' && (
                  <View style={styles.workoutCard}>
                    <Feather name="zap" size={20} color="#F97316" />
                    <View style={styles.workoutInfo}>
                      <Text style={styles.workoutName}>{post.workout}</Text>
                      <Text style={styles.workoutDuration}>{post.duration}</Text>
                    </View>
                  </View>
                )}

                {post.type === 'milestone' && (
                  <View style={styles.milestoneCard}>
                    <Feather name="calendar" size={20} color="#1E40AF" />
                    <Text style={styles.milestoneText}>{post.streak} day streak!</Text>
                  </View>
                )}

                <View style={styles.postActions}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Feather 
                      name="heart" 
                      size={20} 
                      color={post.isLiked ? "#EF4444" : "#9CA3AF"} 
                      fill={post.isLiked ? "#EF4444" : "none"}
                    />
                    <Text style={styles.actionText}>{post.likes}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Feather name="message-circle" size={20} color="#9CA3AF" />
                    <Text style={styles.actionText}>{post.comments}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Feather name="share-2" size={20} color="#9CA3AF" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>This Month's Leaders</Text>
            <View style={styles.leaderboardList}>
              {leaderboard.map((user) => (
                <View 
                  key={user.rank} 
                  style={[
                    styles.leaderboardCard,
                    user.isCurrentUser && { backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: '#10B981' }
                  ]}
                >
                  <View style={styles.leaderboardRank}>
                    {getRankIcon(user.rank)}
                  </View>
                  <Text style={styles.leaderboardAvatar}>{user.avatar}</Text>
                  <View style={styles.leaderboardInfo}>
                    <Text style={[
                      styles.leaderboardName,
                      user.isCurrentUser && { color: '#10B981' }
                    ]}>
                      {user.name}
                    </Text>
                    <Text style={styles.leaderboardImprovement}>{user.improvement}</Text>
                  </View>
                  <Text style={styles.leaderboardJump}>{user.jump}"</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Friends Tab */}
        {activeTab === 'friends' && (
          <View style={styles.section}>
            <View style={styles.searchContainer}>
              <Feather name="search" size={16} color="#9CA3AF" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search friends..."
                placeholderTextColor="#9CA3AF"
              />
            </View>
            <View style={styles.friendsList}>
              {friends.map((friend) => (
                <View key={friend.id} style={styles.friendCard}>
                  <View style={styles.friendInfo}>
                    <Text style={styles.friendAvatar}>{friend.avatar}</Text>
                    <View>
                      <Text style={styles.friendName}>{friend.name}</Text>
                      <View style={styles.friendStats}>
                        <Text style={styles.friendStat}>Best: {friend.lastJump}"</Text>
                        <Text style={styles.friendStat}>• Streak: {friend.streak}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={[
                    styles.statusIndicator,
                    { backgroundColor: friend.status === 'online' ? '#10B981' : '#6B7280' }
                  ]} />
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Challenges Tab */}
        {activeTab === 'challenges' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Active Challenges</Text>
            <View style={styles.challengesList}>
              {challenges.map((challenge) => (
                <View key={challenge.id} style={styles.challengeCard}>
                  <View style={styles.challengeHeader}>
                    <Text style={styles.challengeTitle}>{challenge.title}</Text>
                    <Text style={styles.challengeTimeLeft}>{challenge.timeLeft}</Text>
                  </View>
                  <Text style={styles.challengeDescription}>{challenge.description}</Text>
                  
                  <View style={styles.challengeStats}>
                    <Text style={styles.challengeParticipants}>
                      {challenge.participants} participants
                    </Text>
                    <Text style={styles.challengeReward}>🏆 {challenge.reward}</Text>
                  </View>

                  {challenge.isJoined && (
                    <View style={styles.progressContainer}>
                      <Text style={styles.progressLabel}>Your Progress</Text>
                      <View style={styles.progressBar}>
                        <View 
                          style={[
                            styles.progressFill, 
                            { width: `${challenge.progress}%` }
                          ]} 
                        />
                      </View>
                      <Text style={styles.progressText}>{challenge.progress}%</Text>
                    </View>
                  )}

                  <TouchableOpacity 
                    style={[
                      styles.challengeButton,
                      challenge.isJoined 
                        ? { backgroundColor: '#374151' } 
                        : { backgroundColor: '#10B981' }
                    ]}
                  >
                    <Text style={styles.challengeButtonText}>
                      {challenge.isJoined ? 'Joined' : 'Join Challenge'}
                    </Text>
                  </TouchableOpacity>
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
    paddingBottom: 16,
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
  tabsContainer: {
    marginBottom: 20,
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
  feedContainer: {
    paddingHorizontal: 20,
    gap: 20,
  },
  postCard: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    fontSize: 32,
    marginRight: 12,
  },
  userName: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  userHandle: {
    color: '#9CA3AF',
    fontSize: 12,
    marginTop: 2,
  },
  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  levelText: {
    color: '#10B981',
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  postContent: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    gap: 12,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementValue: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  achievementLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
  },
  workoutCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111827',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    gap: 12,
  },
  workoutInfo: {
    flex: 1,
  },
  workoutName: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  workoutDuration: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  milestoneCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111827',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    gap: 12,
  },
  milestoneText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  postActions: {
    flexDirection: 'row',
    gap: 24,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionText: {
    color: '#9CA3AF',
    fontSize: 14,
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
  leaderboardList: {
    gap: 12,
  },
  leaderboardCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  leaderboardRank: {
    width: 32,
    alignItems: 'center',
    marginRight: 12,
  },
  rankNumber: {
    color: '#9CA3AF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  leaderboardAvatar: {
    fontSize: 24,
    marginRight: 12,
  },
  leaderboardInfo: {
    flex: 1,
  },
  leaderboardName: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  leaderboardImprovement: {
    color: '#10B981',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  leaderboardJump: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#374151',
    gap: 12,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    fontSize: 16,
  },
  friendsList: {
    gap: 12,
  },
  friendCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  friendInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  friendAvatar: {
    fontSize: 24,
    marginRight: 12,
  },
  friendName: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  friendStats: {
    flexDirection: 'row',
  },
  friendStat: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  challengesList: {
    gap: 16,
  },
  challengeCard: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  challengeTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  challengeTimeLeft: {
    color: '#F97316',
    fontSize: 12,
    fontWeight: '600',
  },
  challengeDescription: {
    color: '#9CA3AF',
    fontSize: 14,
    marginBottom: 12,
  },
  challengeStats: {
    marginBottom: 16,
  },
  challengeParticipants: {
    color: '#9CA3AF',
    fontSize: 12,
    marginBottom: 4,
  },
  challengeReward: {
    color: '#10B981',
    fontSize: 12,
    fontWeight: '500',
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressLabel: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#374151',
    borderRadius: 2,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 2,
  },
  progressText: {
    color: '#9CA3AF',
    fontSize: 12,
    textAlign: 'right',
  },
  challengeButton: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  challengeButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});