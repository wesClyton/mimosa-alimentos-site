"use client"

interface IServiceApi {
  method: HttpMethod
  endpoint: string
  headersOptions?: object
  bodyData?: object
}

export enum ContentType {
  JSON = "application/json",
  FORM = "application/x-www-form-urlencoded",
  TEXT = "text/plain",
  FORM_DATA = "multipart/form-data",
}

enum HttpMethod {
  PUT = "PUT",
  POST = "POST",
  GET = "GET",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhODJhNGRjOS1hMjAyLTQ2MDktYmViNC04MGUwZTE4MDk5NjQiLCJlbWFpbCI6Indlcy5oaW5zY2hAZ21haWwuY29tIiwibmFtZSI6Ildlc2xsZXkgSGluc2NoIDEzIiwiaWF0IjoxNzEwMTk4NzU2LCJleHAiOjE3MTAyODUxNTZ9.cHpWwS1QPk98JcF8_jmc--eoMGUPAL5_m0ia3g1A8Tw"

async function serviceApi({ method, endpoint, headersOptions = {}, bodyData = {} }: IServiceApi) {
  const headers =
    method === HttpMethod.GET
      ? new Headers({
          Authorization: `Bearer ${token}`,
          ...headersOptions,
        })
      : {}

  let body

  if (Object.keys(bodyData).length !== 0 && bodyData.constructor === Object) {
    body = JSON.stringify(bodyData)
  }

  return await fetch(`http://localhost:3000/${endpoint}`, {
    method,
    headers,
    body,
  })
    .then((response) => response.json())
    .catch((err) => {
      console.log(`erro na requisição: `, err)
    })
}

async function GetService(endpoint: string, params = {}) {
  const endpointUrl = params ? endpoint + "?" + new URLSearchParams(params).toString() : endpoint

  return await serviceApi({
    method: HttpMethod.GET,
    endpoint: endpointUrl,
  })
}

async function PostService(endpoint: string, body = {}, contentType = ContentType.JSON) {
  return await serviceApi({
    method: HttpMethod.POST,
    endpoint,
    bodyData: body,
    headersOptions: { "Content-Type": contentType },
  })
}

async function PutService(endpoint: string, body = {}, contentType = ContentType.JSON) {
  return await serviceApi({
    method: HttpMethod.PUT,
    endpoint,
    bodyData: body,
    headersOptions: { "Content-Type": contentType },
  })
}

async function PatchService(endpoint: string, body = {}, contentType = ContentType.JSON) {
  const headers = new Headers({})

  return await serviceApi({
    method: HttpMethod.PATCH,
    endpoint,
    bodyData: body,
    headersOptions: { "Content-Type": contentType },
  })
}

async function DeleteService(endpoint: string, id: string | number) {
  return await serviceApi({ method: HttpMethod.DELETE, endpoint: `${endpoint}/${id}` })
}

export { DeleteService, PatchService, PutService, PostService, GetService }
