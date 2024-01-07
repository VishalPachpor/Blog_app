import React,{useId} from 'react'

const select = ({
    options,
    label,
    className=" ",
    ...props
}, ref) => {
    const id = useId();
    return (
    <div className='w-full'>
        {label && <label htmlFor={id} className=''></label>}
        <select
         id={id} 
         {...props} 
         ref={ref} 
         className={`px-3 py-2 rounded-lg bg-white text-black 
         outline-none focus:bg-gray-50 duration-200 border 
         border-gray-200 w-full ${className}`}>
         
         </select>
    </div>
  )
}

export default select
