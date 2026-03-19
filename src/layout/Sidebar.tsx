import { NavLink } from 'react-router-dom'
import { ROUTES } from '../constants/routes'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

function HomeIcon() {
  return (
    <svg className="size-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  )
}

function DataIcon() {
  return (
    <svg className="size-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
    </svg>
  )
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      <div
        role="button"
        tabIndex={0}
        aria-label="Close menu"
        onClick={onClose}
        onKeyDown={(e) => e.key === 'Enter' && onClose()}
        className={`fixed inset-0 z-40 bg-black/45 transition-opacity md:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <aside
        className={`fixed top-0 left-0 z-50 flex min-h-screen w-[15.5rem] flex-col bg-neutral-950 text-neutral-100 shadow-2xl transition-transform duration-200 ease-out md:sticky md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="border-b border-neutral-800 px-5 py-6">
          <h2 className="text-lg font-semibold tracking-tight text-white">
            Dashboard
          </h2>
        </div>
        <nav className="flex-1 p-3">
          <ul className="space-y-1">
            <li>
              <NavLink
                to={ROUTES.HOME}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-neutral-800 text-white'
                      : 'text-neutral-400 hover:bg-neutral-800/60 hover:text-white'
                  }`
                }
              >
                <HomeIcon />
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={ROUTES.DATA}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-neutral-800 text-white'
                      : 'text-neutral-400 hover:bg-neutral-800/60 hover:text-white'
                  }`
                }
              >
                <DataIcon />
                Data
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  )
}
