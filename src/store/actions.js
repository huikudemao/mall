export default{
  addCart(context,payload){
    return new Promise(resolve=>{
      // let oldProduct=null
      // //：for of无法循环遍历对象,可遍历数组
      // //for in循环遍历的是数组的键值(索引)，而for of循环遍历的是数组的值。v-for与for有区别
      // for(let item of payload.iid){
      //   oldProduct=item
      // }
      //find()方法返回数组中第一个满足条件的元素,找不到返回undefined
      let oldProduct=context.state.cartList.find(item=>item.iid===payload.iid)

      //数组里，存在元素，数量加一，不存在，添加元素并赋值为一
      if (oldProduct){
        //尽量不要在actions里面直接修改state的值
        //.count统计oldProduct的输入次数
        // oldProduct.count+=1
        context.commit('addCounter',{oldProduct,payload})
        // payload.count=oldProduct.count
        resolve('当前的商品数量+1')
      }else{
        context.commit('addToCart',payload)
        resolve('添加了新的商品')
      }
    })
  }
}
