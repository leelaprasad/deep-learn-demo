import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/subjects/";

export function getSubjects() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function saveSubject(subject) {
  return fetch(baseUrl + (subject.id || ""), {
    method: subject.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(subject)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteSubject(subjectId) {
  return fetch(baseUrl + subjectId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
