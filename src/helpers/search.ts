export const searchHighlight = (input: string, hightlight: string) => {
  const regEx = new RegExp(hightlight, 'ig')
  const replaceMask = `<b>${hightlight}</b>`
  return input.replace(regEx, replaceMask)
}

export const queryFound = (input: string, value: string) =>
  input.toLowerCase().includes(value.toLowerCase())
