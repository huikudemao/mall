<template>
  <div id="cart">
<!--    导航-->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
<!--    商品列表-->
    <cart-list class="cart-list"/>
<!--    底部-->
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import NavBar from '@/components/common/navbar/NavBar'
  import CartList from './cartComps/CartList'
  import CartBottomBar from './cartComps/CartBottomBar'
  import {mapGetters} from 'vuex'
    export default {
        name: 'Cart',
      components:{
        NavBar,
        CartList,
        CartBottomBar
      },
      computed:{
        ...mapGetters(['cartLength'])
      },

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #cart{
    position: relative;
    height:100vh;
  }
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
    position: relative;
    z-index: 11111;
    /*font-weight: 700;*/
  }
  .cart-list{
    height: calc(100% - 44px - 49px - 40px);
  }
</style>
