import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import About from './pages/About';
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import Finish from "./pages/Finish";
import PosterDashboard from "./pages/Poster.Dashboard";
import PosterCompanyInfo from "./components/Poster.CompanyInfo";

{/* <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/finish' element={<Finish />} />
      <Route path='/poster-dashboard' element={<PosterDashboard />}>

        <Route path='/company' element={<PosterCompanyInfo />} />
      </Route>

      <Route path='/seeker-dashboard' element={<SeekerDashboard />} />
      <Route path='/job-post' element={<JobPost />} />

    </Routes> */}

export const router = createBrowserRouter([
    {
        path: '',
        element: <Home />
    },
    {
        path: 'about',
        element: <About />
    },
    {
        path: 'sign-up',
        element: <SignUp />
    },
    {
        path: 'sign-in',
        element: <SignIn />
    },
    {
        path: 'dashboard',
        element: <Dashboard />
    },
    {
        path: 'contact',
        element: <Contact />
    },
    {
        path: 'poster-dashboard',
        element: <PosterDashboard />,
        children: [
            {
                path: 'settings',
                element: <Finish />,
                children: [
                    {
                        path: 'company',
                        element: <PosterCompanyInfo />
                    }
                ]
            },
        ]
    }
])