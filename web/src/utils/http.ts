import token from "./token";
import { G_API_URL } from "../platform";

const BASE_URL = G_API_URL;

export function buildAuthorization() {
  const tokenVal = token.get();
  return tokenVal && tokenVal !== "null" ? `Bearer ${tokenVal}` : null;
}

export const getRequestHeaders = () => {
  const authorization = buildAuthorization();
  const headers: { Accept: string; "Content-Type": string; Authorization?: string } = {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
  };

  if (authorization) {
    headers.Authorization = authorization;
  }
  return headers;
};

// Function to perform GET requests
const _get = async (url, config = {}) => {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: 'GET',
    headers: getRequestHeaders(),
    ...config,
  });
  return handleResponse(response);
};

// Function to perform POST requests
const _post = async (url, data = {}, config = {}) => {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: 'POST',
    headers: getRequestHeaders(),
    body: JSON.stringify(data),
    ...config,
  });
  return handleResponse(response);
};

// Function to perform PUT requests
const _put = async (url, data = {}, config = {}) => {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: 'PUT',
    headers: getRequestHeaders(),
    body: JSON.stringify(data),
    ...config,
  });
  return handleResponse(response);
};

// Function to perform DELETE requests
const _delete = async (url, config = {}) => {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: 'DELETE',
    headers: getRequestHeaders(),
    ...config,
  });
  return handleResponse(response);
};

// Function to handle the response from fetch
const handleResponse = async (response) => {
  if (!response.ok) {
    // Handle error responses as needed
    const error = await response.json();
    throw new Error(error.message || 'Network response was not ok');
  }
  return response.json(); // Return the JSON data
};

// Export API methods
export { _get, _delete, _put, _post };

