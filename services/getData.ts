import { getServerSession } from "next-auth";
import { api } from "./endpoints";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import queryString from "query-string";

export const getData = async () => {
  const response = await fetch(api.allStudents);
  const data = await response.json();

  if (!Array.isArray(data.students)) {
    console.error("Invalid response format:", data);
    return [];
  }

  return data.students;
};

export const getNotifications = async () => {
  const response = await fetch(api.adminNotifications);
  const data  = await response.json();

  // if (!Array.isArray(data.students)) {
  //   console.error("Invalid response format:", data);
  //   return [];

  // }
  return data.allnotice;

};

export const getStudentData = async (url: string) => {
  const session = await getServerSession(authOptions);
  const authToken = session?.user.accessToken;

  const headers = {
    Authorization: `Bearer ${authToken}`,
    "Content-Type": "application/json",
    cache: "no-store",
  };
  const response = await fetch(url, { headers });
  const { findStudent } = await response.json();

  return findStudent;
};

export const getStudentTickets = async (searchParams: any) => {
  const urlParams = {
    name: searchParams?.name,
    status: searchParams?.status,
    page: searchParams?.page
  };

  const searchQuery = queryString.stringify(urlParams);

  const session = await getServerSession(authOptions);
  const authToken = session?.user.accessToken;
  const userId = session?.user.userId;

  const headers = {    
    Authorization: `Bearer ${authToken}`,
    "Content-Type": "application/json",
    cache: "no-store",
  };
  try {
    const fullUrl = `${api.studentTickets}/${userId}?${searchQuery}`; // Ensure this constructs the URL correctly
    
    const response = await fetch(fullUrl, { headers });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const { data } = await response.json();
    return data;
  } catch (error: any) {
    console.error("Fetch error:", error.message);
    return null;
  }
  
};

interface PostDataProps {
  url: string;
  payload: any;
  authToken: string;
  message?: string;
  method?: string;
}

export async function postData({
  method = "POST",
  url,
  authToken,
  payload,
}: PostDataProps) {
  const headers = {
    Authorization: `Bearer ${authToken}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await fetch(url, {
      method,
      headers,
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

interface DeleteProps {
  itemId: number;
}

export const deleteTicket = async (itemId: number, authToken: string) => {
  const headers = {
    Authorization: `Bearer ${authToken}`,
  };

  try {
    await fetch(`${api.deleteTicket}/${itemId}`, {
      method: "DELETE",
      headers,
      body: JSON.stringify(itemId),
    });
  } catch (error) {
    console.log("error deleting", error);
  }
};
