import React from 'react'
import { Sidebar } from 'flowbite-react'
import {HiViewGrid,HiClipboardList, HiBell} from "react-icons/hi"
import {Link, useLocation} from 'react-router-dom'
import { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import { FaHeart, FaShoppingCart } from 'react-icons/fa'
import { FaUser } from 'react-icons/fa'

export default function SeekerDashSidebar() {
    const location = useLocation();
    //const { currentUser } = useSelector((state) => state.user);
    const [tab, setTab] = useState("");
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get("tab");
        if (tabFromUrl) {
        setTab(tabFromUrl);
        }
    }, [location.search]);
  return (
    <Sidebar className="w-full md:w-56 ">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
    
            <Link to="/seeker-dashboard?tab=dash">

              <Sidebar.Item
                active={tab === "dash" || !tab}
                icon={HiViewGrid}
                as="div"
              >
                Overview
              </Sidebar.Item>
            </Link>

          <Link to="/seeker-dashboard?tab=appliedjobs">

            <Sidebar.Item active={tab === "appliedjobs"} icon={HiClipboardList} as="div">
              Applied Jobs
            </Sidebar.Item>
          </Link>

          <Link to="/seeker-dashboard?tab=latestjobs">

            <Sidebar.Item active={tab === "latestjobs"} icon={HiBell} as="div">
              Latest Jobs
            </Sidebar.Item>
          </Link>

          <Link to="/seeker-dashboard?tab=cart">

            <Sidebar.Item active={tab === "cart"} icon={FaHeart} as="div">
              Favourite
            </Sidebar.Item>
          </Link>
          
          <Link to="/seeker-dashboard?tab=profile">

            <Sidebar.Item active={tab === "profile"} icon={FaUser} as="div">

              Profile
            </Sidebar.Item>
          </Link>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>

  )
}
