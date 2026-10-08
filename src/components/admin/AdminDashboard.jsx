import { lazy, Suspense } from 'react'
const Dashboard = lazy(() => import('../../pages/AdminDashboardPage'))
export default function AdminDashboard() { return <Suspense fallback={<p role="status">Cargando administración…</p>}><Dashboard /></Suspense> }
