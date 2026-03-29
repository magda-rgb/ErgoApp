import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { type ProfileData } from './types'
import { logError } from './logger'

interface ProfileFormProps {
  data: ProfileData
  setData: React.Dispatch<React.SetStateAction<ProfileData>>
}

interface ProfileFormErrors {
  firstName?: string
  lastName?: string
  age?: string
  city?: string
}

function ProfileForm({ data, setData }: ProfileFormProps): React.JSX.Element {
  const navigate = useNavigate()
  const [errors, setErrors] = useState<ProfileFormErrors>({})

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const newErrors: ProfileFormErrors = {}

    if (!data.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!data.lastName.trim()) newErrors.lastName = 'Last name is required'
    const ageNum = Number(data.age)
    if (!data.age || isNaN(ageNum) || ageNum < 18 || ageNum > 100) newErrors.age = 'Age must be between 18 and 100'
    if (!data.city.trim()) newErrors.city = 'City is required'

    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) {
      logError('ProfileForm.validation', new Error(Object.values(newErrors).join(', ')))
    } else {
      navigate('/InsuranceForm')
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="row justify-content-center w-100">
        <div className="col-md-6">
          <h2 className="mb-2">Personal Information</h2>
          <p className="text-muted mb-4">Fill in your personal details.</p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">First name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Jan"
                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                value={data.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">Last name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Kowalski"
                className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                value={data.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="age" className="form-label" >Age</label>
              <input
                id="age"
                name="age"
                type="number"
                min={18}
                max={100}
                placeholder="25"
                className={`form-control ${errors.age ? 'is-invalid' : ''}`}
                value={data.age}
                onChange={handleChange}
              />
              {errors.age && <div className="invalid-feedback">{errors.age}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="city" className="form-label">City</label>
              <input
                id="city"
                name="city"
                type="text"
                placeholder="Warszawa"
                className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                value={data.city}
                onChange={handleChange}
              />
              {errors.city && <div className="invalid-feedback">{errors.city}</div>}
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/')}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save and continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProfileForm
