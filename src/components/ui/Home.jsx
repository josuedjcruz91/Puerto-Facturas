import { Navigate } from 'react-router-dom'
import { useSession } from '../../hooks/useSession'
export default function Home() { const { role } = useSession(); return <Navigate to={role === 'admin' ? '/admin' : '/facturas'} replace /> }
