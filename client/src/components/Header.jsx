import { Avatar, Dropdown, Navbar, TextInput, Button } from "flowbite-react";
import logo from '../images/Jobpilot.png';
import {AiOutlineSearch} from 'react-icons/ai'
import { IoMdNotifications } from "react-icons/io";

export default function Header() {
  return (
    <Navbar fluid rounded className="border-b-2">
      <Navbar.Brand href="/">
        <img src={logo} className="mr-3 h-6 sm:h-14" alt="jobpilot-logo" />
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
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
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
