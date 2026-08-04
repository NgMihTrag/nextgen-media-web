'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import { Mail, Lock, AlertCircle } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('nextgenmedia868@gmail.com')
  const [password, setPassword] = useState('Tr@ng1105')
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
        setLoading(false)
        return
      }

      // Successful login - redirect to dashboard
      router.push('/admin')
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error('Login error:', err)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#030712] to-[#0B1730]">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-[rgba(10,18,35,0.8)] to-[rgba(3,7,18,0.8)] backdrop-blur-xl p-8 shadow-2xl shadow-blue-500/20">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              NextGen Media
            </h1>
            <p className="text-white/60">Admin Dashboard</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-500/15 border border-red-500/50 rounded-lg flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-300">{error}</p>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-blue-400/60" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-3 bg-[rgba(10,18,35,0.5)] border border-blue-500/30 rounded-lg text-white placeholder-white/40 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all disabled:opacity-50"
                  placeholder="Enter email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-blue-400/60" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-3 bg-[rgba(10,18,35,0.5)] border border-blue-500/30 rounded-lg text-white placeholder-white/40 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all disabled:opacity-50"
                  placeholder="Enter password"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50 border border-blue-400/50 hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-xs text-white/40">
            <p>Admin Dashboard • NextGen Media © 2024</p>
          </div>
        </div>
      </div>
    </div>
  )
}
