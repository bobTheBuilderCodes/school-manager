import React from 'react'


interface ActionProps{
    children: React.ReactNode
}
const Actions = ({children}: ActionProps) => {
  return (
    <div className='flex'>
        {children}
    </div>
  )
}

export default Actions