"use client"
import React from 'react';
import Image from 'next/image';

interface ImageItem{
  imgSrc: string,
  imgText: string
}
interface ImageProps{
  imgData: ImageItem[]
}
const Images: React.FC<ImageProps> = ({imgData}) => {
  return (
     <>
     <div className='py-8 '>
   <h1 className='text-3xl '>
    School Gallery
   </h1>
    </div>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
{ imgData.map((item, index)=> (
<div key={index} className="max-w-sm bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
  <Image className="w-full h-48 object-cover" src={`/${item.imgSrc}`} alt="Card Image"  width={400}   // pick your own numbers
  height={200} />
  <div className="p-6">

    <p className="text-gray-600 mb-4">{item.imgText}</p> 
  </div>
</div>
))
}
</div>
   </>
  );
}

export default Images;
