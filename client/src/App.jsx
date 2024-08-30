import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Header from './components/Header';
import Footer from './components/Footer';
import Contact from './pages/Contact';
import Finish from './pages/Finish';
import PosterDashboard from './pages/Poster.Dashboard';
import SeekerDashboard from './pages/Seeker.Dashboard';
import PosterDashOverview from './components/Poster.DashOverview';
import PosterSetting from './components/poster.Setting';
import PosterCompanyInfo from './components/Poster.CompanyInfo';
import PosterPostjob from './components/Poster.Postjob';
import PosterFoundInfo from './components/Poster.FoundInfo';
import PosterSocialMediaInfo from './components/Poster.SocialMediaInfo';
import PartTimeJobPost from './components/Post.PartTimeJobPost';
import FulltimeJobPost from './components/Post.FulltimeJobPost';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import UpdatePost from './pages/UpdatePost';

import SeekerProfile from './components/Seeker.Profile';


import PosterDashMyJobs from './components/Poster.DashMyJobs';
import PosterDashEmployeeProfile from './components/Poster.DashEmployeeProfile';
import PosterDashSavedCandidate from './components/Poster.DashSavedCandidate';




export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/create-post' element={<CreatePost/>} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        

        <Route path="/contact" element={<Contact />} />
        <Route path="/finish" element={<Finish />} />
        <Route path="/poster-dashboard" element={<PosterDashboard />}>
          <Route index element={<PosterDashOverview />} />
          <Route path="employeeprofile" element={<PosterDashEmployeeProfile />} />
          <Route path="post-jobs" element={<PosterDashMyJobs />}>
            <Route index element={<PosterCompanyInfo />} />
            <Route path="founding" element={<PosterFoundInfo />} />
            <Route path="social-media" element={<PosterSocialMediaInfo />} />
            <Route path="account-setting" element={<PosterCompanyInfo />} />
          </Route>
          <Route path="saved-candidate" element={<PosterDashSavedCandidate />}></Route>
          <Route path="settings" element={<PosterSetting />}>
            <Route index element={<PosterCompanyInfo />} />
          </Route>
        </Route>
        <Route path="/company" element={<PosterCompanyInfo />} />
        <Route path="/seeker-dashboard" element={<SeekerDashboard />} />
        <Route path="/seeker-dashboard?tab=profile" element={<SeekerProfile/>} />
        <Route path="/parttime-job-post" element={<PartTimeJobPost />} />
        <Route path="/fulltime-job-post" element={<FulltimeJobPost />} />
        <Route path="/post-page/:postslug" element={<Post/>}/>
        <Route path='/update-post/:postId' element={<UpdatePost/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
