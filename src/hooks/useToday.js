import { useEffect, useState } from 'react'
import { businessToday } from '../utils/invoiceStatus'
export function useToday() {
  const [today, setToday] = useState(businessToday)
  useEffect(() => { const timer = setInterval(() => setToday(businessToday()), 60000); return () => clearInterval(timer) }, [])
  return today
}
