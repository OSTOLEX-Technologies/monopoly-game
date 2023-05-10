
export function postMessage(message: any) {
  window.parent.postMessage(message, '*')
}