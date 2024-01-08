

import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { Heading } from '../components'

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