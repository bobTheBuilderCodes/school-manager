"use client"

import { Button, Heading, Paragraph } from '@/app/components'
import { useRouter } from 'next/navigation'
import React from 'react'

const Error = () => {
    const router = useRouter()
  return (
    <div className='w-full flex items-center justify-center flex-col h-full'>
        <Heading title='Oooops, something went wrong.' />
        <Paragraph title={'Looks like something is broken...'} className='mb-12 mt-3' />
        <Button title='Take me back' onClick={()=>router.back()} />
    </div>
  )
}

export default Error