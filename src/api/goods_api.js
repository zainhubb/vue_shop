import service from './baseaxios'
export function getcatelist_api() {
    return service({
        url: '/categories',
        method: 'get'
    })
}

export function getinfo_api(id, data) {
    return service({
        url: `categories/${id}/attributes`,
        method: 'get',
        params: data
    })
}

export function addgood_api(data) {
    return service({
        url: '/goods',
        method: 'post',
        data: data
    })
}

export function getcatelist2_api(data) {
    return service({
        url: '/categories',
        method: 'get',
        params: data
    })
}

export function getParentcatelist_api(data) {
    return service({
        url: '/categories',
        method: 'get',
        params: data
    })
}

export function getcate_api(id) {
    return service({
        url: '/categories/' + id,
        method: 'get',
    })
}
export function addCate_api(data) {
    return service({
        url: '/categories',
        method: 'post',
        data: data
    })
}

export function removecatebyid_api(id) {
    return service({
        url: '/categories/' + id,
        method: 'delete',
    })
}

export function editcate_api(id, data) {
    return service({
        url: '/categories/' + id,
        method: 'put',
        data: data
    })
}
export function getgoodslist_api(data) {
    return service({
        url: '/goods',
        method: 'get',
        params: data
    })
}

export function removegoodbyid_api(id) {
    return service({
        url: '/goods/' + id,
        method: 'delete',
    })
} 

export function addparams_api(id, data) {
    return service({
        url: `/categories/${id}/attributes`,
        method: 'post',
        data: data
    })
}
export function saveattrvals_api(cateid,attr_id,data){
    return service({
        url:`categories/${cateid}/attributes/${attr_id}`,
        method:'put',
        data:data
    })
}
export function showeditdialog_api(cateid,attr_id,data){
    return service({
        url:`categories/${cateid}/attributes/${attr_id}`,
        method:'get',
        params:data
    })
}

export function editparams_api(cateid,attr_id,data){
    return service({
        url:`categories/${cateid}/attributes/${attr_id}`,
        method:'put',
        data:data
    })
}
export function removeparamsbyid_api(cateid,id){
    return service({
        url:`categories/${cateid}/attributes/${id}`,
        method:'delete'
    })
}