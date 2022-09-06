import React from 'react'

const Message = ({user, message}) => {

    console.log("Message component",user,message)
  return (
    <p>{message.message}</p>
  )
}

export default Message