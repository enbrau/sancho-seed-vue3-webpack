module.exports = [
  {
    url: `/demo/api`,
    method: 'get',
    response: () => {
      return {
        flag: 0,
        data: null,
        msg: 'Nothing is true, everything is permitted!'
      }
    }
  }
]
