import React from 'react';
import { Button } from 'flowbite-react';
import { FaArrowRight } from 'react-icons/fa';
import { RiPriceTagLine } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa6";
import { CiMap } from "react-icons/ci";
import Benifits from './Benifits';
import { CiCalendarDate, CiStopwatch } from "react-icons/ci";
import { TfiStatsUp } from "react-icons/tfi";
import { IoWalletOutline } from "react-icons/io5";
import { PiShoppingBag, PiLinkSimpleBold } from "react-icons/pi";

export default function FulltimeJobPost() {
    const Benifit = () => {
        return <p className='text-green-500'><Benifits /></p>;
    }

    return (
        <div className='min-h-screen bg-slate-100 p-3 dark:text-white'>
            <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center'>
                <div className='flex flex-row items-center gap-2 mb-4 lg:mb-0'>
                    <div>
                        <FaFacebook className='text-blue-600 text-5xl' />
                    </div>
                    <div>
                        <h1 className='font-bold text-lg'>Full time job name</h1>
                        <div className='flex flex-row gap-1'>
                            <p>at Facebook</p>
                            <p className='bg-green-500 text-center text-white rounded-lg px-5'>Full Time</p>
                            <p className='bg-red-200 text-center text-red-700 rounded-lg px-5'>Featured</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-row items-center gap-1'>
                    <Button className='bg-blue-200 h-11 items-center'>
                        <RiPriceTagLine className='text-blue-700' />
                    </Button>
                    <Button className='bg-blue-600 hover:opacity-95'>
                        <div className='flex flex-row items-center gap-1 text-center'>
                            <p>Apply Now</p>
                            <FaArrowRight />
                        </div>
                    </Button>
                </div>
            </div>

            <div className='flex flex-col lg:flex-row justify-center gap-2 p-3'>
                <div className='bg-slate-300 w-full lg:w-1/2 max-h-full mb-4 lg:mb-0'>
                    sa
                </div>
                <div className='w-full lg:w-1/2'>
                    <div className='flex flex-col lg:flex-row gap-3 border-b-2 border-t-2 text-center items-center'>
                        <div className='border-b-2 lg:border-b-0 lg:border-r-2 w-full lg:w-1/2 py-2'>
                            <p className='font-semibold'>Salary USD</p>
                            <p className='text-green-500 mr-2'>$100,000 - $120,000</p>
                            <p className='text-sm text-slate-500'>Yearly salary</p>
                        </div>
                        <div className='w-full lg:w-1/2 flex flex-col text-center items-center py-2'>
                            <CiMap className='text-3xl text-blue-600' />
                            <p className='font-semibold'>Job Location</p>
                            <p className='text-sm text-slate-500'>Colombo, Sri Lanka</p>
                        </div>
                    </div>

                    <div className='border-2 mt-2'>
                        <p className='font-semibold ml-1'>Job Benefits</p>
                        <div className='flex flex-wrap gap-1 mb-1 ml-1'>
                            {Array.from({ length: 10 }).map((_, index) => (
                                <Benifit key={index} />
                            ))}
                        </div>
                    </div>

                    <div className='border-2 mt-1'>
                        <p className='font font-semibold ml-1'>Job Overview</p>
                        <div className='flex flex-wrap gap-3 ml-1'>
                            <div className='text-center flex flex-col items-center'>
                                <CiCalendarDate className='text-blue-700 text-4xl' />
                                <p className='text-sm text-slate-500 ml-1'>Job Posted</p>
                                <p className='text-sm font-semibold ml-1'>03, June, 2024</p>
                            </div>
                            <div className='text-center flex flex-col items-center'>
                                <CiStopwatch className='text-blue-700 text-4xl' />
                                <p className='text-sm text-slate-500'>Job Experience</p>
                                <p className='text-sm font-semibold'>02, April, 2021</p>
                            </div>
                            <div className='text-center flex flex-col items-center'>
                                <TfiStatsUp className='text-blue-700 text-4xl' />
                                <p className='text-sm text-slate-500'>Job Level</p>
                                <p className='text-sm font-semibold'>01, June, 2024</p>
                            </div>
                            <div className='text-center flex flex-col items-center'>
                                <IoWalletOutline className='text-blue-700 text-4xl' />
                                <p className='text-sm text-slate-500'>Experience</p>
                                <p className='text-sm font-semibold'>$50k-80k/month</p>
                            </div>
                            <div className='text-center flex flex-col items-center'>
                                <PiShoppingBag className='text-blue-700 text-4xl' />
                                <p className='text-sm text-slate-500'>Education</p>
                                <p className='text-sm font-semibold'>Graduation</p>
                            </div>
                        </div>
                    </div>

                    <div className='border-2 mt-1'>
                        <p className='font-semibold ml-1'>Share this job:</p>
                        <div>
                            <Button className='bg-blue-200 hover:bg-opacity-95 ml-1'>
                                <div className='flex text-center items-center gap-1'>
                                    <PiLinkSimpleBold className='text-lg text-blue-600' />
                                    <p className='text-blue-600'>Copy Links</p>
                                </div>
                            </Button>
                        </div>
                        <div>
                            <p className='font-semibold ml-1'>Job tags:</p>
                            <div className='flex gap-1 ml-1'>
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <Benifits key={index} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
