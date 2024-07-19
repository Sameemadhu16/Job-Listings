import { Button, Table } from 'flowbite-react'
import React from 'react'
import { HiArrowNarrowRight } from 'react-icons/hi'
import { Link } from 'react-router-dom'

export default function SeekerDashAppliedjobs() {
  return (
    <div className="flex flex-col w-full shadow-md p-2 rounded-md dark:bg-gray-800">
          <h1 className="p-6 font-bold text-slate-600">Applied Jobs</h1>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Job</Table.HeadCell>
              <Table.HeadCell>Date Applied</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Action</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className='flex gap-2 items-center'>
                  <img
                    src='https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg='
                    alt='user'
                    className="w-10 h-10 rounded-full bg:gray-500"
                    
                  />
                  Network Engineer
                </Table.Cell>
                <Table.Cell>
                  Feb 2, 2022
                </Table.Cell>
                <Table.Cell>
                  Active
                </Table.Cell>
                <Table.Cell>
                  <Button gradientDuoTone="purpleToBlue">
                    <Link to="#" className='flex items-center gap-3'>
                      View Details
                      <HiArrowNarrowRight />
                    </Link>
                  </Button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
  )
}
