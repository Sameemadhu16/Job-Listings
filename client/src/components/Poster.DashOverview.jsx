import { Table } from 'flowbite-react'
import React from 'react'
import { BsCheckCircle } from 'react-icons/bs'
import { PiHandbagSimpleLight } from 'react-icons/pi'
import { TiNews } from 'react-icons/ti'

export default function PosterDashOverview() {
  return (
    <div className='m-8 w-full  '>
    <div className='flex-wrap flex gap-4'>
        <div className='w-full flex gap-2 items-center justify-center'>
            <div className='flex flex-col p-3 bg-blue-100 gap-4 md:w-72 w-full rounded-md shadow-md'>
                <div className='flex flex-wrap justify-between'>
                    <div className=''>
                        <h3 className='text-black text-xl font-semibold'>589</h3>
                        <p className='text-slate-500'>Open Jobs</p>
                    </div>
                    <PiHandbagSimpleLight className='bg-blue-400 text-white rounded-full
        text-5xl p-3 shadow-lg'/>
                </div>
            </div>
            <div className='flex flex-col p-3 bg-orange-100 gap-4 md:w-72 w-full rounded-md shadow-md'>
                <div className='flex flex-wrap justify-between'>
                    <div className=''>
                        <h3 className='text-black text-xl font-semibold'>589</h3>
                        <p className='text-slate-500'>Saved Candidate</p>
                    </div>
                    <TiNews className='bg-orange-400 text-white rounded-full
        text-5xl p-3 shadow-lg'/>
                </div>
            </div>
        </div>
    </div>
    
    <div className='flex flex-wrap gap-4 py-3 mx-auto justify-center m-1 '>
        <div className='flex flex-wrap gap-4 py-3 mx-auto justify-center w-full ml-2 mr-2'>
            <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800 '>
                <h1 className='font-semibold text-lg'>Rcently Posted Jobs</h1>
                <Table hoverable className='w-full mt-2'>
                    <Table.Head className=''>
                        <Table.HeadCell>JOBS</Table.HeadCell>
                        <Table.HeadCell>STATUS</Table.HeadCell>
                        <Table.HeadCell>APPLICATION</Table.HeadCell>
                        <Table.HeadCell>ACTION</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className='divide-y'>
                        <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                            <Table.Cell className='text-sm font-semibold'>UI/UX design</Table.Cell>
                            <Table.Cell>
                                <div className='flex flex-row items-center gap-1 text-green-500'>
                                    <BsCheckCircle className='' />
                                    <p className='font-semibold'>Active</p>
                                </div>
                            </Table.Cell>
                            <Table.Cell className='font-semibold'>Application</Table.Cell>
                            <Table.Cell className='font-semibold'>View Application</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>


        </div>
    </div>
    </div>
  )
}
