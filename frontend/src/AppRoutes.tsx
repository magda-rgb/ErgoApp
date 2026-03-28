import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import ProfileForm from './ProfileForm .tsx'
import InsuranceForm from './InsuranceForm.tsx'

export interface ProfileData {
  firstName: string
  lastName: string
  age: number
  city: string
}

export interface InsuranceData {
  insuranceType: string
  vehicleYear: number
  coverageAmount: number
  additionalCoverage: string
}

function AppRoutes(): React.JSX.Element {
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: '',
    lastName: '',
    age: 0,
    city: '',
  })

  const [insuranceData, setInsuranceData] = useState<InsuranceData>({
    insuranceType: '',
    vehicleYear: 0,
    coverageAmount: 0,
    additionalCoverage: '',
  })

  return (
    <Routes>
      <Route path="/profile" element={<ProfileForm data={profileData} setData={setProfileData} />} />
      <Route path="/InsuranceForm" element={<InsuranceForm data={insuranceData} setData={setInsuranceData} />} />
    </Routes>
  )
}

export default AppRoutes
