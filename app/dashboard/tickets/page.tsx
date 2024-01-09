import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { Heading, Paragraph } from '@/app/components'
import Actions from '@/app/components/feature/Actions'
import Table from '@/app/components/ui/Table'
import { api } from '@/services/endpoints'
import { getSingleData } from '@/services/getData'
import { getServerSession } from 'next-auth'
import React from 'react'

const Tickets = async() => {

  const session = await getServerSession(authOptions)
  const userId = session?.user.userId
  const data = [
    {name: 'Robert Sam', age: 22, occupation: "UI Designer"},
    {name: 'Robert Sam', age: 22, occupation: "UI Designer"},
    {name: 'Robert Sam', age: 22, occupation: "UI Designer"},
  ]

  const {studentTickets} = await getSingleData(`${api.studentTickets}/${userId}`)
  console.log("Tickets", studentTickets)
  return (
    <div>
        <Heading title='All Tickets' className='mb-4' />
        <Table data={studentTickets} visibleColumns={["ticketName", "reason", "ticketDate", "ticketStatus"]} actions={
          <Actions>
            <Paragraph title={'Edit'} className='cursor-pointer' />
            <Paragraph title={'Delete'} className='mx-4 cursor-pointer' />
          </Actions>
        } />
    </div>
  )
}

export default Tickets