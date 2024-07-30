import React, { useEffect, useState } from 'react'
import SettingNavBar from './CreatePostNavBar'
import { Link, Outlet, useLocation } from 'react-router-dom';
import PosterCompanyInfo from './Poster.CompanyInfo';

export default function PosterPostjob() {

    return (
        <div className='min-h-screen flex-col md:flex-row w-full'>
            <div className='bg-slate-600'>
                <SettingNavBar />
            </div>
            <Outlet />

        </div>
    )
}
