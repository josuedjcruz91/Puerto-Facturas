import { Link } from 'react-router-dom'
import { useSession } from '../../hooks/useSession'
import Icon from './Icon'
export default function AdminOnly({ children }) {
  const { role } = useSession()
  if (role !== 'admin') return <section className="panel access-panel"><Icon name="shield" size={40} /><h1>Espacio de administración</h1><p>Tu perfil de empleado permite crear y consultar facturas. Esta sección está reservada al perfil de administrador.</p><p>Para probarlo, selecciona Administrador en el selector de perfil de demostración.</p><Link className="button" to="/facturas">Volver a mis facturas</Link></section>
  return children
}
