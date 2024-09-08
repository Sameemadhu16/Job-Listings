import { Table } from 'flowbite-react'
import React from 'react'

export default function PosterDashuser() {
  return (
    <div className=' w-full'>
      <div className='flex flex-col  shadow-md p-2 rounded-md dark:bg-gray-800 m-10'>
        <h1 className='font-bold text-xl mb-3 text-center'>Jobs Requested List</h1>
        <Table hoverable className='shadow-md'>
          <Table.Head>
            <Table.HeadCell>Post Title</Table.HeadCell>
            <Table.HeadCell>Finder Name</Table.HeadCell>
            <Table.HeadCell>Post Status</Table.HeadCell>
            <Table.HeadCell>Post Type</Table.HeadCell>
            <Table.HeadCell>Your Response</Table.HeadCell>

          </Table.Head>

          
        </Table>
      </div>
    </div>
  )
}
