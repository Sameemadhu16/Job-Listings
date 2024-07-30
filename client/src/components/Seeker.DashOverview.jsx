import { Button, Table } from 'flowbite-react';
import React from 'react';
import { HiAnnotation, HiOutlineUserGroup, HiDocumentText } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import PostCards from './PostCards';
import SeekerCartPost from './Seeker.cartPost';

export default function SeekerDashOverview() {
  return (
    <div className="p-3 md:mx-auto">
      <div className="flex-wrap flex gap-4 justify-center ">
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-500 text-md uppercase">Applied Jobs</h3>
              <p className="text-2xl">10</p>
            </div>
            <HiOutlineUserGroup className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
        </div>
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-500 text-md uppercase">Rank</h3>
              <p className="text-2xl">10</p>
            </div>
            <HiAnnotation className="bg-indigo-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
        </div>
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-500 text-md uppercase">Recently Jobs</h3>
              <p className="text-2xl">10</p>
            </div>
            <HiDocumentText className="bg-lime-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 py-3 mx-auto justify-center max-w-full">

      <div className="flex flex-col p-3 bg-red-300 gap-4 w-full rounded-md shadow-lg">
          <div className="flex justify-between">
            <div className='flex gap-4'>
                <img
                    src='https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg='
                    alt='user'
                    className="w-10 h-10 rounded-full bg:gray-500"
                    
                  />
                <div>
                    <h3 className="font-semibold text-md">Your profile editing is not complete</h3>
                    <p className="font-semibold text-sm">Complete your profile editing & build your custom resume</p>
                </div>
            </div>
            
            <Button>
                Edit Profile
            </Button>
          </div>
        </div>

        <div className="flex flex-col w-full shadow-md p-2 rounded-md dark:bg-gray-800">
          <h1 className="text-center p-2 font-bold text-slate-800">Latest Jobs</h1>
          {/*<Table hoverable>
            <Table.Head>
              <Table.HeadCell>Job</Table.HeadCell>
              <Table.HeadCell>Date Applied</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Action</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className='flex gap-2'>
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
                  <Button outline gradientDuoTone='purpleToPink'>
                    <Link to="#">
                      View Details
                    </Link>
                  </Button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>*/}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <SeekerCartPost ShowAddcart={true}/>
            <SeekerCartPost ShowAddcart={true}/>
            <SeekerCartPost ShowAddcart={true}/>
          </div>
        </div>
      </div>
    </div>
  );
}
