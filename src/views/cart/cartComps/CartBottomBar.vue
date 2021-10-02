<template>
  <div class="cart-bottom-bar">
<!--    @click.native监听组件点击-->
    <div class="check-button" :class="{check:isSelectAll}" @click="checkClick">
      <img src="~assets/img/cart/tick.svg">
    </div>
    <div class="cart-bottom-price">
      合计：
      <span>{{totalPrice}}</span>
      元
    </div>
    <div class="cart-bottom-btn">
      <button @click="calcClick">提交订单({{checkLength}})</button>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'CartBottomBar',
      computed:{
        //  返回总价格
        totalPrice(){
          return '¥'+this.$store.state.cartList.filter(item=>{
            return item.checked
          }).reduce((preValue,item)=>{
            return preValue+item.price*item.count
          },0).toFixed(2)
        },
        checkLength(){
          return this.$store.state.cartList.filter(item=>item.checked).length
        },
        isSelectAll(){
          // return !(this.$store.state.cartList.filter(item=>!item.checked).length)
          if(this.$store.state.cartList.length==0) {
            return false
          }else{
            return !this.$store.state.cartList.find(item=>!item.checked)
          }
        }
      },
      methods:{
        checkClick(){
          if(this.isSelectAll){//全部选中
            this.$store.state.cartList.forEach(item=>item.checked=false)
          }else{//部分选中或全部不选中
            this.$store.state.cartList.forEach(item=>item.checked=true)
          }
        },
        calcClick(){
          if(!this.isSelectAll){
            this.$toast.show('该功能还未实现2')
          }else{
            this.$toast.show('该功能还未实现1')
          }
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .cart-bottom-bar {
    font-size: 15px;
    position: fixed;
    right: 0;
    bottom: 50px;
    left: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: 38px;
    padding: 0 10px;
    border-top: 1px solid #cccccc;
  }
  .check-button{
    height: 20px;
    width: 20px;
    border-radius: 50%;
    border: 2px solid #aaa;
    /*background-color: #ff5777;*/
  }
  .check{
    background-color: #ff5777;
  }

  .cart-bottom-price {
    margin-left: 30px;
  }

  .cart-bottom-price span {
    color: red;
  }

  .cart-bottom-btn button {
    line-height: 38px;
    position: absolute;
    right: 0;
    bottom: 0;
    display: block;
    height: 38px;
    padding: 0 15px;
    color: white;
    border: 0;
    outline: none;
    background: linear-gradient(to right, #ff6034, #ee0a24);
  }

  .cart-bottom-btn button:active {
    opacity: 0.8;
  }
</style>
