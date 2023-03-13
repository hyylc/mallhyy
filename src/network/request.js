import axios from "axios"


export function request(config) {
    // 1.创建axios实例
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:7878/api/hy66',
        timeout: 5000
    })

    // 2.axios的拦截器
    // 2.1请求拦截的作用
    // 为什么要拦截?
        // 1.比如config中的一些信息不满足服务器的要求,可以拦截后给config配置信息或转化
        // 2.比如每次发送网络请求时,希望在界面中显示一个请求的图标(会转的小圆圈),在这里show出来
        // 3.某些网络请求(比如登录),必须携带一些特殊的信息(比如判断用户有没有登录,是否携带token)
    instance.interceptors.request.use(config => {
        // 请求成功,传递的参数就是网络配置,拦截下了config
        // console.log(config)
        // 拦截后一定要返回config,不然的话不能继续请求
        return config
    }, err => {
        console.log(err)
    })

    // 2.2拦截响应，拦截下了返回的结果
    instance.interceptors.response.use(result => {
        // console.log(result)
        // 拦截后处理一定要返回,有用的就是data数据
        return result.data
    }, err => {
        console.log(err)
    })


    // 3.发送真正的网络请求
    // 这个网络请求本身的返回值就是Promise,可以直接返回
    return instance(config)
   
}
