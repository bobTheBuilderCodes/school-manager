"use client"
import { Button } from '@/app/components'
import React, { useState } from 'react'

const openModal = () => {
  const [isOpen  , setIsOpen] = useState(false)
  // const open = () => true

  return (
    <Button title='Open Modal' />
  )
}

export default openModal