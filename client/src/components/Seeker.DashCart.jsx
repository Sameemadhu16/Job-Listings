import React from 'react'
import SeekerCartPost from './Seeker.cartPost'

export default function SeekerDashCart() {
  return (
    <div>
      <div className="flex flex-col">
            <SeekerCartPost showApply={true} showDelete={true}/>
            <SeekerCartPost showApply={true} showDelete={true}/>
            <SeekerCartPost showApply={true} showDelete={true}/>
          </div>
    </div>
  )
}
