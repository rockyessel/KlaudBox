import Image from 'next/image'
import React from 'react'

const ImageCard = ({image}:any) => {
  return (
     <div className='relative my-1'>
            <div className=' w-full sm:w-[12rem] h-full flex flex-col'>
              <Image
                src={image?.url}
                className='w-full h-full object-cover object-center rounded-lg overflow-hidden'
                width={1000}
                height={1000}
                priority
                blurDataURL={image?.url}
                alt={image?.originalFilename}
              />
              <p className='text-sm text-center font-semibold'>
                {image.originalFilename.slice(0, 10)}
              </p>
            </div>
            <span className='absolute top-1 left-1'>
              <input title='checkbox' type='checkbox' className='checkbox' />
            </span>
          </div>
  )
}

export default ImageCard