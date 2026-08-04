'use client'

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

  const handleSignOut = async () => {
    await authClient.signOut()
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#030712] to-[#0B1730]">
      {/* Header */}
      <header className="border-b border-blue-500/10 bg-gradient-to-r from-[rgba(10,18,35,0.5)] to-[rgba(7,18,36,0.5)] backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-white/60 text-sm mt-1">Content Management System</p>
          </div>
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="border-red-500/30 text-red-400 hover:bg-red-500/10"
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
