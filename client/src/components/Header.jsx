import { Avatar, Dropdown, Navbar, TextInput, Button, theme, Label } from "flowbite-react";
import logo from '../images/Jobpilot.png';

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate,useLocation } from "react-router-dom";
import { signoutSuccess } from "../redux/user/userSlice";
import { FaMoon, FaSun } from 'react-icons/fa';
import { toggleTheme } from "../redux/theme/themeSlice";


export default function Header() {

  const {currentUser} = useSelector(state => state.user);
  const location = useLocation();

  const isActive = (path) => location.pathname === path

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const getProfilePath = (role) => {
    if (role === 'jobPoster') {
      return '/poster-dashboard?tab=profile';
    } else if (role === 'jobSeeker') {
      return '/seeker-dashboard?tab=profile';
    }
    
  };


  

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/auth/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
       // console.log(data.message);
      } else {
        dispatch(signoutSuccess());
        navigate('/sign-in');
      }
    } catch (error) {
      //console.log(error.message);
    }
  };


  return (
    <Navbar fluid rounded className="border-b-2 ">
      <Navbar.Brand href="/">
        <img src={logo} className="mr-3 h-6 sm:h-14 rounded-full" alt="jobpilot-logo" />
        <span className="self-center whitespace-nowrap text-xl font-bold font-mono dark:text-white">Job</span>
        <p className="text-blue-600 font-semibold font-mono">listings</p>
      </Navbar.Brand>  
      <div className="flex md:order-2">

        <Button
          className='w-12 h-10 hidden sm:inline mr-2'
          color='gray'
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === 'light' ? <FaSun /> : <FaMoon />}
        </Button>


        {currentUser ? (
          <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img={currentUser.profilePicture} rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{currentUser.username}</span>
            <span className="block truncate text-sm font-medium mb-2">{currentUser.email}</span>
            {
              currentUser.role === 'jobSeeker' ?
              <Label className="text-sm font-bold text-blue-600 border-2 border-blue-400 px-2 py-1">Finder</Label> :
              <Label className="text-sm font-bold text-blue-600 border-2 border-blue-400 px-2 py-1">Poster</Label>
            }

          </Dropdown.Header>
            <Link to={currentUser.role == 'jobSeeker' ? '/seeker-dashboard?tab=dash' : '/poster-dashboard?tab=profile'}>
              <Dropdown.Item className="">{
                currentUser.role == 'jobSeekeeker' ? 'Profile': 'Dashboard'}</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
          
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
        </Dropdown>
          ):(
            <Link to='/sign-up'>
            <button className="bg-blue-500 px-3 py-2 rounded-lg text-white hover:bg-blue-600" focus-outline>
              Register
            </button>
          </Link> 
  )}
        {
          currentUser ? (
            <Navbar.Toggle className=""/>
          ):('')
        }
      </div>
      {currentUser ? (
        <Navbar.Collapse className="hover:text-blue-500" >
        <Navbar.Link href="/"className={`${isActive('/') ? 'text-blue-500 dark:text-white' : 'text-gray-500'}`}>Home</Navbar.Link>
        {
          currentUser.role === 'jobPoster' ?(
            <>
              <Navbar.Link href="/create-p-job" className={`${isActive('/create-p-job') ? 'text-blue-500 dark:text-white ' : 'text-gray-500'}`}>Create a Part time Job</Navbar.Link>
              <Navbar.Link href="/create-f-job" className={`${isActive('/create-f-job') ? 'text-blue-500 dark:text-white ' : 'text-gray-500'}`}>Create a Full time Job</Navbar.Link>
            </>
          ):
          <Navbar.Link href="/search" className={`${isActive('/search') ? 'text-blue-500 dark:text-white ' : 'text-gray-500'}`}>Find job</Navbar.Link>
        }
        <Navbar.Link href="/contact" className={`${isActive('/contact') ? 'text-blue-500 dark:text-white' : 'text-gray-500'}`}>Customer Supports</Navbar.Link>
        <Navbar.Link href="/about" className={`${isActive('/about') ? 'text-blue-500 dark:text-white' : 'text-gray-500'}`}>About Us</Navbar.Link>
      </Navbar.Collapse>
      ):("")}
    </Navbar>
  );
}