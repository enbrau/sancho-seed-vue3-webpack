export default function(request) {
  console.debug(`[Sancho] >>> ${request.method}::${request.baseURL}${request.url}\n`, request)
}
