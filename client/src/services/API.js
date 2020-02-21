import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? 'https://stacie-todos-api.herokuapp.com/' : `http://localhost:8081/` // the url of our server
  })
}
