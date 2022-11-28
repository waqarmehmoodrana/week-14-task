/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { useRouter } from 'next/router'
import DateRangeIcon from '@mui/icons-material/DateRange';
import LocationOnIcon from '@mui/icons-material/LocationOn';
export default function Description() {
    const router = useRouter();

    const {
        query: {image, title, date, location, description, }
    } = router;
    const props = {
        image,
        title,
        date,
        location,
        description,
      };

  return (
    <div className='h-screen w-full bg-gray-500'>
        <div className='h-40 w-full bg-green-800  flex justify-center item-center'>
            <p className='m-9 text-2xl text-white'>{title}</p>
        </div>
        <div className=''>
            <div className='mx-auto w-7/12 h-64 flex flex-row  bg-sky-800'>
                <div className='py-6 px-12 w-6/10'>
                    {/*  eslint-disable-next-line @next/next/no-img-element */}
                    <img className='rounded-full w-52 h-52 align-middle border-2' src={image} alt="Image"/>
                </div>
                <div className='w-4/10 pt-16'>
                <p className='text-white'><DateRangeIcon/></p>
                    <p className='text-white'>{date}</p>
                    <p className='pt-2 text-white'><LocationOnIcon/></p>
                    <p className='text-white'>{location}</p>
                </div>
            </div>
        </div>
        <div className='flex justify-center pt-4'>
        <p className='m-auto text-white w-7/12'>{description}</p>
        </div>
        
    </div>
  )
}
