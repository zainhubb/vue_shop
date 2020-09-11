import service from './baseaxios'
export function getrights_api() {
    return service({
        url: '/rights/list',
        method: 'get'
    })
}


export function getroles_api() {
    return service({
        url: '/roles',
        method: 'get',
    })
}

export function getrole_api(id) {
    return service({
        url: '/roles/' + id,
        method: 'get',
    })
}


export function addrole_api(data) {
    return service({
        url: '/roles',
        method: 'post',
        data: data
    })
}

export function deleterole_api(id) {
    return service({
        url: '/roles/' + id,
        method: 'delete',
    })
}

export function allotrights_api(id, data) {
    return service({
        url: `roles/${id}/rights`,
        method: 'post',
        data: data
    })
}

export function getrightstree_api() {
    return service({
        url: '/rights/tree',
        method: 'get'
    })
}

export function editrole_api(id, data) {
    return service({
        url: '/roles/'+id,
        method: 'put',
        data: data
    })
}

export function deleteright_api(roleid,rightid) {
    return service({
        url: `roles/${roleid}/rights/${rightid}`,
        method: 'delete',
    })
}