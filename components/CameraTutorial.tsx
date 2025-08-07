import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface CameraTutorialProps {
  onClose: () => void;
  onComplete: () => void;
}

export default function CameraTutorial({ onClose, onComplete }: CameraTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps = [
    {
      title: 'Welcome to Jump Analysis',
      subtitle: 'Learn how to get accurate measurements',
      icon: 'target',
      color: '#10B981',
      content: [
        'This tutorial will guide you through the proper setup for jump measurement.',
        'Follow these steps to get the most accurate results.',
        'You can skip this tutorial anytime and access it later in settings.'
      ]
    },
    {
      title: 'Camera Positioning',
      subtitle: 'Set up your device correctly',
      icon: 'camera',
      color: '#F97316',
      content: [
        'Place your device on a stable surface or tripod.',
        'Position it 8-10 feet away from your jumping area.',
        'Ensure the camera is at waist height for best results.',
        'Make sure your entire body will be visible in the frame.'
      ]
    },
    {
      title: 'Lighting Setup',
      subtitle: 'Optimize your environment',
      icon: 'sun',
      color: '#1E40AF',
      content: [
        'Choose a well-lit area with consistent lighting.',
        'Avoid direct sunlight or harsh shadows.',
        'Ensure your body is clearly visible against the background.',
        'Test the lighting by doing a practice jump first.'
      ]
    },
    {
      title: 'Jump Technique',
      subtitle: 'Perform your jump correctly',
      icon: 'trending-up',
      color: '#7C3AED',
      content: [
        'Stand with your feet shoulder-width apart.',
        'Perform a countermovement (slight squat) before jumping.',
        'Jump as high as you can with good form.',
        'Hold your position at the peak of your jump.',
        'Land safely and maintain your balance.'
      ]
    },
    {
      title: 'Recording Tips',
      subtitle: 'Get the best results',
      icon: 'video',
      color: '#059669',
      content: [
        'Start recording before you begin your jump sequence.',
        'Keep the camera steady throughout the recording.',
        'Perform multiple jumps for better accuracy.',
        'Review your recordings to check form and positioning.',
        'Use the advanced camera for detailed analysis.'
      ]
    },
    {
      title: 'Analysis & Results',
      subtitle: 'Understanding your measurements',
      icon: 'bar-chart-2',
      color: '#DC2626',
      content: [
        'The app will analyze your jump using computer vision.',
        'You\'ll get your vertical jump height in inches.',
        'Compare results over time to track progress.',
        'Share your achievements with friends and coaches.',
        'Use the data to improve your training program.'
      ]
    }
  ];

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipTutorial = () => {
    onComplete();
  };

  const currentStepData = tutorialSteps[currentStep];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1F2937', '#111827']}
        style={styles.content}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Feather name="x" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Camera Tutorial</Text>
          <TouchableOpacity style={styles.skipButton} onPress={skipTutorial}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            {currentStep + 1} of {tutorialSteps.length}
          </Text>
        </View>

        {/* Content */}
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.stepContainer}>
            {/* Icon */}
            <View style={[styles.iconContainer, { backgroundColor: currentStepData.color }]}>
              <Feather name={currentStepData.icon as any} size={48} color="white" />
            </View>

            {/* Title */}
            <Text style={styles.stepTitle}>{currentStepData.title}</Text>
            <Text style={styles.stepSubtitle}>{currentStepData.subtitle}</Text>

            {/* Content */}
            <View style={styles.contentContainer}>
              {currentStepData.content.map((item, index) => (
                <View key={index} style={styles.contentItem}>
                  <View style={styles.bulletPoint}>
                    <Text style={styles.bulletText}>•</Text>
                  </View>
                  <Text style={styles.contentText}>{item}</Text>
                </View>
              ))}
            </View>

            {/* Tips */}
            <View style={styles.tipsContainer}>
              <View style={styles.tipsHeader}>
                <Feather name="lightbulb" size={20} color="#FBBF24" />
                <Text style={styles.tipsTitle}>Pro Tip</Text>
              </View>
              <Text style={styles.tipsText}>
                {currentStep === 0 && "Take your time to set up properly - accuracy is key!"}
                {currentStep === 1 && "Use a tripod or stable surface for the most consistent results."}
                {currentStep === 2 && "Natural lighting works best, avoid artificial lights that flicker."}
                {currentStep === 3 && "Practice your jump technique before recording for best results."}
                {currentStep === 4 && "Record multiple attempts and use the best one for analysis."}
                {currentStep === 5 && "Regular measurements help track your progress over time."}
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Navigation */}
        <View style={styles.navigation}>
          <TouchableOpacity 
            style={[styles.navButton, currentStep === 0 && styles.disabledButton]} 
            onPress={previousStep}
            disabled={currentStep === 0}
          >
            <Feather name="chevron-left" size={24} color={currentStep === 0 ? "#6B7280" : "white"} />
            <Text style={[styles.navButtonText, currentStep === 0 && styles.disabledText]}>
              Previous
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.nextButton} onPress={nextStep}>
            <Text style={styles.nextButtonText}>
              {currentStep === tutorialSteps.length - 1 ? 'Complete' : 'Next'}
            </Text>
            <Feather 
              name={currentStep === tutorialSteps.length - 1 ? "check" : "chevron-right"} 
              size={24} 
              color="white" 
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  skipButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  skipText: {
    color: '#9CA3AF',
    fontSize: 16,
    fontWeight: '600',
  },
  progressContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#374151',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 2,
  },
  progressText: {
    color: '#9CA3AF',
    fontSize: 14,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  stepContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  stepTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  stepSubtitle: {
    color: '#9CA3AF',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 32,
  },
  contentContainer: {
    width: '100%',
    marginBottom: 32,
  },
  contentItem: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  bulletPoint: {
    width: 20,
    alignItems: 'center',
    marginTop: 2,
  },
  bulletText: {
    color: '#10B981',
    fontSize: 18,
    fontWeight: 'bold',
  },
  contentText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
    flex: 1,
    marginLeft: 12,
  },
  tipsContainer: {
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FBBF24',
    width: '100%',
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tipsTitle: {
    color: '#FBBF24',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  tipsText: {
    color: '#FBBF24',
    fontSize: 14,
    lineHeight: 20,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  disabledButton: {
    backgroundColor: 'rgba(107, 114, 128, 0.1)',
  },
  navButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  disabledText: {
    color: '#6B7280',
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
}); 