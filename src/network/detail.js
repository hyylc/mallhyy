import { request } from "./request";


export function getDetail(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
}


export function getDetailRecommend() {
  return request({
    url: "/recommend",
    methods: "GET"
  });
}



// 把杂乱无章的数据添加到一个对象中
export class Goods {
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title
        this.decs = itemInfo.desc
        this.newPrice = itemInfo.price
        this.discount = itemInfo.discountDesc
        this.columns = columns
        this.services = services
        this.realPrice = itemInfo.lowNowPrice
    }
}

export class Shop {
    constructor(shopInfo) {
      this.logo = shopInfo.shopLogo; //字符串
      this.score = shopInfo.score; //数组
      this.fans = shopInfo.cFans;
      this.goods = shopInfo.cGoods;
      this.sells = shopInfo.cSells;
      this.name = shopInfo.name;
    }
  }
  
export class GoodsParam {
    constructor(info, rule) {
      this.image = info.images ? info.images[0] : "";
      this.infos = info.set;
      this.sizes = rule.tables;
    }
}


