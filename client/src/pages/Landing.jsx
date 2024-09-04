import React from 'react';

export default function Home() {
  return (
    <div>
      <style>
        {`
        @keyframes fadeInOut {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }

        @keyframes fadeInOutDelay {
          0%, 30%, 100% { opacity: 0; }
          60% { opacity: 1; }
        }

        .animate-fadeInOut {
          animation: fadeInOut 12s ease-in-out infinite;
        }

        .animate-fadeInOutDelay {
          animation: fadeInOutDelay 12s ease-in-out infinite;
        }
        `}
      </style>

      <div 
        className='py-28 px-20 text-center'
        style={{
            backgroundImage: `url('https://dm0qx8t0i9gc9.cloudfront.net/watermarks/image/rDtN98Qoishumwih/light-blue-background_GkNvxFHd_SB_PM.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }}
      >
        <div className='text-3xl lg:text-5xl items-center'>
          <p>
            <span 
              className='text-3xl lg:text-5xl text-slate-500 font-bold animate-fadeInOut' 
              style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
            >
                Welcome to Joblistings
            </span>
            <br/><br/>
            <span 
              className='bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 bg-clip-text text-transparent font-bold animate-fadeInOutDelay'
            >
                Your Gateway to a Fulfilling Career
            </span>
          </p>
        </div>
        <p className='text-gray-600 mt-4 items-center'>
        Join a community where job seekers and employers come together to build successful careers. <br/>With our expert support and cutting-edge technology, finding the right job or the right hire has never been easier.
        </p>
        
      </div>

      <div className='text-center py-20'>
        <h2 className='text-3xl font-bold text-slate-700'>
          What You'll Find in Our <span className='text-teal-500'> Resource Center</span>
        </h2>
      </div>
    </div>
  );
}
