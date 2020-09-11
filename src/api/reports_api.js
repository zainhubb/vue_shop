import service from './baseaxios'

export function getreports_api() {
    return service({
        url:'/reports/type/1',
        method: 'get'
    })
}