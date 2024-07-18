import React from 'react'
import { TextInput,FileInput,Button,Textarea } from 'flowbite-react'
import { FaArrowRight } from "react-icons/fa";

export default function PosterCompanyInfo() {
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-3xl font-bold'>
        Logo & Banner image
      </h1>
    <form className="flex flex-col gap-4 mt-3" >
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput type='text' placeholder='Title' required id='title'
          className='flex-1'/>
        </div>
        <p className='font-semibold'>Banner Image:</p>
        <div className='flex gap-4 items-center justify-between border-4
        border-blue-500 border-dotted p-3'
        > 
          <FileInput type="file" accept='image/*' />
          <Button type='button' className='bg-blue-500 hover:bg-blue-500 text-white' size='sm' outline >
           upload image
          </Button>
        </div>
        <p className='font-semibold'>About Us:</p>
        <Textarea placeholder='Write down your company here.Let the candidate know who we are'></Textarea>
    </form>
      <Button type='button' cols={50} className='bg-blue-500 hover:bg-opacity-95 mt-3' >
          <div className='flex flex-row gap-1 items-center'>
          Save & Next
          <FaArrowRight />
          </div>
      </Button>
    </div>
  )
}
