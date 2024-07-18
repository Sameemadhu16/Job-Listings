import React from 'react'
import { TextInput,FileInput,Button,Textarea,Select } from 'flowbite-react'
import { FaArrowRight } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";

export default function PosterCompanyInfo() {
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
    <form className="flex flex-col flex-wrap gap-4 m-10" >
        <h1 className='text-3xl font-bold'>
            Social Media Profile :
        </h1>

        <div className=''>
        <p className='text-sm font-semibold'>Social Link 1 :</p>
         <div className='flex items-center gap-3'>
         <Select className='w-1/4'>
            <option value="uncategorized">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="react.js">React.js</option>
            <option value="next.js">Next.js</option>
            <option value="node.js">node.js</option>
            <option value="dart">Dart</option>
         </Select>
         <TextInput className='w-3/4'/>
         <Button className='bg-slate-200 hover:bg-slate-300'><IoIosCloseCircle className='h-6 w-6 text-black '/></Button>
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
         <TextInput className='w-3/4'/>
         <Button className='bg-slate-200 hover:bg-slate-300'><IoIosCloseCircle className='h-6 w-6 text-black '/></Button>
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
         <TextInput className='w-3/4'/>
         <Button className='bg-slate-200 hover:bg-slate-300'><IoIosCloseCircle className='h-6 w-6 text-black '/></Button>
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
         <TextInput className='w-3/4'/>
         <Button className='bg-slate-200 hover:bg-slate-300'><IoIosCloseCircle className='h-6 w-6 text-black '/></Button>
         </div>
        </div>
         <Button className='bg-slate-200'>
            <span className='flex gap-2'>
                <IoIosCloseCircle className='h-6 w-6 text-black'/>
                <p className='text-black'>Add New Social Link</p>
            </span>
         </Button>
    </form>
    <div className='flex gap-3 m-10'>
        <Button type='button' cols={50} className='mt-3 bg-slate-400 px-5  hover:bg-slate-500' >
            <div className='flex flex-row gap-1 items-center'>
            Previous
            </div>
        </Button>
        <Button type='button' cols={50} className='bg-blue-500 hover:bg-opacity-95 mt-3' >
            <div className='flex flex-row gap-1 items-center'>
            Save & Next
            <FaArrowRight />
            </div>
        </Button>
    </div>
    </div>
  )
}
