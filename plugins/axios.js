export default function ({ $axios, redirect }) {
  // configure axios timeout
  // $axios.defaults.timeout = 1000

  // $axios.onRequest((config) => {
  //   console.log(`Making request to ${config.url}`)
  // })
  // $axios.onError((error) => {
  //   console.error(`Axios error (${error.response.status}): ${error.response}`)
  //   // const code = parseInt(error.response && error.response.status)
  //   // if (code === 400) {
  //   //   redirect('/400')
  //   // }
  // })
}
