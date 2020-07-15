import request, {post, get, put,del} from './request'

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

/**
 * 用户列表
 * params { query: 'key',pagenum: 1,pagesize: 10}
 * @param data
 * @returns {AxiosPromise}
 */
export function getUsers(params){
    return request({
        url: "users",
        method: get,
        params
    })
}

/**
 * 修改用户状态
 * @param id 用户id
 * @param state 状态 true false
 * @returns {AxiosPromise}
 */
export function editUserStatus(id,state) {
    return request({
        url: `users/${id}/state/${state}`,
        method: put
    })
}

/**
 * 添加用户 { username: '', password: '', email: '', mobile: ''}
 * @param data
 * @returns {AxiosPromise}
 */
export function addUser(data) {
    return request({
        url: 'users',
        method: post,
        data
    })
}

/**
 * 查询用户
 * @param id
 * @returns {AxiosPromise}
 */
export function searchUser(id) {
    return request({
        url: `users/${id}`,
        method: get
    })
}

/**
 * 修改用户邮箱和手机号
 * @param id
 * @param data
 * @returns {AxiosPromise}
 */
export function editUserInfo(id,data) {
    return request({
        url: `users/${id}`,
        method: put,
        data
    })
}

/**
 * 删除用户
 * @param id
 * @returns {AxiosPromise}
 */
export function deleteUser(id) {
    return request({
        url: `users/${id}`,
        method: del
    })
}
