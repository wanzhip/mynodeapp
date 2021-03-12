import axios from 'axios'
import store from '../store/index'
import { Message } from 'element-ui'
import env from "./env";


/**
 * 公共请求
 * @param {*} url 
 * @param {*} data 
 */

export const axios1 = axios.create();
if (env == 'development') {
  axios1.defaults.baseURL = 'http://localhost:3000';
} else {

}
export const _axios = (url, data, method) => {
  let paramsInit = {
    school_host: store.state.SchoolHost,
    token: store.state.Author,
    ...data
  }
  if (method == 'post' || method == 'put' || method == "delete") {
    return new Promise((resolve, reject) => {
      axios1({
        method,
        url,
        data: paramsInit
      }).then(res => {
        resolve(res.data);
      }).catch(err => {
        reject(err)
      })
    })
  }
  else if (method == 'get') {
    url = `${url}?token=${paramsInit.token}&school_host=${store.state.SchoolHost}`
    for (const key in data) {
      url = `${url}&${key}=${data[key]}`
    }
    return new Promise((resolve, reject) => {
      axios1({
        url,
        method
      }).then(res => {
        resolve(res.data);
      }).catch(err => {
        reject(err)
      })
    })
  }
}

//请求拦截器
axios1.interceptors.request.use(
  config => {
    const SchoolHost = store.state.SchoolHost;
    SchoolHost && (config.headers.Authorization = SchoolHost);
    return config;
  },
  error => {
    console.log('配置失败')
    return Promise.error(error);
  })

axios1.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    Message({
      message: '服务器错误',
      type: 'error'
    })
    return Promise.reject(error) //接口500抛出异常（不走页面逻辑）
  }
);






