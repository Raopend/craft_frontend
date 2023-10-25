import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000/'
// 携带 cookie，对目前的项目没有什么作用，因为我们是 token 鉴权
axios.defaults.withCredentials = false
// 请求头，headers 信息
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
// axios.defaults.headers['Authorization'] = localStorage.getItem('Authorization') || ''
// 默认 post 请求，使用 application/json 形式
axios.defaults.headers.post['Content-Type'] = 'application/json'

export default axios