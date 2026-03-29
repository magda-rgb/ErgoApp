import { useNavigate } from 'react-router-dom'
import PageLayout from './components/PageLayout'

function App(): React.JSX.Element {
  const navigate = useNavigate()

  return (
    <PageLayout>
      <div className="text-center">
          <h1 className="display-4 fw-bold mb-3">ErgoApp</h1>
          <p className="text-muted mb-4">Insurance risk calculator. Fill in your details to get started.</p>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate('/profile')}
          >
            Get started
          </button>
      </div>
    </PageLayout>
  )
}

export default App
