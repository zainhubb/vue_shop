// import axios from 'axios'
// export function getmenulist_api(){
//     return axios('/menus')
// }
import request from './baseaxios'
export function getmenulist_api(){
    return request('/menus')
}