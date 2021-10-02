<template>
  <swiper>
    <swiper-item v-for="(item,index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from '@/components/common/swiper/index.js'

    export default {
        name: 'HomeSwiper',
        props:{
          banners:{
            type:Array,
            default(){
              return []
            }
          }
        },
      data(){
          return{
            isLoad:false
          }
      },
      components:{
          Swiper,
        SwiperItem
      },
      methods:{
        imageLoad(){
          //没有加载时取反，if为true，执行里面的语句
          if (!this.isLoad){
            this.$emit('swipperImageLoad')
            //加载第一次，把isLoad设置成true，则if(flase)，此时不会执行if里面的语句
            this.isLoad=true
          }
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
