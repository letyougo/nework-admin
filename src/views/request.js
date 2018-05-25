import request from 'axios'


let req = request.create({
  baseURL: 'http://localhost:8080',
});
req.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
export default req
