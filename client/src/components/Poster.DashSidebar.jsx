import React from 'react'
import { Sidebar } from 'flowbite-react'
import { HiViewGrid, HiClipboardList } from "react-icons/hi"
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { CgProfile } from "react-icons/cg";
import { IoBagCheckSharp } from "react-icons/io5";
import { RiSave3Fill } from "react-icons/ri";
import { IoSettingsSharp } from "react-icons/io5";

export default function PosterDashSidebar() {
  const location = useLocation();
  //const { currentUser } = useSelector((state) => state.user);

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">

          <Link to="/poster-dashboard">

            <Sidebar.Item
              icon={HiViewGrid}
              as="div"
            >
              Overview
            </Sidebar.Item>
          </Link>

          <Link to="/poster-dashboard/employeeprofile">

            <Sidebar.Item icon={CgProfile} as="div">
              Employee Profile
            </Sidebar.Item>
          </Link>

          <Link to="/poster-dashboard/post-jobs">

            <Sidebar.Item icon={HiClipboardList} as="div">
              Post a Jobs
            </Sidebar.Item>
          </Link>
          <Link to="/poster-dashboard/my-jobs">

            <Sidebar.Item icon={IoBagCheckSharp} as="div">
              My Jobs
            </Sidebar.Item>
          </Link>
          <Link to="/poster-dashboard/saved-candidate">

            <Sidebar.Item icon={RiSave3Fill} as="div">
              Saved Candidate
            </Sidebar.Item>
          </Link>
          <Link to="/poster-dashboard/settings">

            <Sidebar.Item icon={IoSettingsSharp} as="div">
              Setting
            </Sidebar.Item>
          </Link>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>

  )
}

