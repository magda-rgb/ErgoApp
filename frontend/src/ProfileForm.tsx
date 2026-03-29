import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { type ProfileData } from './types'
import FormField from './components/FormField'
import PageLayout from './components/PageLayout'

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

    const nameRegex = /^[\p{Letter}\s-]+$/u
    if (!data.firstName.trim()) newErrors.firstName = 'First name is required'
    else if (!nameRegex.test(data.firstName)) newErrors.firstName = 'First name can only contain letters'
    if (!data.lastName.trim()) newErrors.lastName = 'Last name is required'
    else if (!nameRegex.test(data.lastName)) newErrors.lastName = 'Last name can only contain letters'
    const ageNum = Number(data.age)
    if (!data.age || isNaN(ageNum) || ageNum < 18 || ageNum > 100) newErrors.age = 'Age must be between 18 and 100'
    if (!data.city.trim()) newErrors.city = 'City is required'

    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      navigate('/InsuranceForm')
    }
  }

  return (
    <PageLayout>
      <h2 className="mb-2">Personal Information</h2>
      <p className="text-muted mb-4">Fill in your personal details.</p>

      <form onSubmit={handleSubmit} noValidate>
        <FormField label="First name" name="firstName" value={data.firstName} onChange={handleChange} error={errors.firstName} placeholder="Jan" />
        <FormField label="Last name" name="lastName" value={data.lastName} onChange={handleChange} error={errors.lastName} placeholder="Kowalski" />
        <FormField label="Age" name="age" type="number" value={data.age} onChange={handleChange} error={errors.age} placeholder="25" min={18} max={100} />
        <FormField label="City" name="city" value={data.city} onChange={handleChange} error={errors.city} placeholder="Warszawa" />

        <div className="d-flex justify-content-end gap-2">
          <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/')}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save and continue
          </button>
        </div>
      </form>
    </PageLayout>
  )
}

export default ProfileForm
