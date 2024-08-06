import { Avatar, Dropdown, Navbar, TextInput, Button } from "flowbite-react";
import logo from '../images/Jobpilot.png';
import {AiOutlineSearch} from 'react-icons/ai'
import { IoMdNotifications } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


export default function Header() {

  const {currentUser} = useSelector(state => state.user)


  const getProfilePath = (role) => {
    if (role === 'jobPoster') {
      return '/poster-dashboard?tab=profile';
    } else if (role === 'jobSeeker') {
      return '/seeker-dashboard?tab=profile';
    }
    
  };

  return (
    <Navbar fluid rounded className="border-b-2">
      <Navbar.Brand href="/">
        <img src={logo} className="mr-3 h-6 sm:h-14" alt="jobpilot-logo" />
        <span className="self-center whitespace-nowrap text-xl font-bold dark:text-white">Jobpilot</span>
      </Navbar.Brand>  
      <div className="flex md:order-2">
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
          <Dropdown.Item>Sign out</Dropdown.Item>
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