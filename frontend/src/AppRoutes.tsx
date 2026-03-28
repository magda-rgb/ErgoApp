import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
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

  const isProfileComplete = profileData.firstName.trim() !== ''
    && profileData.lastName.trim() !== ''
    && profileData.age !== ''
    && profileData.city.trim() !== ''

  const isInsuranceComplete = isProfileComplete
    && insuranceData.insuranceType !== ''
    && insuranceData.coverageAmount >= 1000

  return (
    <Routes>
      <Route path="/profile" element={<ProfileForm data={profileData} setData={setProfileData} />} />
      <Route path="/insuranceForm" element={
        isProfileComplete
          ? <InsuranceForm data={insuranceData} setData={setInsuranceData} />
          : <Navigate to="/profile" replace />
      } />
      <Route path="/summary" element={
        isInsuranceComplete
          ? <Summary profileData={profileData} insuranceData={insuranceData} />
          : <Navigate to="/profile" replace />
      } />
    </Routes>
  )
}

export default AppRoutes
