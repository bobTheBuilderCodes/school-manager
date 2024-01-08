const baseUrl = "https://schoolsphere-backend.onrender.com/v1"
let status
export const api = {

  // Students Details
  allStudents: `${baseUrl}/students/allStudents`,
  singleStudent: `${baseUrl}/students`,
  deleteStudent: `${baseUrl}/students`,

  // Tickets
  allTickets: `${baseUrl}/ticket/allTickets`,
  studentTickets: `${baseUrl}/ticket/tickets/`, 
  getTickets: `${baseUrl}/ticket/tickets`,
  getPendingTickets: `${baseUrl}/ticket/pending/pendingTickets`,
  getApprovedTickets: `${baseUrl}/ticket/approved/approvedTickets`,
  getRejectedTickets: `${baseUrl}/ticket/rejected/rejectedTickets`,
  getTicketsByStatus: `${baseUrl}/ticket/${status}/${status}Tickets`,
  searchTicketByName: `${baseUrl}/ticket`,
  editTicket: `${baseUrl}/ticket`,
  postTicket: `${baseUrl}/ticket` , //Append the student ID
  deleteTicket: `${baseUrl}/ticket` ,

  // Auth
  login: `${baseUrl}/auth/login`,
  createStudent: `${baseUrl}/auth/createStudent`,

  // Quotes
  motivation: "https://zenquotes.io/api/quotes/",
  
};

