import React from 'react'
import SubHeading from './SubHeading'
import { Paragraph } from '..'

const Empty = () => {
  return (
    <div className='h-[90%] text-center flex flex-col items-center justify-center '>
       <SubHeading title={"Looks like there's nothing here"} />
       <Paragraph title={"Have fun and chill now..."} />
    </div>
  )
}

export default Empty