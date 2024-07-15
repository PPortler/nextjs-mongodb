"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import React from 'react'

function EditPost({ params }) {

    const { id } = params;

    const [postData, setPostData] = useState("");

    const [newTitle, setTitle] = useState("");
    const [newImg, setImg] = useState("");
    const [newContent, setContent] = useState("");

    const router = useRouter();

    const getPostById = async (id) => {
        try{    
            const res = await fetch(`http://localhost:3000/api/posts/${id}`,{
                method:"GET",
                cache: "no-store"
            })

            if(!res.ok){
                throw new Error("Failed to fetch a post");
            }

            const data = await res.json();
            setPostData(data.post)

        }catch(err){
            console.log(err);
        }
    };
    
    useEffect(()=>{
        getPostById(id);
    },[])

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try{
            const res = await fetch(`http://localhost:3000/api/posts/${id}`,{
                method: "PUT",
                headers:{
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({ newTitle,newImg,newContent })
            })

            if(!res.ok){
                throw new Error("Failed to update post")
            }

            router.refresh();
            router.push('/');
            
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div>
            <div className='container mx-auto py-10'>
                <h3 className='text-3xl font-bold'>Edit Post</h3>
                <hr className='my-3' />
                <Link href="/" className='bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2'>Go back</Link>
                <form onSubmit={handleSubmit}>
                    <input onChange={(e) => setTitle(e.target.value)} type="text" className='w-{300px} block bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder={postData.title}/>
                    <input onChange={(e) => setImg(e.target.value)} type="text" className='w-{300px} block bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder={postData.img}/>
                    <textarea onChange={(e) => setContent(e.target.value)} name="" id="" cols="30" rows="10" className='w-{300px} block bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder={postData.content}></textarea>
                    <button type='submit' className='bg-green-500 text-white border py-2 px-3 rounded text-lg my-2'>Edit Post</button>
                </form>
            </div>
        </div>
    )
}

export default EditPost
