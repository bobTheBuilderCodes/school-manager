"use client"

import { signIn, useSession } from 'next-auth/react'
import {Button, Input, Card, Paragraph} from '..'
import { ChangeEvent, FormEvent, useState } from 'react'
import Link from 'next/link'

const ForgotPasswordForm = () => {

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

  const submitFormHandler = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    console.log("Session", session)
    try {
      await signIn("credentials", {
        username,
        password,
        redirect: false,

      })
    } catch (error) {
      
    }
    finally{
      setIsLoading(false)
    }
  }
  return (
    <form className="mt-12" onSubmit={submitFormHandler}>
        <Card>
          <Input placeholder='Enter email' value={username} name="username" onChange={formDataHandler} />
          <Button title="Send Link" />
          <Link href={'/'}>
            <Paragraph title='Back to log in' className='underline text-center mt-5' />
          </Link>
        </Card>
      </form>
  )
}

export default ForgotPasswordForm