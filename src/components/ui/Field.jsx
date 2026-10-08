import { useId } from 'react'
export default function Field({ label, children, ...props }) {
  const id = useId()
  return <label className="field" htmlFor={id}><span>{label}</span>{children || <input id={id} {...props} />}</label>
}
