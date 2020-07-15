import axios from 'axios'
import {TOKEN} from "../constant/Constant";

const service = axios.create({
    baseURL: "http://timemeetyou.com:8889/api/private/v1/",
    timeout: 5000
})

//拦截器 添加头
service.interceptors.request.use(config => {
    let token = sessionStorage.getItem(TOKEN)
    config.headers = {
        "Authorization": token
    }
    return config
})

//定义几个请求方法
export const get = "get"
export const post = "post"
export const put = "put"
export const del = "delete"

export default service
