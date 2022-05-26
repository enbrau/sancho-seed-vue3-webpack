export default function(to, from, next) {
  return new Promise((resolve) => {
    console.info('[Sancho][Router] Navigating to: ' + to.path)
    resolve()
  })
}