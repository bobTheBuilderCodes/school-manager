

import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'

const DashboardHome = async() => {

  const session =  await getServerSession(authOptions)

 
  
  return (
    <div>
       Home Server side
       {JSON.stringify(session)}
    </div>
  )
}

export default DashboardHome