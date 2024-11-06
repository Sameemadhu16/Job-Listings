import React from 'react';

const NoFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 dark:bg-slate-700">
        {/* Container */}
        <div className="bg-blue-100 dark:bg-slate-600 p-8 rounded-lg shadow-lg text-center">
            {/* Image or Illustration */}
            <div className="mb-8">
            <img 
                src="https://cdni.iconscout.com/illustration/premium/thumb/error-404-illustration-download-in-svg-png-gif-file-formats--no-results-service-landing-page-security-empty-state-pack-design-development-illustrations-3613889.png"
                alt="No results illustration" 
                className="w-64 mx-auto"
            />
            </div>
            <p className='text-blie-900 dark:text-white'>404 Error</p>
            {/* Title */}
            <h1 className="text-5xl font-bold text-blue-800 dark:text-white mb-4">No results found</h1>

            {/* Description */}
            <p className="text-gray-600 dark:text-slate-200 text-lg mb-6">
            We couldn't find what you searched for. Try searching again.
            </p>

            {/* Search Again Button */}
            <a 
            href="/" 
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold"
            >
            Go Back To Home
            </a>
        </div>
        </div>
    );
};

export default NoFound;
