import request, {post,get} from './request'

//登录接口
export function login(data) {
    return request({
        url: "login",
        method: post,
        data: data
    })
}

//左侧菜单权限
export function getLeftMenu(){
    return request({
        url: "menus",
        method: get
    })
}
