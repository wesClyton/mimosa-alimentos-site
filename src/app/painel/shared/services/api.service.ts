"use client"

import { getSession } from "next-auth/react"
import errorHandling from "./error-handling"
import { MimeTypes } from "../enum/mime-types.enum"
import { HttpMethod } from "../enum/http-method.enum"

interface IServiceApi {
  method: HttpMethod
  endpoint: string
  headersOptions?: object
  bodyData?: object
}

async function serviceApi({ method, endpoint, headersOptions = {}, bodyData = {} }: IServiceApi) {
  const session = await getSession()

  const headers = new Headers({
    // @ts-ignore
    Authorization: `Bearer ${session?.user.access_token}`,
    ...headersOptions,
  })

  let body

  if (Object.keys(bodyData).length !== 0 && bodyData.constructor === Object) {
    body = JSON.stringify(bodyData)
  }

  return await fetch(`http://localhost:3000/${endpoint}`, {
    method,
    headers,
    body,
  })
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        return response.json()
      } else {
        response.json().then((data) => {
          errorHandling(data)
        })
      }

      return
    })
    .catch((err) => {
      errorHandling(err)
      return
    })
}

async function GetService(endpoint: string, params = {}) {
  const endpointUrl = Object.keys(params).length ? endpoint + "?" + new URLSearchParams(params).toString() : endpoint

  return await serviceApi({
    method: HttpMethod.GET,
    endpoint: endpointUrl,
  })
}

async function PostService(endpoint: string, body = {}, contentType = MimeTypes.Json) {
  return await serviceApi({
    method: HttpMethod.POST,
    endpoint,
    bodyData: body,
    headersOptions: { "Content-Type": contentType },
  })
}

async function PutService(endpoint: string, body = {}, contentType = MimeTypes.Json) {
  return await serviceApi({
    method: HttpMethod.PUT,
    endpoint,
    bodyData: body,
    headersOptions: { "Content-Type": contentType },
  })
}

async function PatchService(endpoint: string, body = {}, contentType = MimeTypes.Json) {
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
