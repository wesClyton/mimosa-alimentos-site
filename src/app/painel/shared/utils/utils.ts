import { ChangeEvent } from "react"

export function removeEmptyProperty(objeto: any) {
  Object.keys(objeto).forEach(function (chave) {
    if (!objeto[chave] && objeto[chave] !== false) {
      delete objeto[chave]
    }
  })

  return objeto
}

export function dateToIso(date: string) {
  const newDate = new Date(date)
  return newDate.toISOString()
}

function buildFormData(formData: any, data: any, parentKey = "") {
  if (
    data &&
    typeof data === "object" &&
    !(data instanceof Date) &&
    !(data instanceof File) &&
    !(data instanceof Blob)
  ) {
    Object.keys(data).forEach((key) => {
      buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key)
    })
  } else {
    const value = data == null ? "" : data

    formData.append(parentKey, value)
  }
}

export function jsonToFormData(data: any) {
  const formData = new FormData()

  buildFormData(formData, data)

  return formData
}

export function getImageData(event: ChangeEvent<HTMLInputElement>) {
  const dataTransfer = new DataTransfer()

  Array.from(event.target.files!).forEach((image) => dataTransfer.items.add(image))

  const files = dataTransfer.files
  const displayUrl = files.length ? URL.createObjectURL(event.target.files![0]) : ""

  return { files, displayUrl }
}

export function dateIsoToDMY(d: string) {
  const date = new Date(d)
  function pad(n) {
    return (n < 10 ? "0" : "") + n
  }
  return pad(date.getUTCDate()) + "/" + pad(date.getUTCMonth() + 1) + "/" + date.getUTCFullYear()
}
