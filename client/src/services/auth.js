import makeRequest from "./makeRequest";

export function signup({ username, email, password }) {
  return makeRequest("/auth/signup", {
    method: "POST",
    data: { username, email, password },
  });
}
export function login({ username, password }) {
  return makeRequest("/auth/login", {
    method: "POST",
    data: { username, password },
  });
}
