import { useLocation, Link } from 'react-router-dom'
import { ROUTES } from '../constants/routes'

interface HeaderProps {
  onMenuClick: () => void
}

function HamburgerIcon() {
  return (
    <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

export function Header({ onMenuClick }: HeaderProps) {
  const location = useLocation()

  const breadcrumbs =
    location.pathname === ROUTES.DATA
      ? [
          { label: 'Home', path: ROUTES.HOME },
          { label: 'Products', path: ROUTES.DATA },
        ]
      : [{ label: 'Home', path: ROUTES.HOME }]

  return (
    <header className="h-14 md:h-16 bg-white border-b border-slate-200 flex items-center px-4 md:px-6 shadow-sm">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Toggle menu"
        className="md:hidden p-2 -ml-2 rounded-lg hover:bg-slate-100 transition-colors"
      >
        <HamburgerIcon />
      </button>
      <div className="flex-1 flex items-center gap-2 ml-2 md:ml-0">
        {breadcrumbs.map((crumb, i) => (
          <span key={crumb.path} className="flex items-center gap-2">
            {i > 0 && (
              <span className="text-slate-300">/</span>
            )}
            {i === breadcrumbs.length - 1 ? (
              <span className="text-slate-900 font-medium">{crumb.label}</span>
            ) : (
              <Link
                to={crumb.path}
                className="text-slate-500 hover:text-slate-700 transition-colors"
              >
                {crumb.label}
              </Link>
            )}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <span className="text-slate-600 text-sm hidden sm:inline">User menu</span>
      </div>
    </header>
  )
}
