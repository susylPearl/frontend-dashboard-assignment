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
    <header className="flex h-12 items-center gap-3 border-b border-slate-200/80 bg-white px-4 md:h-14 md:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Toggle menu"
        className="-ml-2 rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 md:hidden"
      >
        <HamburgerIcon />
      </button>
      <nav
        className="flex min-w-0 flex-1 items-center gap-2 text-sm md:ml-0"
        aria-label="Breadcrumb"
      >
        {breadcrumbs.map((crumb, i) => (
          <span key={crumb.path} className="flex items-center gap-2">
            {i > 0 && (
              <span className="text-slate-300" aria-hidden>
                &gt;
              </span>
            )}
            {i === breadcrumbs.length - 1 ? (
              <span className="font-medium text-slate-500">{crumb.label}</span>
            ) : (
              <Link
                to={crumb.path}
                className="text-slate-400 transition-colors hover:text-slate-600"
              >
                {crumb.label}
              </Link>
            )}
          </span>
        ))}
      </nav>
    </header>
  )
}
