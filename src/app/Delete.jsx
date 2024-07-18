"use client"

import React from 'react'

function Delete({id}) {

    const handleDelete = async () => {
        const confirmed = confirm("Are you sure?");

        if(confirmed){
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/posts/${id}`,{
                method: "DELETE"
            })

            if(res.ok){
                window.location.reload();
            }
        }
    }

  return (
    <button onClick={handleDelete} className='bg-red-500 text-white border px-3 py-2 rounded-md text-lg my-2'>
      Delete
    </button>
  )
}

export default Delete
