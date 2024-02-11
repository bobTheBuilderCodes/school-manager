"use client"

import { approveTicket } from "@/services/tickets";
import { Card } from "..";
import SubHeading from "../ui/SubHeading";
import { api } from "@/services/endpoints";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface NotificationsProps {
  notifications: notification[];
}



const TicketAction =  ({ notifications }: NotificationsProps) => {

    const session = useSession()
    const authToken = session.data?.user.accessToken!
    const router = useRouter()

    const approveTicketHandler = async(id: number) => {
      try {
        await approveTicket({
            method: 'POST',
            url: `${api.approveTicket}/${id}`,
            authToken,
            payload: {ticketId: id},
          });
          router.refresh()
        // console.log("Running")
      } catch (error) {
        console.log(error)
      }
      alert(id)
    }

    const filteredNotification = notifications?.filter(notification => notification.isRead === false)
    // console.log("Notifications", notifications)


    // console.log("Filtered", filteredNotification)

  return (
    <div>
      {notifications?.map(({ content, id, isRead, ticketId   }) => (
        <Card
          className={`my-4 h-auto bg-red w-full ${isRead && "bg-blue-500"}`}
          key={id}
        >
          {isRead && (
            <span className="bg-green-100 text-green-700 rounded-full text-right px-2">
              new
            </span>
          )}
          <SubHeading className="mb-3 text-sm text-gray-400" title={content} />
          <button onClick={()=>approveTicketHandler(ticketId)}>Approve</button>
          {/* <button onClick={()=>approveTicketHandler(id)} className="mx-7">Disapprove</button> */}
        </Card>
      ))}
    </div>
  );
};

export default TicketAction;
