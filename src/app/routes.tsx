import { createBrowserRouter, Navigate } from 'react-router-dom'
import { DashboardLayout } from '../layout/DashboardLayout'
import { HomePage } from '../pages/HomePage'
import { DataPage } from '../pages/DataPage'
import { ROUTES } from '../constants/routes'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: ROUTES.DATA, element: <DataPage /> },
    ],
  },
  // Catch-all: any unknown path redirects to home
  { path: '*', element: <Navigate to={ROUTES.HOME} replace /> },
])
