import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { type InsuranceData } from './types'

interface InsuranceFormProps {
  data: InsuranceData
  setData: React.Dispatch<React.SetStateAction<InsuranceData>>
}

interface InsuranceFormErrors {
  insuranceType?: string
  vehicleYear?: string
  coverageAmount?: string
  additionalCoverage?: string
}

const currentYear = new Date().getFullYear()
const yearOptions = Array.from({ length: currentYear - 1959 }, (_, i) => currentYear - i)

function InsuranceForm({ data, setData }: InsuranceFormProps): React.JSX.Element {
  const navigate = useNavigate()
  const [errors, setErrors] = useState<InsuranceFormErrors>({})
  const [showAdditional, setShowAdditional] = useState<boolean>(data.additionalCoverage.length > 0)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value, type } = e.target
    setData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const newErrors: InsuranceFormErrors = {}

    if (!data.insuranceType) newErrors.insuranceType = 'Please select an insurance type'
    if (data.insuranceType === 'car' && !data.vehicleYear) newErrors.vehicleYear = 'Please select the vehicle year'
    if (data.coverageAmount < 1000) newErrors.coverageAmount = 'Coverage amount must be at least 1,000'
    if (showAdditional && !data.additionalCoverage.trim()) newErrors.additionalCoverage = 'Please enter the additional coverage'

    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      navigate('/summary')
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="row justify-content-center w-100">
        <div className="col-md-6">
          <h2 className="mb-2">Insurance Information</h2>
          <p className="text-muted mb-4">Fill in your insurance details.</p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label htmlFor="insuranceType" className="form-label">Insurance type</label>
              <select
                id="insuranceType"
                name="insuranceType"
                className={`form-select ${errors.insuranceType ? 'is-invalid' : ''}`}
                value={data.insuranceType}
                onChange={handleChange}
              >
                <option value="" disabled>Choose your insurance type...</option>
                <option value="car">Car</option>
                <option value="home">Home</option>
                <option value="travel">Travel</option>
              </select>
              {errors.insuranceType && <div className="invalid-feedback">{errors.insuranceType}</div>}
            </div>

            {data.insuranceType === 'car' && (
              <div className="mb-3">
                <label htmlFor="vehicleYear" className="form-label">Vehicle production year</label>
                <select
                  id="vehicleYear"
                  name="vehicleYear"
                  className={`form-select ${errors.vehicleYear ? 'is-invalid' : ''}`}
                  value={data.vehicleYear}
                  onChange={handleChange}
                >
                  <option value="0" disabled>Select year...</option>
                  {yearOptions.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                {errors.vehicleYear && <div className="invalid-feedback">{errors.vehicleYear}</div>}
              </div>
            )}

            <div className="mb-3">
              <label htmlFor="coverageAmount" className="form-label">Coverage amount</label>
              <input
                id="coverageAmount"
                name="coverageAmount"
                type="number"
                min={1000}
                placeholder="5000"
                className={`form-control ${errors.coverageAmount ? 'is-invalid' : ''}`}
                value={data.coverageAmount || ''}
                onChange={handleChange}
              />
              {errors.coverageAmount && <div className="invalid-feedback">{errors.coverageAmount}</div>}
            </div>

            <div className="mb-3 form-check">
              <input
                id="showAdditional"
                type="checkbox"
                className="form-check-input"
                checked={showAdditional}
                onChange={() => {
                  const next = !showAdditional
                  setShowAdditional(next)
                  if (!next) setData(prev => ({ ...prev, additionalCoverage: '' }))
                }}
              />
              <label htmlFor="showAdditional" className="form-check-label">Add additional coverage</label>
            </div>

            {showAdditional && (
              <div className="mb-3">
                <label htmlFor="additionalCoverage" className="form-label">Additional coverage details</label>
                <input
                  id="additionalCoverage"
                  name="additionalCoverage"
                  type="text"
                  className={`form-control ${errors.additionalCoverage ? 'is-invalid' : ''}`}
                  value={data.additionalCoverage}
                  onChange={handleChange}
                />
                {errors.additionalCoverage && <div className="invalid-feedback">{errors.additionalCoverage}</div>}
              </div>
            )}

            <div className="d-flex justify-content-end gap-2">
              <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/profile')}>
                Back
              </button>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default InsuranceForm
