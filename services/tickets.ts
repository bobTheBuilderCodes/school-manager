interface ticketProps {
  url: string;
  payload: any;
  authToken: string;
  message?: string;
  method?: string;
}

export async function approveTicket({
  method = "POST",
  url,
  authToken,
  payload,
  message,
}: ticketProps) {
  const headers = {
    Authorization: `Bearer ${authToken}`,
    "Content-Type": "application/json",
    cache: "no-store",
  };
  try {
    const response = await fetch(url, {
      method,
      headers,
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    console.log("Results", result);
    alert(`message from backend ${result.message}`);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}
