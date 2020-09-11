import service from './baseaxios'

export function getuserlist_api(data) {
    return service({
        url: '/users',
        params: data
    })
}

export function setrole_api(id, data) {
    return service({
        url: `/users/${id}/role`,
        method: 'put',
        data: data
    })
}

export function deleteuser_api(id) {
    return service({
        url: '/users/' + id,
        method: 'delete',
    })
}

export function getuser_api(id) {
    return service({
        url: '/users/' + id,
        method: 'get',
    })
}

export function adduser_api(data) {
    return service({
        url: '/users',
        method: 'post',
        data: data
    })
}

export function edituser_api(id, data) {
    return service({
        url: '/users/' + id,
        method: 'put',
        data: data
    })
}