import axios from "axios";

//第三种方式，最终采用
//可以直接返回Promise值，不需要新建Promise，return new Promise
export function request(config) {
    //创建axios实例
    const instance=axios.create({
      baseURL:'找老师获取新接口，微信：coderwhy003',
      timeout:5000
    })

  //axios拦截器
  //全局拦截axios.interceptors
  //拦截请求instance.interceptors.request，
  // 拦截响应instance.interceptors.response
  instance.interceptors.request.use(config=>{
    return config
  },err=>{
   console.log(err)
  })

  //响应拦截,服务器已经获取值，所以响应结果res
  instance.interceptors.response.use(res=>{
    return res.data
  },err=>{
   console.log(err)
  })

  return instance(config)
}
