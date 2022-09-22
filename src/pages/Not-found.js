import React,{useEffect} from 'react'

export const Notfound = () => {
    useEffect(()=>{
        document.title='Not Found!'
    },[])
    return (
        <div className='bg-gray-background'>
            <div className='mx-auth max-w-screen-lg'>
                <h2 className='text-center text-2xl'>No found!</h2>
            </div>
        </div>
    )
}
