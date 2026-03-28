import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { type ProfileData, type InsuranceData } from './types'
import ProfileForm from './ProfileForm'
import InsuranceForm from './InsuranceForm'
import Summary from './Summary'

function AppRoutes(): React.JSX.Element {
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: '',
    lastName: '',
    age: '',
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
      <Route path="/summary" element={<Summary profileData={profileData} insuranceData={insuranceData} />} />
    </Routes>
  )
}

export default AppRoutes
