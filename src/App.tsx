import { useState } from 'react'
import './App.css'
import { Registration } from './components/Registration'
import { Login } from './components/Login'
import { Button, Container,  } from '@mui/material'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [signup, setSignup] = useState(true)

  return (
    <>
      {signup ? <Login /> : <Registration />}
      <Container sx={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
        <Button onClick={() => { setSignup(true) }}>Login</Button>
        <Button onClick={() => { setSignup(false) }}>Sign In</Button>
      </Container>
      <ToastContainer
        position="top-left"
        autoClose={1000}
      />
    </>
  )
}

export default App
