'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()

  const isAdminPage = pathname === '/admin-dashboard'

  const handleClick = () => {
    if (!isAdminPage) {
      toast.success('Navigating to Admin Dashboard')
    }

    router.push(isAdminPage ? '/' : '/admin-dashboard')
  }

  return (
    <nav className="flex items-center justify-between px-4 py-4 sm:px-10 md:px-50 bg-white border-b border-gray-300">
      <div 
        onClick={() => router.push('/')}
      className="text-3xl font-medium text-blue-600 tracking-tight md:px-14">
        Geo<span className="text-green-500">Mapper</span>
      </div>

      <div>
        <Button onClick={handleClick} className="flex items-center space-x-2">
          {isAdminPage && <ArrowLeft className="w-4 h-4" />}
          <span>{isAdminPage ? 'Back' : 'Admin Dashboard'}</span>
        </Button>
      </div>
    </nav>
  )
}
