// This file contains the functions to fetch data from the API
// Customer API
export function fetchCustomers() {
  return fetch(import.meta.env.VITE_CUST_API_URL).then((response) => {
    if (!response.ok) throw new Error("Error in fetch: " + Response.statusText);
    return response.json();
  });
}

export function deleteCustomer(url) {
  return fetch(url, {
    method: "DELETE",
  }).then((response) => {
    if (!response.ok)
      throw new Error("Error in delete: " + Response.statusText);
    return response.json();
  });
}

export function addCustomer(newCustomer) {
  return fetch(import.meta.env.VITE_CUST_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCustomer),
  }).then((response) => {
    if (!response.ok)
      throw new Error("Error in adding: " + Response.statusText);
    return response.json();
  });
}

export function editCustomer(url, customer) {
  return fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  }).then((response) => {
    if (!response.ok)
      throw new Error("Error in update: " + Response.statusText);
    return response.json();
  });
}


//Training API
export function fetchTrainings() {
  return fetch(import.meta.env.VITE_CUST_TRAIN_API_URL).then((response) => {
    if (!response.ok) throw new Error("Error in fetch: " + Response.statusText);
    return response.json();
  });
}

export function deleteTraining(id) {
  return fetch(`${import.meta.env.VITE_TRAIN_API_URL}/${id}`, {
    method: "DELETE",
  }).then((response) => {
    if (!response.ok)
      throw new Error("Error in delete: " + Response.statusText);
    return response.json();
  });
}

export function addTraining(newTraining) {
  return fetch(import.meta.env.VITE_TRAIN_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTraining),
  }).then((response) => {
    if (!response.ok)
      throw new Error("Error in adding: " + Response.statusText);
    return response.json();
  });
}
