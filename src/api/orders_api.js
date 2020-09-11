import service from './baseaxios'
export function getorders_api(data) {
    return service({
        url: "/orders",
        method: 'get',
        params: data
    })
}

export function getlogistics_api(data) {
    return service({
        url: "/kuaidi/1106975712662",
        method: 'get',
        params: data
    })
}