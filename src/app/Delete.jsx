"use client"

import React from 'react'

function Delete({id}) {

    const handleDelete = async () => {
        const confirmed = confirm("Are you sure?");

        if(confirmed){
            const res = await fetch(`http://localhost:3000/api/posts/posts?id=${id}`,{
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
