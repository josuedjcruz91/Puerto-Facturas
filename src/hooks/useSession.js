import { useContext } from 'react'
import { SessionContext } from '../app/sessionContext'
export function useSession() { return useContext(SessionContext) }
