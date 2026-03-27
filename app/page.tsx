'use client'

import { AppProvider } from '@/lib/app-context'
import { AppNavigator } from '@/components/app-navigator'

export default function Home() {
  return (
    <AppProvider>
      <main className="mx-auto min-h-screen max-w-md bg-background">
        <AppNavigator />
      </main>
    </AppProvider>
  )
}
