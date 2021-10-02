<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
<!--    不能使用v-if，v-if会使组件直接移除，点击面的ref="tabControl"组件时
        不能获取含有v-if的ref="tabControl1"组件的相关值-->
    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab" v-show="isTabFixed"/>
<!--    :probe-type="3"不加冒号统一变为字符串，就不是number类型-->
<!--    class="content"，scroll必须设置高度-->
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swipperImageLoad="swipperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl" />
      <Goods-List :goods="showGoods" class="goods-list"></Goods-List>
    </scroll>
<!--    vue2监听组件点击写法：@click.native="backClick",
        vue3监听组件好像不用写native-->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import HomeSwiper from '@/views/home/childComps/HomeSwiper'
  import RecommendView from '@/views/home/childComps/RecommendView'
  import FeatureView from '@/views/home/childComps/FeatureView'

  import NavBar from '@/components/common/navbar/NavBar'
  import TabControl from '@/components/content/tabControl/TabControl'
  import GoodsList from '@/components/content/goods/GoodsList'
  import Scroll from '@/components/common/scroll/Scroll'
  import BackTop from '@/components/content/backTop/BackTop'

  import {getHomeMultidata,getHomeGoods} from '@/network/home'

    export default {
        name: 'Home',
      components:{
        HomeSwiper,
        RecommendView,
        FeatureView,

        NavBar,
        TabControl,
        GoodsList,
        Scroll,
        BackTop
      },
        data() {
            return {
              banners:[],
              recommends:[],
              goods:{
                'pop':{page:0,list:[]},
                'new':{page:0,list:[]},
                'sell':{page:0,list:[]},
              },
              currentType:'pop',
              isShowBackTop:false,
              tabOffsetTop:0,
              isTabFixed:false,
              saveY:0
            }
        },
      computed:{
        showGoods(){
          return this.goods[this.currentType].list
        }
      },
      created() {
      //    生命周期，组件创建完就执行,调用dom节点需要使用mounted
      //  1、请求多个数据
       this.getHomeMultidata()
        //2、请求多个数据
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')
        // console.log(this.$refs.scroll);
      },
      //生命周期，实例销毁，keep-alive包裹的动态组件会被缓存
      destroyed(){

      },
      //在使用keep-alive标签中有效，每次进入都会执行钩子中的函数
      activated(){
          //后面是时间0
          this.$refs.scroll.scrollTo(0,this.saveY,10)
          this.$refs.scroll.scroll.refresh()
      },
      //离开组件时执行
      deactivated(){
          this.saveY=this.$refs.scroll.getScrollY()
      },
      methods:{
        //  事件监听方法
        tabClick(index){
          switch (index) {
            case 0:
              this.currentType='pop'
              break
            case 1:
              this.currentType='new'
              break
            case 2:
              this.currentType='sell'
              break
          }
         this.$refs.tabControl.currentIndex=index
          this.$refs.tabControl1.currentIndex=index;
          //有吸顶效果时，点击流行、新款、精选按钮时图片跳回第一行开始显示
          if(this.isTabFixed){
            this.$refs.scroll.scrollTo(0,-this.tabOffsetTop,10)
          }
        },
        //设置坐标（0,0）返回顶部
        backClick(){
          this.$refs.scroll.scrollTo(0,0)
        },
        //判断是否需要显示返回顶部的图片/组件
        contentScroll(position){
          //-position.y>800正确时，true
          this.isShowBackTop= -position.y>800
          // -position.y>800?this.isShowBackTop=true:this.isShowBackTop=false

        //  决定tabControl是否吸顶，滚动高度大于tabControl距离顶部高度时吸顶
          this.isTabFixed=(-position.y)>this.tabOffsetTop

        },
        //上拉加载
        loadMore(){
          // console.log("上拉加载");
          //再一次调用getHomeGoods，进行一次数据加载
          //this.currentType确定加载['流行','新款','精选']这三个里面哪一部分的内容
          this.getHomeGoods(this.currentType)
        },
        swipperImageLoad(){
          //  获取tabControl距离顶部的高度offsetTop
          //  等轮播图加载完调用的offsetTop比较准确
          //  $el用于获取组件中的元素
          this.tabOffsetTop=this.$refs.tabControl.$el.offsetTop
          // console.log(this.tabOffsetTop)
        },

        //  网路请求相关方法
        getHomeMultidata(){
          getHomeMultidata().then(res=>{
            // console.log(res);
            this.banners=res.data.banner.list;
            this.recommends=res.data.recommend.list;
          })
        },
        getHomeGoods(type){
          //取出当前页码，并加1，实现加载下一页，loadMore()方法实现加载更多
          const page=this.goods[type].page+1
          getHomeGoods(type,page).then(res=>{
            //不能采用直接赋值的方式，直接赋值会把之前的数据覆盖掉,
            // 错误代码：this.goods[type].list=res.data.list
            //将res.data.list中的元素解析出来一个一个放进this.goods[type].list
            this.goods[type].list.push(...res.data.list)
            this.goods[type].page+=1

            this.$refs.scroll.finishPullUp()
          })
        }
      }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #home{
    /*padding-top: 44px;*/
    position: relative;
    height: 100vh;
  }
.home-nav{
  /*base.css已设置好样式*/
  background-color:var(--color-tint);
  color: #ffffff;
/*Better Scroll滚动时nav-bar组件不会跟着滚动，不在滚动区域内，所以不需要position: fixed;*/
/*  原生浏览器滚动时才使用*/
/*  固定，不滚动*/
/*  position: fixed;*/
/*  left: 0;*/
/*  right: 0;*/
/*  top:0;*/
/*  z-index: 1111;*/
}
  /*Better Scroll导致此方法实现的吸顶效果不起作用,
  通过判断滚动高度大于tabControl距离顶部高度时使用position: fixed;实现的吸顶也会有bug*/
  /*.tab-control{*/
  /*  !*距离顶部44px的时候，停留该组件，很多浏览器不支持该属性*!*/
  /*  position: sticky;*/
  /*  top:44px;*/
  /*  z-index: 1111;*/
  /*}*/
  /*.fixed{*/
  /*  position: fixed;*/
  /*  left: 0;*/
  /*  right: 0;*/
  /*  top: 44px;*/
  /*}*/
  .tab{
    position: relative;
    z-index: 11111;
  }
  .goods-list{
    margin-bottom: 50px;
  }
  .content{
    /*height: 500px;*/
    /*overflow: hidden;除去溢出内容*/
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom:49px;
    left: 0;
    right: 0;
  }
</style>
