import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Signup from './Signup'

export default function App() {
  return <BrowserRouter>
  <Routes>
    <Route path='/sign-up' element={<Signup/>}/>
  </Routes>
</BrowserRouter>
    
}
