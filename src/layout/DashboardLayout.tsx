import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Header } from './Header'

export function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const id = requestAnimationFrame(() => setIsSidebarOpen(false))
    return () => cancelAnimationFrame(id)
  }, [location.pathname])

  return (
    <div className="flex min-h-screen bg-[#f5f4f1]">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header onMenuClick={() => setIsSidebarOpen((o) => !o)} />
        <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
