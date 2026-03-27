import './App.css'
import { useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate()

  const handleProfile = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    navigate('/profile')
  }

  return (
    <>
      <section id="center">
        <div className="hero">
          
        </div>
        <div>
          <h1>Pierwsza strona</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>

        <button
          className="stepin"
          onClick={handleProfile}
        >
          Login
        </button>
      </section>
    </>
  )
}

export default App
