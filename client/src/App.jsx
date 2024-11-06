import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import About from './pages/About';
import Header from './components/Header';
import Footer from './components/Footer';
import Contact from './pages/Contact';
import Finish from './pages/Finish';
import PosterDashboard from './pages/Poster.Dashboard';
import PosterDashOverview from './components/Poster.DashOverview';
import PosterSetting from './components/poster.Setting';
import PosterCompanyInfo from './components/Poster.CompanyInfo';
import PosterPostjob from './components/Poster.Postjob';
import PosterFoundInfo from './components/Poster.FoundInfo';
import PosterSocialMediaInfo from './components/Poster.SocialMediaInfo';
import PartTimeJobPost from './components/Post.PartTimeJobPost';
import FulltimeJobPost from './components/Post.FulltimeJobPost';
import PosterDashMyJobs from './components/Poster.DashMyJobs';
import PosterDashEmployeeProfile from './components/Poster.DashEmployeeProfile';
import PosterDashSavedCandidate from './components/Poster.Dashusers';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import UpdatePost from './pages/UpdatePost';
import SeekerDashboard from './pages/Seeker.Dashboard';
import SeekerProfile from './components/Seeker.Profile';
import PrivateRoute from './components/PrivateRoute';

import Fpost from './pages/Fpost';
import FpostUpdate from './pages/FpostUpdate';
import Landing from './pages/Landing';
import Homeh from './pages/Home'
import Search from './pages/Search';
import Chat from './pages/Chat';

import { useSelector } from 'react-redux'
import AdminPage from './pages/AdminPage';
import ChatList from './pages/ChatList';
import PosterChatBox from './pages/Poster.ChatBox';
import NotFound from './pages/NotFound';




export default function App() {

  
  const {currentUser}= useSelector((state) => state.user)
  const role = currentUser ? currentUser.role : '';
  const admin = currentUser ? currentUser.isAdmin : false;
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/landing" element={<Landing />} />
        <Route path='*' element={<NotFound/>}/>
        
        
        <Route element={<PrivateRoute/>}>
          <Route path='/' element={<Home/>}/>
          <Route path="/contact" element={<Contact />} />
          <Route path='/search' element={<Search/>}></Route>
          <Route path = '/full-post/:postId' element={<Fpost/>}/>
          <Route path='/post/:postId' element={<Post/>}/> 
          <Route path='/chat-list' element={<ChatList/>}/>
          
          {
            admin &&
            <Route path='/admin-dashboard' element={<AdminPage/>} />
          }

          {
            role == 'jobSeeker' && 
            <>
              <Route path='/chatbox' element={<Chat/>}/>
              <Route path="/seeker-dashboard" element={<SeekerDashboard />} />
              <Route path="/seeker-dashboard?tab=profile" element={<SeekerProfile/>} />
            </>
            
          }

          {
            role == 'jobPoster' && 
            <>
              <Route path='/poster-chat-box/:postId/:sendId' element={<PosterChatBox/>}/>
              <Route path="/poster-dashboard" element={<PosterDashboard />}>
              <Route index element={<PosterDashOverview />} />
              <Route path="employeeprofile" element={<PosterDashEmployeeProfile />} />
              <Route path="my-jobs" element={<PosterDashMyJobs />}/>
              <Route index element={<PosterCompanyInfo />} />
              <Route path='create-p-job' element={<CreatePost/>}/>
              
              
              <Route path="saved-candidate" element={<PosterDashSavedCandidate />}></Route>
              <Route path="settings" element={<PosterSetting />}>
              <Route index element={<PosterCompanyInfo />} />
              </Route>
              </Route>

              <Route path="/parttime-job-post" element={<PartTimeJobPost />} />
              <Route path="/fulltime-job-post" element={<FulltimeJobPost />} />
              <Route path='/update-post/:postId' element={<UpdatePost/>}/>
              

              <Route path = '/create-f-job' element={<PosterCompanyInfo/>}/>
              <Route path = '/update-full-post/:postId' element={<FpostUpdate/>}/>
              
            </>
          }

          
          <Route path="/company" element={<PosterCompanyInfo />} />
          <Route path="/finish" element={<Finish />} />
          
        </Route>
        
      </Routes>
      <Footer />
    </BrowserRouter>
  );

}
