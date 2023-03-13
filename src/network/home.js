import { request} from "./request";


// 添加新的home.js文件，把home要进行的请求整理在一个文件中，首页就可以面向home.js开发

// 请求首页的轮播图数据和推荐信息数据
export function getHomeMultidata() {
    return request({
        url: '/home/multidata'
    })
}

// 请求 tabcontrol 下的展示商品的信息
// 需要根据商品类型和页码去请求数据
export function getHomeGoods(type, page) {
    return request({
        url: '/home/data',
        params: {
            type,
            page
        }
    })
} 