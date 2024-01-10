import { getServerSession } from "next-auth";
import { api } from "./endpoints";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export const getData = async () => {

    const response = await fetch(api.allStudents);
    const data = await response.json();
  
    if (!Array.isArray(data.students)) {
      console.error("Invalid response format:", data);
      return [];
    }
  
    return data.students;
  };
  

export const getStudentData = async (url: string) => {
  const session = await getServerSession(authOptions)
  const authToken = session?.user.accessToken

  const headers = {
    Authorization: `Bearer ${authToken}`,
    "Content-Type": "application/json",
    cache: "no-store",
  };
    const response = await fetch(url, {headers});
    const {findStudent} = await response.json();
  
    return findStudent;
  };

export const getStudentTickets = async (url: string) => {
  const session = await getServerSession(authOptions)
  const authToken = session?.user.accessToken

  const headers = {
    Authorization: `Bearer ${authToken}`,
    "Content-Type": "application/json",
    cache: "no-store",
  };
    const response = await fetch(url, {headers});
    const data = await response.json();
  
    return data;
  };
  
