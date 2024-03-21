export function removeEmptyProperty(objeto: any) {
  Object.keys(objeto).forEach(function (chave) {
    if (!objeto[chave]) {
      delete objeto[chave]
    }
  })

  return objeto
}
