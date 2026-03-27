'use client'

import { useApp } from '@/lib/app-context'
import { SplashScreen } from './screens/splash-screen'
import { OnboardingScreen } from './screens/onboarding-screen'
import { LoginScreen } from './screens/login-screen'
import { SignupScreen } from './screens/signup-screen'
import { DashboardScreen } from './screens/dashboard-screen'
import { FocusSetupScreen } from './screens/focus-setup-screen'
import { FocusActiveScreen } from './screens/focus-active-screen'
import { FocusBreakScreen } from './screens/focus-break-screen'
import { FocusCompleteScreen } from './screens/focus-complete-screen'
import { AchievementsScreen } from './screens/achievements-screen'
import { StatsScreen } from './screens/stats-screen'
import { ProfileScreen } from './screens/profile-screen'
import { SettingsScreen } from './screens/settings-screen'
import { BlockedAppsScreen } from './screens/blocked-apps-screen'

export function AppNavigator() {
  const { currentScreen } = useApp()

  const screens: Record<string, React.ComponentType> = {
    splash: SplashScreen,
    onboarding: OnboardingScreen,
    login: LoginScreen,
    signup: SignupScreen,
    dashboard: DashboardScreen,
    'focus-setup': FocusSetupScreen,
    'focus-active': FocusActiveScreen,
    'focus-break': FocusBreakScreen,
    'focus-complete': FocusCompleteScreen,
    achievements: AchievementsScreen,
    stats: StatsScreen,
    profile: ProfileScreen,
    settings: SettingsScreen,
    'blocked-apps': BlockedAppsScreen,
  }

  const Screen = screens[currentScreen] || SplashScreen

  return <Screen />
}
