import { Navbar } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom'

export default function SettingNavBar() {
  //const [searchParams,SetSearchparam]= useSearchParams();
  //const tabsFromUrl = searchParams.get('tabs') ==='company';

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
    <div>
      <Navbar fluid rounded>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Link to={""}>
            👥 Company Info
          </Link>
          <Link to="founding" className="nav-link">
            👤 Founding Info
          </Link>
          <Link to="social-media" className="nav-link">
            🌐 Social Media Profile
          </Link>
          <Link to="/account-setting" className="nav-link">
            ⚙️ Account Setting
          </Link>
        </Navbar.Collapse>
      </Navbar>


    </div>

  )
}
