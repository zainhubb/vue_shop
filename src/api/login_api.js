import request from './baseaxios'
export function login_api(data){
    return request({
        url:'/login',
        method:'post',
        data:data
    })
}