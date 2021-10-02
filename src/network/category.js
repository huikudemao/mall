import {request} from '@/network/request'

export function getCateLiftdata(){
  return request({
    url:'/category'
  })
}

export function getCaterightdata(maitKey) {
  return request({
    url:'/subcategory',
    params:{
      maitKey
    }
  })
}
