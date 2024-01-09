import { api } from "./endpoints";

export const getData = async () => {
    const response = await fetch(api.allStudents);
    const data = await response.json();
  
    if (!Array.isArray(data.students)) {
      console.error("Invalid response format:", data);
      return [];
    }
  
    return data.students;
  };
  