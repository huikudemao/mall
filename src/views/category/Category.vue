<template>
  <div class="category">
    <nav-bar class="cate-nav">
      <div slot="center">商品分类</div>
    </nav-bar>
    <scroll class="cateLeft">
      <cate-left :cateData="cateData" @leftClick="leftClick"/>
    </scroll>
    <scroll class="cateRight">
      <cate-right :cateRight1="cateRight1"/>
    </scroll>
  </div>
</template>

<script>
  import NavBar from '@/components/common/navbar/NavBar'
  import CateLeft from './childComps/CateLeft'
  import CateRight from './childComps/CateRight'
  import Scroll from '@/components/common/scroll/Scroll'

  import {getCateLiftdata,getCaterightdata} from '@/network/category'
  export default {
    name: 'Category',
    components:{
      NavBar,
      CateLeft,
      CateRight,
      Scroll
    },
    data() {
      return {
        cateData:[],
        maitKey:'3627',
        cateRight1:[]
      }
    },
    created() {
      // 获取左侧分类列表
      this.getCateLiftdata()
      //获取默认值，即maitKey:'3627'对应的参数
      this.getCaterightdata(this.maitKey)
    },
    methods:{
      // 事件监听方法：
      leftClick(maitKey1){
        this.maitKey=maitKey1
        this.getCaterightdata(this.maitKey)
      },

      //  网路请求相关方法
      getCateLiftdata(){
        getCateLiftdata().then(res=>{
          this.cateData=res.data.category.list
        })
      },
      getCaterightdata(maitKey){
        getCaterightdata(maitKey).then(res=>{
          this.cateRight1=res.data.list
          // console.log(this.cateRight1);
        })
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .category{
    height: 100vh;
  }
  .cate-nav{
    background-color: var(--color-tint);
    color: #ffffff;
  }

  .cateLeft{
    width: 25%;
    background-color: #F6F4F6;
    /*overflow: hidden;除去溢出内容*/
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom:49px;
  }
  .cateRight{
    width: 75%;
    /*overflow: hidden;除去溢出内容*/
    overflow: hidden;
    position: absolute;
    bottom:49px;
    top: 44px;
    left: 25%;
  }
</style>
