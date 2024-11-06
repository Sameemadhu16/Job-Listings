
import React from 'react'
import { TextInput, FileInput, Button, Textarea, Select } from 'flowbite-react'
import { FaArrowRight } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";

export default function PosterSocialMediaInfo() {
    return (
        <div className='bg-slate-100'>
            <div className='p-3 max-w-3xl mx-auto min-h-screen bg-gray-100'>
                <form className="flex flex-col flex-wrap gap-4 m-10" >
                    <h1 className='text-3xl font-bold'>
                        Social Media Profile :
                    </h1>

                    <div className=''>
                        <p className='text-sm font-semibold'>Social Link 1 :</p>
                        <div className='flex items-center gap-3'>
                            <Select className='w-1/4'>
                                <option value="uncategorized">Select a category</option>
                                <option value="facebook">Facebook</option>
                                <option value="instagram">Instagram</option>
                                <option value="linkedln">Next.js</option>
                                <option value="utube">YouTube</option>
                            </Select>
                            <TextInput className='w-3/4' />
                            <button className='bg-slate-200 w-14 h-14 flex justify-center rounded-lg items-center hover:bg-slate-300'><IoIosCloseCircle className='h-6 w-6 text-black ' /></button>
                        </div>
                    </div>
                    <div className=''>
                        <p className='text-sm font-semibold'>Social Link 2 :</p>
                        <div className='flex items-center gap-3'>
                            <Select className='w-1/4'>
                                <option value="uncategorized">Select a category</option>
                                <option value="javascript">JavaScript</option>
                                <option value="react.js">React.js</option>
                                <option value="next.js">Next.js</option>
                                <option value="node.js">node.js</option>
                                <option value="dart">Dart</option>
                            </Select>
                            <TextInput className='w-3/4' />
                            <button className='bg-slate-200 w-14 h-14 flex justify-center rounded-lg items-center hover:bg-slate-300'><IoIosCloseCircle className='h-6 w-6 text-black ' /></button>
                        </div>
                    </div>

                    <div className=''>
                        <p className='text-sm font-semibold'>Social Link 3 :</p>
                        <div className='flex items-center gap-3'>
                            <Select className='w-1/4'>
                                <option value="uncategorized">Select a category</option>
                                <option value="javascript">JavaScript</option>
                                <option value="react.js">React.js</option>
                                <option value="next.js">Next.js</option>
                                <option value="node.js">node.js</option>
                                <option value="dart">Dart</option>
                            </Select>
                            <TextInput className='w-3/4' />
                            <button className='bg-slate-200 w-14 h-14 flex justify-center rounded-lg items-center hover:bg-slate-300'><IoIosCloseCircle className='h-6 w-6 text-black ' /></button>
                        </div>
                    </div>

                    <div className=''>
                        <p className='text-sm font-semibold'>Social Link 4 :</p>
                        <div className='flex items-center gap-3'>
                            <Select className='w-1/4'>
                                <option value="uncategorized">Select a category</option>
                                <option value="javascript">JavaScript</option>
                                <option value="react.js">React.js</option>
                                <option value="next.js">Next.js</option>
                                <option value="node.js">node.js</option>
                                <option value="dart">Dart</option>
                            </Select>
                            <TextInput className='w-3/4' />
                            <button className='bg-slate-200 w-14 h-14 flex justify-center rounded-lg items-center hover:bg-slate-300'><IoIosCloseCircle className='h-6 w-6 text-black ' /></button>
                        </div>
                    </div>

                </form>
                <div className='flex gap-3 m-10'>
                    <a href='/create-f-job'  cols={50} className='bg-slate-400  hover:bg-slate-500 px-2 h-10 w-28 text-white rounded-lg flex items-center justify-center' >
                        <div className='flex flex-row gap-1 items-center'>
                            previous
                        </div>
                    </a>
                    <a href='/social-info' className='bg-blue-500 hover:bg-blue-600 px-2 h-10 w-28 text-white rounded-lg flex items-center justify-center' >
                        <div className='flex flex-row gap-1 items-center'>
                            Next
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}
