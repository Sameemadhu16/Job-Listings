import React from 'react'
import { TextInput,FileInput,Button,Textarea,Select } from 'flowbite-react'
import { FaArrowRight } from "react-icons/fa";

export default function PosterFoundInfo() {
  return (
    <div className='bg-slate-100'>
        <div className='p-3 max-w-3xl mx-auto min-h-screen bg-gray-100'>
        <form className="flex flex-col flex-wrap gap-4 m-10" >
            <h1 className='text-3xl font-bold'>
                Found Info :
            </h1>
        <div className='flex flex-row gap-2'>
        <div className=''>
            <p className='text-sm font-semibold'>Organization Types :</p>
                <Select className='mt-1'>
                    <option value="uncategorized">Select a category</option>
                    <option value="javascript">JavaScript</option>
                    <option value="react.js">React.js</option>
                    <option value="next.js">Next.js</option>
                    <option value="node.js">node.js</option>
                    <option value="dart">Dart</option>

                </Select>
       </div>

       <div className=''>
        <p className='text-sm font-semibold'>Industry Types :</p>
            <Select className='mt-1'>
                <option value="uncategorized">Select a category</option>
                <option value="javascript">JavaScript</option>
                <option value="react.js">React.js</option>
                <option value="next.js">Next.js</option>
                <option value="node.js">node.js</option>
                <option value="dart">Dart</option>

            </Select>
       </div>

       <div className=''>
        <p className='text-sm font-semibold'>Team Size :</p>
            <Select className='mt-1'>
                <option value="uncategorized">Select a category</option>
                <option value="javascript">JavaScript</option>
                <option value="react.js">React.js</option>
                <option value="next.js">Next.js</option>
                <option value="node.js">node.js</option>
                <option value="dart">Dart</option>

            </Select>
       </div>
       </div>
       <div className='flex gap-5'>
       <div className='text-sm font-semibold flex flex-col gap-2'>
            <p>Year of Estabilishment :</p>
            <TextInput placeholder='' type='date'></TextInput>
        </div>
        <div className='text-sm font-semibold flex flex-col gap-2'>
            <p>Company Website :</p>
            <TextInput type='url' placeholder='https://example.com'></TextInput>
        </div>
       </div>
       <div className='flex flex-col gap-2'>
        <p className='text-sm font-semibold'>Company Vision :</p>
        <Textarea placeholder='Tell us about your company vision...'/>
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
