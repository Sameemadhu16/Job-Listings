import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import SeekerDashboard from './pages/Seeker.Dashboard'
import Header from './components/Header';
import Footer from './components/Footer';
import PosterCompanyInfo from './pages/Poster.CompanyInfo';
import PosterFountInfo from './pages/Poster.Found-Info';
import PosterSocailMediaInfo from './pages/Poster.SocailMediaInfo';
import Contact from './pages/Contact';
import Finish from './pages/Finish';
import PosterDashboard from './pages/Poster.Dashboard';


export default function App() {
  return <BrowserRouter>
  <Header/>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/sign-up' element={<SignUp/>}/>
    <Route path='/sign-in' element={<SignIn/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/seeker-dashboard' element={<SeekerDashboard/>}/>
    <Route path='/company-info' element={<PosterCompanyInfo/>}/>
    <Route path='/found-info' element={<PosterFountInfo/>}/>
    <Route path='/social-info' element={<PosterSocailMediaInfo/>}/>
    <Route path='/contact' element={<Contact/>}/>
    <Route path='/finish' element={<Finish/>}/>
    <Route path='/poster-dashboard' element={<PosterDashboard/>}/>
  </Routes>
  <Footer/>
</BrowserRouter>
    
}
