import React from 'react'

const Button = ({
    btnText,
    type = "button",
    bgColour="bg-blue-500",
    textColour= "text-white",
    className=" ",
    ...props

}) => {
  return (
   <button className={`px-4 py-2 rounded-lg ${bgColour} ${textColour}`} {...props}>
   {btnText}
   </button>
  )
}

export default Button
