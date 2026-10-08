import { useState } from 'react'
import { SessionContext } from './sessionContext'
export default function SessionProvider({ children }) {
  const [role, setRole] = useState(() => { try { return localStorage.getItem('puerto-role') === 'admin' ? 'admin' : 'employee' } catch { return 'employee' } })
  const changeRole = role => { if (!['admin', 'employee'].includes(role)) return; setRole(role); try { localStorage.setItem('puerto-role', role) } catch { /* Perfil de demostración sin persistencia. */ } }
  return <SessionContext.Provider value={{ role, changeRole }}>{children}</SessionContext.Provider>
}
