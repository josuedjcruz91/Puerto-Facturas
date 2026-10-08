import AdminDashboard from '../components/admin/AdminDashboard'
import AdminOnly from '../components/ui/AdminOnly'
import Home from '../components/ui/Home'
import { Link } from 'react-router-dom'
import App from '../app/App'
import InvoiceListPage from '../pages/InvoiceListPage'
import InvoiceCreatePage from '../pages/InvoiceCreatePage'
import InvoiceDetailPage from '../pages/InvoiceDetailPage'
import AnalyticsPage from '../pages/AnalyticsPage'
import SimulationPage from '../pages/SimulationPage'
export const routes = [{ element: <App />, children: [
  { path: '/', element: <Home /> },
  { path: '/admin', element: <AdminOnly><AdminDashboard /></AdminOnly> },
  { path: '/resumen', element: <AdminOnly><AnalyticsPage /></AdminOnly> },
  { path: '/simulacion', element: <AdminOnly><SimulationPage /></AdminOnly> },
  { path: '/facturas', element: <InvoiceListPage /> },
  { path: '/facturas/nueva', element: <InvoiceCreatePage /> },
  { path: '/facturas/:id', element: <InvoiceDetailPage /> },
  { path: '*', element: <div className="empty"><h1>Página no encontrada</h1><Link to="/facturas">Volver a facturas</Link></div> },
] }]
