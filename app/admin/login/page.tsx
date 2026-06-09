'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import { Mail, Lock, AlertCircle } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('nextgenmedia868@gmail.com')
  const [password, setPassword] = useState('Admin123')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await authClient.signIn.email({
        email,
        password,
      })

      if (response.error) {
        setError(response.error.message || 'Invalid email or password')
        return
      }

      router.push('/admin')
      router.refresh()
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#030712] to-[#0B1730] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            NextGen Media
          </h1>
          <p className="text-white/60">Admin Dashboard</p>
        </div>

        {/* Login Card */}
        <div className="bg-[rgba(10,18,35,0.9)] border border-blue-500/15 rounded-lg p-8 backdrop-blur-xl">
          <h2 className="text-2xl font-bold text-white mb-6">Admin Login</h2>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-blue-400/60" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nextgenmedia868@gmail.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-[rgba(20,30,50,0.8)] border border-blue-500/20 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-blue-500 transition-colors"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-blue-400/60" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-2.5 bg-[rgba(20,30,50,0.8)] border border-blue-500/20 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-blue-500 transition-colors"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-medium py-2.5 rounded-lg transition-all duration-300 mt-6"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Footer Note */}
          <div className="mt-6 pt-6 border-t border-blue-500/10">
            <p className="text-xs text-white/40 text-center">
              This is a private admin dashboard for NextGen Media only.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
