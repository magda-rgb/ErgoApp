import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { type ProfileData, type InsuranceData } from './types'
import { logError } from './logger'
import PageLayout from './components/PageLayout'

interface SummaryProps {
  profileData: ProfileData
  insuranceData: InsuranceData
}

const API_URL = `${import.meta.env.VITE_API_URL}/calculate_insurance`

function Summary({ profileData, insuranceData }: SummaryProps): React.JSX.Element {
  const navigate = useNavigate()
  const [riskLevel, setRiskLevel] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (): Promise<void> => {
    setLoading(true)
    setError('')
    setRiskLevel('')

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          age: Number(profileData.age),
          coverage: insuranceData.coverageAmount,
          insurance_type: insuranceData.insuranceType,
        }),
      })

      if (!response.ok) throw new Error('Server error')

      const data = await response.json()
      setRiskLevel(data.risk_level)
    } catch (err) {
      logError('Summary.handleSubmit', err)
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageLayout>
          <h2 className="mb-2">Summary</h2>
          <p className="text-muted mb-4">Review your information before submitting.</p>

          <div className="card mb-4">
            <div className="card-header">Personal Information</div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item"><strong>First name:</strong> {profileData.firstName}</li>
              <li className="list-group-item"><strong>Last name:</strong> {profileData.lastName}</li>
              <li className="list-group-item"><strong>Age:</strong> {profileData.age}</li>
              <li className="list-group-item"><strong>City:</strong> {profileData.city}</li>
            </ul>
          </div>

          <div className="card mb-4">
            <div className="card-header">Insurance Information</div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item"><strong>Insurance type:</strong> {insuranceData.insuranceType}</li>
              {insuranceData.insuranceType === 'car' && (
                <li className="list-group-item"><strong>Vehicle year:</strong> {insuranceData.vehicleYear}</li>
              )}
              <li className="list-group-item"><strong>Coverage amount:</strong> {insuranceData.coverageAmount}</li>
              {insuranceData.additionalCoverage && (
                <li className="list-group-item"><strong>Additional coverage:</strong> {insuranceData.additionalCoverage}</li>
              )}
            </ul>
          </div>

          {riskLevel && (
            <div className={`alert mb-4 ${riskLevel === 'Low' ? 'alert-success' : riskLevel === 'Medium' ? 'alert-warning' : 'alert-danger'}`}>
              <strong>Risk Level:</strong> {riskLevel}
            </div>
          )}

          {error && (
            <div className="alert alert-danger mb-4">
              <strong>Error:</strong> {error}
            </div>
          )}

          <div className="d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/InsuranceForm')}>
              Back
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
    </PageLayout>
  )
}

export default Summary
