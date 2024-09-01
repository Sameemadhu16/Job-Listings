import { Avatar, Dropdown, Navbar, TextInput, Button, theme } from "flowbite-react";
import logo from '../images/Jobpilot.png';

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signoutSuccess } from "../redux/user/userSlice";
import { FaMoon, FaSun } from 'react-icons/fa';
import { toggleTheme } from "../redux/theme/themeSlice";


export default function Header() {

  const {currentUser} = useSelector(state => state.user)

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const getProfilePath = (role) => {
    if (role === 'jobPoster') {
      return '/poster-dashboard?tab=profile';
    } else if (role === 'jobSeeker') {
      return '/seeker-dashboard?tab=profile';
    }
    
  };


  const getDashboardPath = () => {
    if (currentUser?.role === 'jobSeeker') {
      return '/seeker-dashboard?tab=dash';
    } else if (currentUser?.role === 'jobPoster') {
      return '/poster-dashboard?tab=dash';
    } else {
      return '#'; // Fallback or default path
    }
  };

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/auth/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
        navigate('/sign-in');
      }
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <Navbar fluid rounded className="border-b-2 ">
      <Navbar.Brand href="/">
        <img src={logo} className="mr-3 h-6 sm:h-14 rounded-full" alt="jobpilot-logo" />
        <span className="self-center whitespace-nowrap text-xl font-bold dark:text-white">Jobpilot</span>
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
            <span className="block truncate text-sm font-medium ">{currentUser.email}</span>
          </Dropdown.Header>
            <Link to={getProfilePath(currentUser.role)}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
          
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
        </Dropdown>
          ):(
            <Link to='/sign-in'>
            <Button className="bg-blue-500" focus-outline>
              Sign In
            </Button>
          </Link> 
  )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse >
        <Navbar.Link href="/" className="active:underline">Home</Navbar.Link>
        <Navbar.Link href="#">Find Job</Navbar.Link>
        <Navbar.Link href="#">Find Employers</Navbar.Link>
        <Navbar.Link
          href={getDashboardPath()}
          className="active:underline active:text-cyan-600"
        >
          Dashboard
        </Navbar.Link>
        <Navbar.Link href="/contact">Customer Supports</Navbar.Link>
        <Navbar.Link href="/about">About Us</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}