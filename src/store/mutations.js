export default {
  addCounter(state,{oldProduct,payload}){
    oldProduct.count++
    payload.count=oldProduct.count
  },
  addToCart(state,payload){
    payload.count=1
    payload.checked=true
    state.cartList.push(payload)
  },
  //修改了购物车选中状态的值，重新更新state
  addPush(state,name){
    state.cartList=name
  }
}
