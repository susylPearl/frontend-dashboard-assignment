import { Link } from 'react-router-dom'
import { ROUTES } from '../constants/routes'

function TableIcon() {
  return (
    <svg
      className="size-8 text-slate-600"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
      />
    </svg>
  )
}

function SparkIcon() {
  return (
    <svg
      className="size-8 text-slate-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  )
}

export function HomePage() {
  return (
    <div className="space-y-8 md:space-y-10">
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 p-6 text-white shadow-lg md:p-10">
        <p className="text-sm font-medium uppercase tracking-wider text-slate-400">
          Welcome back
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
          Your product command center
        </h1>
        <p className="mt-4 max-w-xl text-slate-300">
          Search, paginate, and explore inventory powered by live data. Jump
          into the catalog whenever you&apos;re ready.
        </p>
        <Link
          to={ROUTES.DATA}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-md transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800"
        >
          Open products
          <span aria-hidden>→</span>
        </Link>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-slate-900 md:text-xl">
          Quick actions
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          <li>
            <Link
              to={ROUTES.DATA}
              className="flex h-full gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                <TableIcon />
              </span>
              <div>
                <h3 className="font-semibold text-slate-900">
                  Browse catalog
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Filter with search, change page size, and paginate through
                  DummyJSON products.
                </p>
              </div>
            </Link>
          </li>
          <li>
            <div className="flex h-full gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                <SparkIcon />
              </span>
              <div>
                <h3 className="font-semibold text-slate-900">Coming soon</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Room for analytics, saved views, or exports—extend this card
                  when you add new routes.
                </p>
              </div>
            </div>
          </li>
        </ul>
      </section>
    </div>
  )
}
