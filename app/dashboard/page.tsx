

import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'
import { Heading } from '../components'
import { authOptions } from '../api/auth/[...nextauth]/options'
import Image from 'next/image'
import Picture from '@/resources/BackgroundImage.svg'

const DashboardHome = async() => {

  const session =  await getServerSession(authOptions)

  const loggedInUser = session?.user.loggedInUser
  return (
    <div>
        <Heading title={`Welcome ${loggedInUser}`}  />
      
       {/* {JSON.stringify(session)} */}
    </div>
  )
}

export default DashboardHome