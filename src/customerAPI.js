export function fetchCustomers() {
    return fetch(import.meta.env.VITE_CUST_API_URL).then((response) => {
      if (!response.ok) throw new Error("Error in fetch: " + Response.statusText);
      return response.json();
    });
  }