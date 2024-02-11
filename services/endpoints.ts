const baseUrl = "https://schoolsphere-backend.onrender.com/v1"
export const api = {

  // Students Details
  allStudents: `${baseUrl}/students/allStudents`,
  singleStudent: `${baseUrl}/students`,
  deleteStudent: `${baseUrl}/students`,

  // Tickets
  allTickets: `${baseUrl}/ticket/allTickets`,
  studentTickets: `${baseUrl}/ticket/tickets`, 
  getTickets: `${baseUrl}/ticket/tickets`,
  editTicket: `${baseUrl}/ticket`,
  postTicket: `${baseUrl}/ticket` , //Append the student ID
  deleteTicket: `${baseUrl}/ticket` ,
  getTicket: `${baseUrl}/ticket` ,
  approveTicket: `${baseUrl}/ticket/approval`, //Append ticket id

  // Auth
  login: `${baseUrl}/auth/login`,
  createStudent: `${baseUrl}/auth/createStudent`,

  // Notifications
  adminNotifications: `${baseUrl}/notifications/allnotifications`,

  // Quotes
  motivation: "https://zenquotes.io/api/quotes/",
  
};

