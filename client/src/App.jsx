import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import Footer from './components/Footer';
import SeekerDashboard from './pages/Seeker.Dashboard';

export default function App() {
  return <BrowserRouter>
  <Header/>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/sign-up' element={<SignUp/>}/>
    <Route path='/sign-in' element={<SignIn/>}/>
    <Route path='/dashboard' element={<SeekerDashboard/>}/>

  </Routes>
  <Footer/>
</BrowserRouter>
    
}
