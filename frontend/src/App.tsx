import './App.css'
import { useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate()

  const handleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    navigate('/login')
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
          onClick={handleLogin}
        >
          Login
        </button>
      </section>
    </>
  )
}

export default App
