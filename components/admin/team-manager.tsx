'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function TeamManager() {
  return (
    <div className="space-y-4">
      <Card className="p-6 bg-[rgba(10,18,35,0.9)] border-blue-500/15 text-center">
        <p className="text-white/60">Team member management coming soon...</p>
        <Button className="mt-4 bg-blue-600 hover:bg-blue-500">Add Member</Button>
      </Card>
    </div>
  )
}
