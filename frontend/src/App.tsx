import { useNavigate } from 'react-router-dom'

function App(): React.JSX.Element {
  const navigate = useNavigate()

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="row justify-content-center w-100">
        <div className="col-md-6 text-center">
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
      </div>
    </div>
  )
}

export default App
