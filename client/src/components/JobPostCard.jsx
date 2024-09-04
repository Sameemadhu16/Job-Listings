import { Card, Label } from 'flowbite-react'
import React from 'react'

export default function JobPostCard({post,userId,}) {

    const navigate = ()=> {
        navigate(`/update-post/${post._id}/${userId}`)
    }
    return (
        <Card className='min-w-full'>
            <div className='flex justify-between'>
                {post.type == "part" ? (
                    <Label className="text-sm font-bold text-blue-600 border-2 border-blue-400 px-2 py-1">Part Time</Label>
                ):(<Label className="text-sm font-bold text-blue-600 border-2 border-blue-400 px-2 py-1">Full Time</Label>)}
                <p className='text-sm font-semibold text-gray-700'>1h left</p>
            </div>
            <h1 className='text-3xl font-bold text-black'>{post.title}</h1>
            <div className='flex flex-row gap-1 flex-wrap'>
                <Label className='px-3 py-2 rounded-lg bg-slate-200 '>Start Time : {post.sTime}</Label>
                <Label className='px-3 py-2 rounded-lg bg-slate-200 '>End Time : {post.eTime}</Label>
                <Label className='px-3 py-2 rounded-lg bg-slate-200 '>Members : {post.members}</Label>
                <Label className='px-3 py-2 rounded-lg bg-slate-200 '>Salary : Rs.{post.salary}</Label>
            </div>
            <img src={post.image} alt="" />
            <button type="button" onClick={navigate} className='px-2 py-2 bg-green-500 rounded-lg text-white hover:bg-green-600 w-1/2'>Update Job</button>
        </Card>
    )
}
