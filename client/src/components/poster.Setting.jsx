import React, { useEffect, useState } from 'react'
import SettingNavBar from './CreatePostNavBar'
import { useLocation } from 'react-router-dom';



export default function PosterSetting() {

  const location = useLocation();
  //const { currentUser } = useSelector((state) => state.user);
  const [tabs, setTabs] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tabs");
    if (tabFromUrl) {
      setTabs(tabFromUrl);
    }
  }, [location.search]);
  return (

    <div className='min-h-screen flex flex-col md:flex-row'>
      <div>
        <SettingNavBar />
      </div>


    </div>
  )
}

