import { Button, TextInput } from 'flowbite-react'
import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { IoMdNotifications } from 'react-icons/io';
import { TbFilterBolt } from "react-icons/tb";
import PostCards from '../components/PostCards';

export default function Home() {
  return (
      <div >
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <form className='mr-3'>
            <TextInput type='text'
            placeholder='Search Jobs...'
            rightIcon={AiOutlineSearch}
            className='hidden lg:inline mr-4'/>
        </form>
        <Button className='w-50 h-20 lg:hidden focus:outline-none' color='gray' pill>
            <AiOutlineSearch/>
        </Button>
  <Button className='mr-10 ml-10' >
  <TbFilterBolt />
    Filter
  
  </Button>
  <Button className='mr-8'>Find Job</Button>
  
        
</div>
  <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 p-6'>
  <PostCards/>
  <PostCards/>
  <PostCards/>
  <PostCards/>
  <PostCards/>
  <PostCards/>
  </div>
  <div className='justify-center'>
   <h1>Ishan Lakshitha</h1>
  </div>
  
</div>

  )
}
