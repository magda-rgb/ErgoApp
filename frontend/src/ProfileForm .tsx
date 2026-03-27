import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'

interface FormData {
  firstName: string
  lastName: string
  age: number
  city: string
}

interface FormErrors {
  firstName?: string
  lastName?: string
  age?: string
  city?: string
}

const inputClassName = "block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"

function ProfileForm(): React.JSX.Element {
  const navigate = useNavigate()

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    age: 0,
    city: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const newErrors: FormErrors = {}

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (formData.age < 18 || formData.age > 100) newErrors.age = 'Age must be between 18 and 100'
    if (!formData.city.trim()) newErrors.city = 'City is required'

    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      console.log(formData)
    }
  }

  return (
    <section id="center">
      <div>
        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12 dark:border-white/10">
              <h2 className="text-base/7 font-semibold text-gray-900 dark:text-white">Personal Information</h2>
              <p className="mt-1 text-sm/6 text-gray-600 dark:text-gray-400">
                Fill in your personal details.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="firstName" className="block text-sm/6 font-medium text-gray-900 dark:text-white">
                    First name
                  </label>
                  <div className="mt-2">
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      className={inputClassName}
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                    {errors.firstName && <p id="firstName-error" role="alert" className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="lastName" className="block text-sm/6 font-medium text-gray-900 dark:text-white">
                    Last name
                  </label>
                  <div className="mt-2">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      className={inputClassName}
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                    {errors.lastName && <p id="lastName-error" role="alert" className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="age" className="block text-sm/6 font-medium text-gray-900 dark:text-white">
                    Age
                  </label>
                  <div className="mt-2">
                    <input
                      id="age"
                      name="age"
                      type="number"
                      
                      min={18}
                      max={100}
                      className={inputClassName}
                      value={formData.age}
                      onChange={handleChange}
                    />
                    {errors.age && <p id="age-error" role="alert" className="mt-1 text-sm text-red-500">{errors.age}</p>}
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="city" className="block text-sm/6 font-medium text-gray-900 dark:text-white">
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      id="city"
                      name="city"
                      type="text"
                      className={inputClassName}
                      value={formData.city}
                      onChange={handleChange}
                    />
                    {errors.city && <p id="city-error" role="alert" className="mt-1 text-sm text-red-500">{errors.city}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" className="text-sm/6 font-semibold text-gray-900 dark:text-white" onClick={() => navigate('/')}>
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:focus-visible:outline-indigo-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default ProfileForm
