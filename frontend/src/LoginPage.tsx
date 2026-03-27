import { useState } from 'react'
import './App.css'

function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [age, setAge] = useState<number>(0)
  const [city, setCity] = useState<string>('')

  return (
    <>
      <section id="center">
        <div>
          <h1>Login</h1>
          <form >
             <input type="text" 
             value={username} 
             onChange={(e) => setUsername(e.target.value)} />
             <input type="password" 
             value={password} 
             onChange={(e) => setPassword(e.target.value)} />
             <button type="submit">Login</button>
          </form>
        </div>
      </section>
    </>
  )
}

export default LoginPage
