import React, { useState } from 'react'
import {getAllEvents} from "./../DUMMY_DATA"
import Entry from "./api/Entry";

function index() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [userData, setUserData] = useState([]);
  const events = getAllEvents();
  console.log(events);
  

  function createEntry(data) {
    return (
      <Entry
        key={data.id}
        image={data.image}
        title={data.title}
        date={data.date}
        location={data.location}
        description={data.description}
        
      />
    );
  }

  console.log(userData)
  return (
    <div className='bg-gray-300 p-20 flex-row justify-center min-h-screen'>
      <div>
        {events.map(createEntry)}
      </div>
    </div>
  )
}

export default index