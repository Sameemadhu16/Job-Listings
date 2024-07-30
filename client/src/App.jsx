import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import Footer from './components/Footer';

import Contact from './pages/Contact';
import Finish from './pages/Finish';
import PosterDashboard from './pages/Poster.Dashboard';
import SeekerDashboard from './pages/Seeker.Dashboard';
import JobPost from './components/JobPost';
import PosterDashOverview from './components/Poster.DashOverview';
import PosterSetting from './components/poster.Setting';
import PosterCompanyInfo from './components/Poster.CompanyInfo';
import PosterPostjob from './components/Poster.Postjob';
import PosterFoundInfo from './components/Poster.FoundInfo';
import PosterSocialMediaInfo from './components/Poster.SocialMediaInfo';


export default function App() {
  return <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/finish' element={<Finish />} />
      <Route path='/poster-dashboard' element={<PosterDashboard />} >
        <Route index element={<PosterDashOverview />} />
        <Route path='employeeprofile' element={<PosterDashOverview />} />
        <Route path='post-jobs' element={<PosterPostjob />} >
          <Route index element={<PosterCompanyInfo />} />
          <Route path='founding' element={<PosterFoundInfo />} />
          <Route path='social-media' element={<PosterSocialMediaInfo />} />
          <Route path='account-setting' element={<PosterCompanyInfo />} />
        </Route>
        <Route path='settings' element={<PosterSetting />}>
          <Route index element={<PosterCompanyInfo />} />

        </Route>
      </Route>
      <Route path='/company' element={<PosterCompanyInfo />} />

      <Route path='/seeker-dashboard' element={<SeekerDashboard />} />
      <Route path='/job-post' element={<JobPost />} />

    </Routes>
    <Footer />
  </BrowserRouter>

}
