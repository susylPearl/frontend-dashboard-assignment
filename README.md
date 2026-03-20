# Frontend Dashboard Assignment

A professional React dashboard application built with TypeScript, Vite, TailwindCSS, React Router, Redux Toolkit, and Axios. Features a responsive layout, products data table with search and pagination, and a clean, scalable architecture.

## Setup Instructions

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd frontend-dashboard-assignment

# Install dependencies
npm install

# Start development server
npm run dev
```

The app runs at `http://localhost:5173` (or the next available port).

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run test` | Run unit tests |
| `npm run test:watch` | Run tests in watch mode |

### Environment

API base URLs are configured in `src/constants/api.ts`. No `.env` file is required for the default setup (DummyJSON API).

---

## Architecture

### High-Level Flow

```
┌─────────────┐     ┌──────────────┐     ┌─────────────────┐
│   main.tsx  │────▶│ Redux Provider│────▶│ RouterProvider   │
└─────────────┘     └──────────────┘     └────────┬────────┘
                                                   │
                                                   ▼
┌─────────────────────────────────────────────────────────────┐
│                    DashboardLayout
│  ┌─────────────┐  ┌────────────────────────────────────────┐
│  │   Sidebar   │  │  Header                                 │
│  │  (nav)      │  │  ┌────────────────────────────────────────────────┐
│  └─────────────┘  │  │  Content (Outlet)                               │
│                   │  │  - HomePage / DataPage                          │
│                   │  └────────────────────────────────────────────────┘
│                   └────────────────────────────────────────┘
└─────────────────────────────────────────────────────────────┘
```

### Data Flow (Products)

1. **DataPage** mounts → `useEffect` dispatches `fetchProducts`
2. **productsSlice** thunk calls DummyJSON API via `productsApi`
3. **Error interceptor** normalizes API errors
4. **Redux store** updates with `items`, `loading`, `error`, `total`
5. **Memoized selectors** derive `totalPages`, `paginationInfo`
6. **DataPage** composes UI; **`useProductsListPage`** owns selectors, debounce, and fetch effect
7. **Debounced search** (~350ms) → new `fetchProducts` when user stops typing

---

## Folder Structure

```
src/
├── app/                    # App core
│   ├── App.tsx            # Root component with RouterProvider
│   ├── routes.tsx         # Route definitions
│   ├── store.ts           # Redux store config + RootState / AppDispatch types
│   └── hooks.ts           # Typed useAppDispatch / useAppSelector
├── layout/                 # Dashboard layout
│   ├── DashboardLayout.tsx
│   ├── Sidebar.tsx        # Responsive nav (collapsible on mobile)
│   └── Header.tsx        # Breadcrumbs, hamburger menu
├── pages/
│   ├── HomePage.tsx
│   └── DataPage.tsx      # Products table, search, pagination
├── features/              # Feature modules
│   └── products/
│       ├── productsSlice.ts
│       ├── productsSelectors.ts
│       ├── productsSelectors.test.ts
│       ├── useProductsListPage.ts   # List page data + effects
│       └── productTableColumns.tsx  # getProductTableColumns() — includes price sort in Price header
├── shared/
│   ├── components/       # Reusable UI
│   │   ├── SearchBar.tsx
│   │   ├── DataTable.tsx
│   │   ├── DropdownMenu.tsx
│   │   ├── Pagination.tsx
│   │   ├── ItemsPerPageSelect.tsx
│   │   ├── PriceSortSelect.tsx
│   │   ├── ProductTableSkeleton.tsx
│   │   ├── Loader.tsx
│   │   ├── ErrorState.tsx
│   │   └── EmptyState.tsx
│   └── hooks/
│       └── useDebouncedValue.ts
├── services/
│   ├── api.ts            # Axios instances
│   └── axiosFactory.ts   # Reusable client with error interceptor
├── constants/
│   ├── api.ts
│   └── routes.ts
├── types/
│   └── index.ts
├── main.tsx
└── index.css
```

---

## Features

- **Layout**: Responsive dashboard with sidebar (collapsible on mobile), header with breadcrumbs
- **Routing**: React Router with `/` (Home) and `/data` (Products)
- **Products**: Data table with search, **price sort** (icon toggle: low→high / high→low on the current page), pagination, items-per-page (5/10/20/30)
- **Data source**: [DummyJSON](https://dummyjson.com/products) API
- **State**: Redux Toolkit with `createAsyncThunk` for async fetch
- **Selectors**: Memoized selectors for items, pagination, loading, error
- **UI components**: SearchBar, DataTable, DropdownMenu, Pagination, ItemsPerPageSelect, PriceSortSelect, ProductTableSkeleton, Loader, ErrorState, EmptyState
- **Debounced search**: ~350ms delay to reduce API calls while typing
- **Error handling**: Normalized API errors, retry on failure
- **Styling**: TailwindCSS with responsive design

---

## Redux Toolkit Usage

Redux Toolkit was required for this assignment. It is used here for:

1. **Centralized state**: Products data (items, loading, error, searchTerm, currentPage, itemsPerPage, total, `priceSortOrder`) lives in one place, accessible from any component.

2. **Async logic**: `createAsyncThunk` handles the fetch lifecycle (pending, fulfilled, rejected) in a clean, declarative way without manual boilerplate.

3. **Immutability**: `createSlice` uses Immer under the hood, so reducers can be written with "mutating" syntax while staying immutable.

4. **Type safety**: `useAppDispatch` and `useAppSelector` from `hooks.ts` (typed against `store.ts`) keep components and feature hooks fully typed.

5. **DevTools**: Redux DevTools integration is enabled by default for debugging.

6. **Scalability**: The feature-based structure (slice + selectors) makes it easy to add more features (e.g. auth, cart) without refactoring.

---

## Testing

Unit tests are written with Vitest. Run:

```bash
npm run test
```

Tests cover selector behavior (e.g. `selectTotalPages`, `selectPaginationInfo`, `selectSearchTerm`) for pagination and search state.

---

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** for build and dev server
- **TailwindCSS v4** for styling
- **React Router v7** for routing
- **Redux Toolkit** for state management
- **Axios** for HTTP requests
