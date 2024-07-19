import { Button, TextInput } from 'flowbite-react'
import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { IoMdNotifications } from 'react-icons/io'

export default function Home() {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <form className='mr-3'>
            <TextInput type='text'
            placeholder='Search Job...'
            rightIcon={AiOutlineSearch}
            className='hidden lg:inline mr-4'/>
        </form>
        <Button className='w-12 h-10 lg:hidden focus:outline-none' color='gray' pill>
            <AiOutlineSearch/>
        </Button>
  <Button className='mr-1'>Filter</Button>
  <Button className='mr-10'>Find Job</Button>
  <div>
    
  </div>
  
        
</div>
  )
}
