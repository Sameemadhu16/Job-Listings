import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import PosterDashSidebar from '../components/Poster.DashSidebar';
import PosterDashOverview from '../components/Poster.DashOverview';
import PosterSetting from "../components/poster.Setting";

export default function PosterDashboard() {

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56 '>
        {/*sidebar*/}
        <PosterDashSidebar />
      </div>
      <Outlet />
    </div>
  )
}
