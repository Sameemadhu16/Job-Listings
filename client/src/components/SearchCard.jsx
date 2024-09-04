import React from 'react'
import { Link } from 'react-router-dom'
import {Label} from 'flowbite-react'

export default function SearchCard({post}) {
    return (
        <Link  className="p-4 bg-blue-50 rounded-md flex items-center justify-between shadow hover:scale-105 transition-transform duration-150">
            <div className="flex items-center ">
                <img
                src={post.image}
                alt="Avatar"
                className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                    <p className="font-semibold">{post.title}</p>
                    <div className='flex gap-2'>
                        <p className="text-sm text-gray-500">{new Date(post.updatedAt).toLocaleDateString()}</p>
                        <Label className='border-2 border-blue-700 py-0.5 px-0.5 text-blue-700'>{post.type == 'full' ? 'FULL TIME' : 'PART TIME'}</Label>
                    </div>
                </div>
                    
                
            </div>
            <button className="text-blue-700 font-semibold">Apply</button>
        </Link>
    )
}
