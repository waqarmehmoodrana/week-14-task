import React from 'react'
import { useEffect, useState } from 'react'
import { app, database } from '../firebaseConfig';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { useRouter } from 'next/router';


function insert() {
  const [ID, setID] = useState(null);
  const [name, setName] = useState('');
  const [age, setAge] = useState(null);
  const [fireData, setFireData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const databaseRef = collection(database, 'CRUD Data');
  let router = useRouter()
  useEffect(() => {
    let token = sessionStorage.getItem('Token')
    if (token) {
      getData()
    }
    if (!token) {
      router.push('/register')
    }
  }, [])

  const addData = () => {
    addDoc(databaseRef, {
      name: name,
      age: Number(age)
    })
      .then(() => {
        alert('Data Sent')
        getData()
        setName('')
        setAge(null)
      })
      .catch((err) => {
        console.error(err);
      })
  }


  const getData = async () => {
    await getDocs(databaseRef)
      .then((response) => {
        setFireData(response.docs.map((data) => {
          return { ...data.data(), id: data.id }
        }))
      })
  }

  const getID = (id, name, age) => {
    setID(id)
    setName(name)
    setAge(age)
    setIsUpdate(true)
  }

  const updateFields = () => {
    let fieldToEdit = doc(database, 'CRUD Data', ID);
    updateDoc(fieldToEdit, {
      name: name,
      age: Number(age)
    })
    .then(() => {
      alert('Data Updated')
      getData()
      setName('')
      setAge(null)
      setIsUpdate(false)
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <div className='grid h-screen place-items-center bg-slate-200'>
    <div  className=' flex flex-col w-full max-w-sm mt-auto ml-auto mr-auto bg-gray-500  justify-center items-center '>
    <h1 className='text-black  text-lg  pt-8'>Update Record</h1>

    <input
      className='m-2 p-2 pl-8 pr-8'
      placeholder='Name'
      type="text"
      value={name}
      onChange={event => setName(event.target.value)}
    />
    <input
    
    className='m-2 p-2 pl-8 pr-8'
      placeholder='Age'
      type="number"
      value={age}
      onChange={event => setAge(event.target.value)}
    />
<div>
  <button  
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full pl-28 pr-24 pb-2  mb-5'
            onClick={updateFields}
          >
            Update
          </button>
          </div>
   </div>
   <button className='text-blue-400 underline'>
    Back
   </button>
   </div>
    )
}

export default insert