import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { SignedIn, SignedOut, SignIn, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <h1>Welcome to the app</h1>
     <SignedOut>
         <SignInButton mode='modal'> 
            <button className='sign-Up'>
              Sign up please
            </button>
         </SignInButton>
     </SignedOut>

     <SignedIn>
        <SignOutButton/>
     </SignedIn>

     <UserButton/>
    </>
  )
}

export default App
