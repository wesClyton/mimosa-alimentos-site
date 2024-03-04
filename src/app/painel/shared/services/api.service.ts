import { cookies } from "next/headers"

const cookieStore = cookies()
const token = cookieStore.get("token")?.value

export enum ContentType {
  JSON = "application/json",
  FORM = "application/x-www-form-urlencoded",
  TEXT = "text/plain",
  FORM_DATA = "multipart/form-data",
}

async function GetService(endpoint: string, params = {}) {
  const endpointUrl = params ? endpoint + "?" + new URLSearchParams(params).toString() : endpoint

  return await fetch(`${process.env.API_URL}/${endpointUrl}`, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${token}`,
    }),
  })
    .then((response) => response.json())
    .catch((err) => {
      console.log(err)
    })
}

async function PostService(endpoint: string, body = {}, contentType = ContentType.JSON) {
  return await fetch(`${process.env.API_URL}/${endpoint}`, {
    method: "POST",
    headers: new Headers({
      "Content-Type": contentType,
      Authorization: `Bearer ${token}`,
    }),
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .catch((err) => {
      console.log(err)
    })
}

async function PutService(endpoint: string, body = {}, contentType = ContentType.JSON) {
  return await fetch(`${process.env.API_URL}/${endpoint}`, {
    method: "PUT",
    headers: new Headers({
      "Content-Type": contentType,
      Authorization: `Bearer ${token}`,
    }),
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .catch((err) => {
      console.log(err)
    })
}

async function PatchService(endpoint: string, body = {}, contentType = ContentType.JSON) {
  return await fetch(`${process.env.API_URL}/${endpoint}`, {
    method: "PUT",
    headers: new Headers({
      "Content-Type": contentType,
      Authorization: `Bearer ${token}`,
    }),
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .catch((err) => {
      console.log(err)
    })
}

async function DeleteService(endpoint: string, id: string | number) {
  return await fetch(`${process.env.API_URL}/${endpoint}/${id}`, {
    method: "DELETE",
    headers: new Headers({
      Authorization: `Bearer ${token}`,
    }),
  })
    .then((response) => response.json())
    .catch((err) => {
      console.log(err)
    })
}

export { DeleteService, PatchService, PutService, PostService, GetService }
