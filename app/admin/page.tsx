'use client'

import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import PortfolioManager from '@/components/admin/portfolio-manager'
import TestimonialManager from '@/components/admin/testimonial-manager'
import TeamManager from '@/components/admin/team-manager'
import StatsManager from '@/components/admin/stats-manager'

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Re-enable admin authentication before production launch
    // Currently disabled for development - session checks bypassed
    setLoading(false)
    
    // TEMPORARILY DISABLED - Authentication checks bypassed for development
    // async function loadUser() {
    //   try {
    //   const result = await authClient.getSession()
    //
    //   if (!result?.data?.user) {
    //     router.push('/admin/login')
    //     return
    //   }
    //     setUser(result.data.user)
    //   } catch (error) {
    //     router.push('/admin/login')
    //   } finally {
    //     setLoading(false)
    //   }
    // }
    // loadUser()
  }, [router])

  const handleSignOut = async () => {
    try {
      await authClient.signOut()
      router.push('/admin/login')
      router.refresh()
    } catch (error) {
      console.error('Sign out error:', error)
      router.push('/admin/login')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#030712] to-[#0B1730]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-white">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#030712] to-[#0B1730]">
      {/* Header */}
      <header className="border-b border-blue-500/10 bg-gradient-to-r from-[rgba(10,18,35,0.5)] to-[rgba(7,18,36,0.5)] backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            {/* TODO: Update welcome message when authentication is re-enabled */}
            <p className="text-white/60 text-sm mt-1">Welcome, Developer</p>
          </div>
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="border-red-500/30 text-red-400 hover:bg-red-500/10 hidden"
            disabled
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="portfolio" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-[rgba(10,18,35,0.7)] border border-blue-500/15">
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Portfolio Projects</h2>
            </div>
            <PortfolioManager />
          </TabsContent>

          <TabsContent value="testimonials" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Testimonials</h2>
            </div>
            <TestimonialManager />
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Team Members</h2>
            </div>
            <TeamManager />
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Site Statistics</h2>
            </div>
            <StatsManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
