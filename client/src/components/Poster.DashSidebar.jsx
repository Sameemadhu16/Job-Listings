import React from 'react'
import { Sidebar } from 'flowbite-react'
import {HiViewGrid,HiClipboardList} from "react-icons/hi"
import {Link, useLocation} from 'react-router-dom'
import { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'

export default function PosterDashSidebar() {
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
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
    
            <Link to="/poster-dashboard?tab=dash">

              <Sidebar.Item
                active={tab === "dash" || !tab}
                icon={HiViewGrid}
                as="div"
              >
                Overview
              </Sidebar.Item>
            </Link>

          <Link to="/poster-dashboard?tab=employeeprofile">

            <Sidebar.Item active={tab === "appliedjobs"} icon={HiClipboardList} as="div">
              Employee Profile
            </Sidebar.Item>
          </Link>

          <Link to="/poster-dashboard?tab=postjobs">

            <Sidebar.Item active={tab === "latestjobs"} icon={HiClipboardList} as="div">
              Post a Jobs
            </Sidebar.Item>
          </Link>
          <Link to="/poster-dashboard?tab=myjobs">

            <Sidebar.Item active={tab === "latestjobs"} icon={HiClipboardList} as="div">
              My Jobs
            </Sidebar.Item>
          </Link>
          <Link to="/poster-dashboard?tab=myjobs">

            <Sidebar.Item active={tab === "latestjobs"} icon={HiClipboardList} as="div">
              Saved Candidate
            </Sidebar.Item>
          </Link>
          <Link to="/poster-dashboard?tab=myjobs">

            <Sidebar.Item active={tab === "latestjobs"} icon={HiClipboardList} as="div">
              Setting
            </Sidebar.Item>
          </Link>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>

  )
}
