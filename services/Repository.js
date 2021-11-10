import axios from 'axios'

const version = 'v1'

const axiosInstance = axios.create({})
const baseURL =
  'https://2lp3e3xmzk.execute-api.eu-central-1.amazonaws.com/product-price-tracker/'
const configBaseURL = `${baseURL}${version}/`

axiosInstance.defaults.baseURL = configBaseURL
axiosInstance.defaults.headers.common['x-api-key'] =
  'zcYDgkg5Iu77HqxVdTYFb794D0o1BdFR3TVDiSGs'

export default axiosInstance
