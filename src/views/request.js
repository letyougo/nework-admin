import request from 'axios'
import qs from 'qs'
import { Form } from 'element-ui';
request.defaults.baseURL = window.url
import vue from 'vue'
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么

    if(config.method=='post'){
        let data = config.data
        console.log(config.data,'config.data')
        let form = new FormData()
        for(var key in data){
            form.append(key,data[key])
        }
        console.log('post request')
        config.data = form
        config.headers['Content-Type'] = 'appliction/x-www-form-urlencoded'
        console.log(config)
    }

    return config;
  }, function (error) {
    // 对请求错误做些什么
    vue.$message.error(error)
    //return Promise.reject(error);
  });
export default request
