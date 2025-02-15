import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SeekerDashSidebar from "../components/Seeker.DashSidebar";
import SeekerDashOverview from "../components/Seeker.DashOverview";
import SeekerDashAppliedjobs from "../components/Seeker.DashAppliedjobs";
import SeekerDashLatestjobs from "../components/Seeker.DashLatestjobs";
import SeekerDashCart from "../components/Seeker.DashCart";
import SeekerProfile from "../components/Seeker.Profile";

export default function SeekerDashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
        <div className='md:w-56'>
            {/*sidebar*/}
            <SeekerDashSidebar />
            
        </div>
        <div className="w-full">
            {/*dashboard comp*/}
            {tab === 'dash' && <SeekerDashOverview />}
            {/*applied jobs*/}
            {tab === 'appliedjobs' && <SeekerDashAppliedjobs />}
            {/*latest jobs*/}
            {tab === 'latestjobs' && <SeekerDashLatestjobs />}
            {/*cart*/}
            {tab === 'cart' && <SeekerDashCart />}
            
            {/*profile*/}
            {tab === 'profile' && <SeekerProfile />}
          </div>
    </div>

  )
}  
