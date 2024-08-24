import { Button, Dropdown, Table } from 'flowbite-react'
import React from 'react'
import { HiArrowNarrowRight } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { FcApproval } from "react-icons/fc";

export default function PosterDashMyJobs() {
    return (
        <div className='p-10 flex-grow'>
            <div className=''>
                <div className='flex w-full justify-between'>

                    <div className='font-bold'>
                        My Jobs <span className=''>(589)</span>
                    </div>
                    <div>
                        <div className="flex items-center gap-4 ">
                            <Dropdown label="All post" size="sm" >
                                <Dropdown.Item>Part time Jobs</Dropdown.Item>
                                <Dropdown.Item>Full Time Jobs</Dropdown.Item>

                            </Dropdown>
                        </div>
                    </div>
                </div>
                <div className='m-5'>

                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>JOB</Table.HeadCell>
                            <Table.HeadCell>APPLICATIONS</Table.HeadCell>
                            <Table.HeadCell>STATUS</Table.HeadCell>
                            <Table.HeadCell>ACTION</Table.HeadCell>
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
                                    589 Applications
                                </Table.Cell>
                                <Table.Cell>
                                <FcApproval />
                                    Active
                                </Table.Cell>
                                <Table.Cell>
                                    <Button className='bg-slate-200 hover:bg-slate-300'>
                                        <Link className='flex items-center gap-3 text-blue-600 font-semibold'>
                                            View Details
                                            <HiArrowNarrowRight />
                                        </Link>
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </div>
    )
}
