import makeRequest from "./makeRequest";

export function getChallenges() {
  return makeRequest("/challenges");
}

export function getChallenge(id) {
  return makeRequest(`/challenges/${id}`);
}
