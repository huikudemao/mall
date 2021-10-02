<template>
  <div class="cart-list">
      <!-- 循环部分 -->
      <div :key="index" class="shop-item" v-for="(item, index) in cartList">
        <div class="item-selector">
          <checkButton :is-checked="item.checked" @click.native="checkClick(index)"/>
<!--          @checkBtnClick="checkedChange" :value="itemInfo.checked"-->
        </div>
        <div class="item-img">
          <img :src="item.image" alt="商品图片" />
        </div>
        <div class="item-info">
          <div class="item-title">{{ item.title }}</div>
          <div class="item-desc">{{ item.desc }}</div>
          <div class="info-bottom">
            <div class="item-price left">¥{{ item.price*item.count }}</div>
            <div class="item-count right">x{{ item.count }}</div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import CheckButton from '@/components/content/checkButton/CheckButton'
    export default {
        name: 'CartList',
      components:{
        CheckButton
      },
      computed:{
        ...mapGetters(['cartList'])
      },
      methods:{
          checkClick(a){
            this.cartList[a].checked=!this.cartList[a].checked
            // console.log(this.cartList);
            this.$store.commit('addPush',this.cartList)
          }
      },
      //activated()：在vue对象存活的情况下，
      // 进入当前存在activated()函数的页面时，一进入页面就触发；
      // 可用于初始化页面数据等,重新获取高度
      activated() {
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .cart-list {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  }

  .shop-item {
    font-size: 0;
    display: flex;
    width: 100%;
    padding: 5px;
    border-bottom: 1px solid #cccccc;
  }

  .shop-item:last-child {
    border-bottom: 0;
  }

  .item-selector {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 12%;
  }

  .item-title,
  .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-img {
    padding: 5px;
  }

  .item-img img {
    display: block;
    width: 80px;
    height: 100px;
    border-radius: 5px;
    object-fit: cover;
  }

  .item-info {
    font-size: 17px;
    position: relative;
    overflow: hidden;
    width: 88%;
    padding: 5px 10px;
    color: #333333;
  }

  .item-info .item-desc {
    font-size: 14px;
    margin-top: 15px;
    color: #666666;
  }

  .info-bottom {
    position: absolute;
    right: 10px;
    bottom: 10px;
    left: 10px;
    margin-top: 10px;
  }

  .info-bottom .item-price {
    color: #ff4500;
  }


</style>
