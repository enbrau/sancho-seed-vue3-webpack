export default function(response) {
  console.debug(`[Sancho] <<< ${response.config.method}::${response.config.baseURL}${response.config.url}\n`, response)
}
