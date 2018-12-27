import axios from 'axios'

var instance = axios.create({
  baseURL: '/apiproxy'
})

export default instance
