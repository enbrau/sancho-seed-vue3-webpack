export default function(route) {
  return new Promise((resolve) => {
    console.info('[Sancho][Router] Navigation finished: ' + route.path)
    resolve()
  })
}