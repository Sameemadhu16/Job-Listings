import { Avatar, Dropdown, Navbar, TextInput, Button, theme } from "flowbite-react";
import logo from '../images/Jobpilot.png';
import {AiOutlineSearch} from 'react-icons/ai'
import { IoMdNotifications } from "react-icons/io";
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

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/jobseeker/seeker-signout', {
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
    <Navbar fluid rounded className="border-b-2">
      <Navbar.Brand href="/">
        <img src={logo} className="mr-3 h-6 sm:h-14 rounded-full" alt="jobpilot-logo" />
        <span className="self-center whitespace-nowrap text-xl font-bold dark:text-white">Jobpilot</span>
      </Navbar.Brand>
      <form>
            <TextInput type='text'
            placeholder='Search...'
            rightIcon={AiOutlineSearch}
            className='hidden lg:inline'/>
        </form>
        <Button className='w-12 h-10 lg:hidden focus:outline-none' color='gray' pill>
            <AiOutlineSearch/>
        </Button>
        <Button className='w-12 h-10  focus:outline-none' color='gray' pill>
            <IoMdNotifications/>
        </Button>
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
        <Navbar.Link href="/dashboard" className="active:underline active:text-cyan-600">Dashboard</Navbar.Link>
        <Navbar.Link href="#">Job Alerts</Navbar.Link>
        <Navbar.Link href="#">Customer Supports</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
