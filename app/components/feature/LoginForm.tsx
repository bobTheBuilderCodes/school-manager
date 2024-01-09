"use client"

import { signIn, useSession } from 'next-auth/react'
import {Button, Input, Card, Paragraph} from '..'
import { ChangeEvent, FormEvent, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const LoginForm = () => {

  const {data : session} = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })

  const {username, password} = formData
const {data} = useSession()
const router = useRouter()
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
      })
      setIsLoading(false)

    } catch (error) {
      setIsLoading(false)
    }
    finally{
      setIsLoading(false)
    }
  }
  

  return (
    <form className="mt-12" onSubmit={submitFormHandler}>
        <Card>
          <Input placeholder='Enter username / email' value={username} name="username" onChange={formDataHandler} />
          <Input placeholder='Enter password' value={password} name="password" onChange={formDataHandler} />
          <Link href={'/forgot-password'}>
            <Paragraph title='Forgot Password' className='underline text-right mb-5' />
          </Link>
          <Button title={`${isLoading ? 'Logging in...' : 'Log in'}`} type='submit' />
        </Card>
      </form>
  )
}

export default LoginForm