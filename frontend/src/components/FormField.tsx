import { type ChangeEvent } from 'react'

interface FormFieldProps {
  label: string
  name: string
  value: string | number
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  error?: string
  type?: string
  placeholder?: string
  min?: number
  max?: number
}

function FormField({ label, name, value, onChange, error, type = 'text', placeholder, min, max }: FormFieldProps): React.JSX.Element {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        min={min}
        max={max}
        className={`form-control ${error ? 'is-invalid' : ''}`}
        value={value}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}

export default FormField
