import axios from 'axios'
import store from '../store/index'
import { Message } from 'element-ui'
import env from "./env";


/**
 * 公共请求
 * @param {*} url 
 * @param {*} data 
 */

const axios1 = axios.create();
if (env == 'development') {
  axios1.defaults.baseURL = 'http://localhost:3000';
} else {
  // axios1.defaults.baseURL = 'https://api.jinkex.com';
}
export const _axios = (url, data, method) => {
  let paramsInit = {
    school_host: store.state.SchoolHost,
    token: store.state.Author,
    ...data
  }
  // console.log(paramsInit)
  if (method == 'post' || method == 'put') {
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
      // console.log(key,data[key])
      url = `${url}&${key}=${data[key]}`
    }
    // console.log(url)
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
    // console.log('配置成功')
    // console.log(config)
    return config;
  },
  error => {
    console.log('配置失败')
    return Promise.error(error);
  })

axios1.interceptors.response.use(
  response => {
    if (response.status === 200) {
      if (response.data.code === 403) {
        Message.error('登录过期，请重新登录')
        sessionStorage.clear();
        // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
        setTimeout(() => {
          router.replace({
            path: '/login',
          });
        }, 1000);
      }
      return Promise.resolve(response);
    } else {
      // console.log('1')
      return Promise.reject(response);
    }
  },
  error => {
    // console.log(error)
    Message({
      message: '服务器错误',
      type: 'error'
    })
    return Promise.reject(error) //接口500抛出异常（不走页面逻辑）
  }
);


// const axios2 = axios.create();
// if (env == 'development') {
//   axios2.defaults.baseURL = 'https://jkapi.jinke.shenbian100.com';
// } else {
//   axios2.defaults.baseURL = 'https://api.jinkex.com';
// }
// _axios2 = (url, data, method) => {
//   let paramsInit = {
//     school_host: store.state.SchoolHost,
//     token: store.state.Author,
//     ...data
//   }
//   // console.log(paramsInit)
//   if (method == 'post' || method == "put" || method == "delete") {
//     return new Promise((resolve, reject) => {
//       axios2({
//         method,
//         url,
//         data: paramsInit
//       }).then(res => {
//         resolve(res.data);
//       }).catch(err => {
//         reject(err)
//       })
//     })
//   }
//   else if (method == 'get') {
//     url = `${url}?token=${paramsInit.token}&school_host=${store.state.SchoolHost}`
//     for (const key in data) {
//       // console.log(key,data[key])
//       url = `${url}&${key}=${data[key]}`
//     }
//     // console.log(url)
//     return new Promise((resolve, reject) => {
//       axios2({
//         url,
//         method
//       }).then(res => {
//         resolve(res.data);
//       }).catch(err => {
//         reject(err)
//       })
//     })
//   }

// }

// //请求拦截器
// axios2.interceptors.request.use(
//   config => {
//     const SchoolHost = store.state.SchoolHost;
//     SchoolHost && (config.headers.Authorization = SchoolHost);
//     // console.log('配置成功')
//     // console.log(config)
//     return config;
//   },
//   error => {
//     console.log('配置失败')
//     return Promise.error(error);
//   })

// axios2.interceptors.response.use(
//   response => {
//     // console.log(response,'*****************************')
//     if (response.status === 200) {
//       // console.log('2')
//       // console.log(response.data.code);
//       if (response.data.code === 403) {
//         Message.error('登录过期，请重新登录')
//         sessionStorage.clear();
//         // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
//         setTimeout(() => {
//           router.replace({
//             path: '/login',
//           });
//         }, 1000);
//       }
//       return Promise.resolve(response);
//     } else {
//       // console.log('1')
//       return Promise.reject(response);
//     }
//   },
//   error => {
//     // console.log(error)
//     Message({
//       message: '服务器错误',
//       type: 'error'
//     })
//     return Promise.reject(error) //接口500抛出异常（不走页面逻辑）
//   }
// );

export default _axios;




