"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import Delete from './Delete';

export default function Home() {

  const [postData, setPostData] = useState([]);

  console.log(postData)

  const getPosts = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/posts`, {
        method: "GET",
        cache: "no-store" //ต้องการข้อมูลใหม่ทุกครั้งที่ยิง requir มา
      })

      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await res.json();
      setPostData(data.posts)

    } catch (error) {
      console.log("Error loading posts: ", error);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <main className="container mx-auto my-3">
      <h1>NextJs CRUD + MongoDB</h1>
      <hr className="my-3" />
      <Link className='bg-green-500 p-3 text-white rounded ' href="/create">Create Post</Link>
      <div className='grid grid-cols-4 mt-3 gap-5'>
        {postData && postData.length > 0 ? (
          postData.map(data => (
            <div key={data._id} className='shadow p-5 rounded-xl'
            style={{height:"max-content"}}>
              <Image className='mx-auto' src={data.img} alt={data.title} width={1000}
                height={1000} style={{width:"100%",height:"70%"}}></Image>
              <h4 className='mt-3'>{data.title}</h4>
              <p>{data.content}</p>
              <div className='mt-5'>
                <Link href={`/edit/${data._id}`} className='bg-gray-500 text-white border px-3 py-2 rounded-md text-lg my-2'>Edit</Link>
                <Delete id={data._id}/>
              </div>
            </div>
          ))
        ) : (
          <p className='bg-gray-300 p-3 my-3'>You do not have post.</p>
        )}
      </div>
    </main>
  );
}
