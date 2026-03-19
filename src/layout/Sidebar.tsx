import { NavLink } from 'react-router-dom'
import { ROUTES } from '../constants/routes'

export function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-800 text-slate-100 flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <h2 className="text-xl font-semibold">Dashboard</h2>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <NavLink
              to={ROUTES.HOME}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-slate-600 text-white'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={ROUTES.DATA}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-slate-600 text-white'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`
              }
            >
              Data
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
