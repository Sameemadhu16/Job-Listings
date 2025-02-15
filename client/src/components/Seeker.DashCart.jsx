import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SeekerCartPost from './Seeker.cartPost';

export default function SeekerDashCart() {
  const { currentUser } = useSelector((state) => state.user);
  const [userCart, setUserCart] = useState([]);

  useEffect(() => {
    const fetchcart = async () => {
      try {
        const res = await fetch(`api/seeker/getcart/${currentUser._id}`);
        
        const data1 = await res.json();
        const data = data1.cartPosts;
        console.log(data);
        if (res.ok) {
          setUserCart(data);
          console.log(data)
          
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    
      fetchcart();
    
  }, [currentUser._id]);

  return (
    <div>
      <div className="flex flex-row flex-wrap gap-2 p-3 bg-blue-50 dark:bg-slate-700">
          <div className='flex mt-6 gap-6 flex-wrap items-center ml-3 justify-center'>
          {userCart.length > 0 && (
          userCart.map((post) => (
            <SeekerCartPost
              key={post._id}
              post={post}
              showApply={true} 
              showDelete={true} 
            />
          )))}
        </div>
      </div>
    </div>
  );
}
