import React from 'react';
import { Button } from 'flowbite-react';
import { MdDateRange } from 'react-icons/md';
import { useState, useEffect } from 'react';

export default function PostCards({ post }) {
  const date = new Date(post.createdAt);

  const time = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true, // Use 'false' for 24-hour format
  });

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Intl.DateTimeFormat('en-US', options).format(
      new Date(dateString)
    );
  };

  return (
    <div
      className="group relative w-full border border-teal-500 h-[400px] overflow-hidden
      rounded-lg sm:w-[430px] bg-slate-200"
    >
      <div className="bg-slate-400 h-[100px] text-center">image</div>
      <div className="flex flex-col flex-wrap p-2">
        <p className="font-bold text-center mt-2 text-3xl">{post.title}</p>
        <p className="text-sm mt-2">{post.description}</p>
        <p className="text-sm mt-2">{post.companyName}</p>
        <p className="text-sm mt-2">{post.essential}</p>
        <p className="text-sm mt-2">{post.selectType}</p>
      </div>
      <div className="flex justify-between p-2">
        <p className="text-sm mt-2 font-semibold">{time}</p>
        <p className="text-sm mt-2 font-semibold">
          {formatDate(post.createdAt)}
        </p>
      </div>
      <div className="flex justify-center mt-4">
        <Button
          color="teal"
          size="lg"
          pill={true}
          className="transition duration-300 ease-in-out transform hover:scale-105"
        >
          Apply Now
        </Button>

      </div>
    </div>
  );
}
