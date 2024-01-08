"use client"

import { signIn, useSession } from 'next-auth/react'
import {Button, Input, Card} from '..'
import { ChangeEvent, FormEvent, useState } from 'react'

const ResetPasswordForm = () => {

  const {data : session} = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })

  const {username, password} = formData

  const formDataHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  
  return (
    <form className="mt-12" onSubmit={()=>{}}>
        <Card>
         
          <Input placeholder='Enter new password' value={password} name="password" onChange={formDataHandler} />
          <Input placeholder='Confirm new password' value={password} name="password" onChange={formDataHandler} />
          <Button title="Log in" />
        </Card>
      </form>
  )
}

export default ResetPasswordForm