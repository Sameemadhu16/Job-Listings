import React from 'react'
import { TextInput,FileInput,Button,Textarea,Select } from 'flowbite-react'
import { FaArrowRight } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";

export default function PosterCompanyInfo() {
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen bg-gray-100'>
    <form className="flex flex-col flex-wrap gap-4 m-10" >
        <h1 className='text-3xl font-bold'>
            Contact :
        </h1>
        <div className='flex flex-col gap-2'>
            <p className='text-sm font-semibold'>Map Location :</p>
            <TextInput type='text'/>
        </div>
        <div className='flex flex-col gap-2'>
            <p className='text-sm font-semibold'>Phone :</p>
            <div className='flex flex-row gap-2'>
            <TextInput type='' className='w-1/6'/>
            <TextInput type='' className='w-5/6'/>
            </div>
        </div>
        <div className='flex flex-col gap-2'>
            <p className='text-sm font-semibold'>Email :</p>
            <TextInput type='email' placeholder='example@gmail.com'/>
        </div>
    </form>
    <div className='flex gap-3 m-10'>
        <Button type='button' cols={50} className='mt-3 bg-slate-400 px-5  hover:bg-slate-500' >
            <div className='flex flex-row gap-1 items-center'>
            Previous
            </div>
        </Button>
        <Button type='submit' cols={50} className='bg-blue-500 hover:bg-opacity-95 mt-3 px-5' >
            <div className='flex flex-row gap-1 items-center'>
            Submit
            </div>
        </Button>
    </div>
    </div>
  )
}
