<template>
  <div class="detail-swiper1">
    <swiper class="swiper12">
      <swiper-item v-for="(item,index) in topImages" :key="index">
        <img :src="item">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import {Swiper, SwiperItem} from '@/components/common/swiper/index.js'
    export default {
        name: 'DetailSwiper',
      components:{
        SwiperItem,
        Swiper
      },
      props:{
        topImages:{
          type:Array,
          default(){
            return []
          }
        }
      },
        data() {
            return {
                msg: ''
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.swiper12{
  height: 300px;
}
</style>
