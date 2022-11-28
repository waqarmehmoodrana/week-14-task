import React from "react";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Router from 'next/router'
function Entry(props) {
  const image = props.image;
  const title = props.title;
  const date = props.date;
  const description = props.description;
  const location = props.location;
  function handleClick(){
    Router.push({
      pathname: "/description",
      query:{
        image,
        title,
        date,
        location,
        description,
      }
    })
  }
  
  return (
    <div onClick={()=> handleClick()} className="cursor-pointer rounded-md flex flex-row bg-white m-auto my-5 w-8/12">
      <div>
        {/*  eslint-disable-next-line @next/next/no-img-element */}
        <img className="w-44 h-40 rounded-md " src={image} alt="Image Text" />
      </div>
      <div className="p-5 w-full">
        <h1 className="font-boldtext-lg">{title}</h1>
        <h3 className="font-bold  py-2 text-sm">{date}</h3>
        <p >{location}</p>
        <div className="flex w-full items-end">
          <button  class="bg-green-500 ml-auto hover:bg-green-700 text-white font-bold py-1 px-3 rounded">
            Explore Event 
            <ArrowRightAltIcon/>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Entry;
