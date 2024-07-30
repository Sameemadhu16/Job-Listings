import React from 'react'
import SeekerCartPost from './Seeker.cartPost'

export default function SeekerDashCart() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <SeekerCartPost showApply={true} showDelete={true}/>
            <SeekerCartPost showApply={true} showDelete={true}/>
            <SeekerCartPost showApply={true} showDelete={true}/>
          </div>
    </div>
  )
}
