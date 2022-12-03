import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
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
export default function Home() {
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
    router.push('/update')
  }

  const deleteDocument = (id) => {
    let fieldToEdit = doc(database, 'CRUD Data', id);
    deleteDoc(fieldToEdit)
    .then(() => {
      alert('Data Deleted')
      getData()
    })
    .catch((err) => {
      alert('Cannot Delete that field..')
    })
  }

  const logout = () => {
    sessionStorage.removeItem('Token')
    router.push('/register')
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Next CRUD AUTH</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <button onClick={logout}>Log Out</button>
        </div>
        <h1>Home</h1>

        <input
          placeholder='Name'
          className={styles.inputBox}
          type="text"
          value={name}
          onChange={event => setName(event.target.value)}
        />
        <input
          placeholder='Age'
          className={styles.inputBox}
          type="number"
          value={age}
          onChange={event => setAge(event.target.value)}
        />

        {isUpdate ? (
          <button
            className={styles.button}
            onClick={updateFields}
          >
            UPDATE
          </button>
        ) : (
          <button
            className={styles.button}
            onClick={addData}
          >
            ADD
          </button>
        )}

        <div>
          {fireData.map((data) => {
            return (
              <div className="flex flex-row gap-8 ">
                <h3
                 className='mt-2 mb-2'
               >Name: {data.name}</h3>
                <p
                
                className='mt-2 mb-2'
                >Age: {data.age}</p>
                <button
                  className="bg-green-400 mt-2 mb-2 rounded-lg  p-2"
                  onClick={() => getID(data.id, data.name, data.age)}
                >Update</button>
                <button
                  className="bg-red-600 mt-2 mb-2 rounded-lg  p-2"

                  onClick={() => deleteDocument(data.id)}
                >Delete</button>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
