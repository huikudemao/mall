<template>
    <div id="detail">
      <detail-navbar class="detail-nav" @titleClick="titleClick" ref="nav"/>
      <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
        <detail-swiper :top-images="topImages1"/>
        <detail-base-info :goods="goods"/>
        <detail-shop-info :shop="shop"/>
        <detail-good-info :detail-info="detailInfo" @imgLoad="imgLoad"/>
        <detail-param-info ref="params" :paramInfo="paramInfo"/>
        <detail-comment-info ref="comment" :commentInfo="commentInfo"/>
        <Goods-List ref="recommend" :goods="recommends" class="goods-list" />
      </scroll>
      <detail-bottom-bar @addCart="addToCart"/>
      <back-top @click.native="backClick" v-show="isShowBackTop"/>
    </div>
</template>

<script>
  import DetailNavbar from '@/views/detail/childComps/DetailNavbar'
  import DetailSwiper from '@/views/detail/childComps/DetailSwiper'
  import DetailBaseInfo from '@/views/detail/childComps/DetailBaseInfo'
  import DetailShopInfo from '@/views/detail/childComps/DetailShopInfo'
  import DetailGoodInfo from '@/views/detail/childComps/DetailGoodInfo'
  import DetailParamInfo from '@/views/detail/childComps/DetailParamInfo'
  import DetailCommentInfo from '@/views/detail/childComps/DetailCommentInfo'
  import GoodsList from '@/components/content/goods/GoodsList'
  import DetailBottomBar from '@/views/detail/childComps/DetailBottomBar'
  import BackTop from '@/components/content/backTop/BackTop'

  import Scroll from '@/components/common/scroll/Scroll'
  import {debounce} from '@/common/utils'
  import {getDetail,Goods,Shop,GoodsParams,getRecommend} from '@/network/detail'

  //映射vuex里面的actions
  import {mapActions} from 'vuex'

    export default {
        name: 'Detail',
      components:{
        DetailNavbar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodInfo,
        DetailParamInfo,
        DetailCommentInfo,
        GoodsList,
        DetailBottomBar,
        BackTop,
        Scroll,
      },
        data() {
            return {
                iid:null,
              topImages1:[],
              goods:{},
              shop:{},
              detailInfo:{},
              paramInfo:{},
              commentInfo:{},
              recommends:[],
              themeTopYs:[0,1000,2000,3000],
              getThemeTopY:null,
              isShowBackTop:false
            }
        },
      methods:{
          //映射actions里面的addCart函数
          ...mapActions(['addCart']),
        titleClick(index){
          this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],700)
        },
        //图片加载完后获取的回调方法
        imgLoad(){
              this.getThemeTopY()
        },
        //获取滚动位置
        contentScroll(position){
          // console.log(position);
          //获取y值
          const positionY= -position.y
        //  2、positionY和页面中的值作对比
        //  例[0,1000,2000,3000,Number.MAX_VALUE]
        //  positionY在0-1000之间，index=0
        //  positionY在1000-2000之间，index=1
        //   themeTopYs:[0,1000,2000,3000,],
          let length=this.themeTopYs.length
          for(let i=0;i<length-1;i++){
            if (this.currentIndex!==i &&
              (positionY >= this.themeTopYs[i] &&positionY <this.themeTopYs[i + 1])
            ) {
                this.currentIndex = i;
                this.$refs.nav.currentIndex = this.currentIndex;
              }
          }
          //-position.y>800正确时，true
          this.isShowBackTop= -position.y>800
        },
        //设置坐标（0,0）返回顶部
        backClick(){
          this.$refs.scroll.scrollTo(0,0)
        },
        addToCart() {
        //  获取商品信息
          const product={}
          product.image=this.topImages1[0]
          product.title=this.goods.title
          product.desc=this.goods.desc
          product.price=this.goods.realPrice
          product.iid=this.iid

        //  将商品添加到购物车
        //  mutations写法,commit
        //   this.$store.commit('addCart',product)
        //  调用actions中的addCart函数
        //   this.$store.dispatch('addCart',product).then(res=>{
        //     console.log(res);
        //   })
        //映射actions之后的写法
          this.addCart(product).then(res=>{
            // console.log(res);
            this.$toast.show(res,1500)
            //  定时器
          //   this.show=true;
            // this.message=res
          //   setTimeout(()=>{
          //     this.show=false;
          //     this.message=''
          //   },1500)
          })
        }
      },
      updated(){

      },
      created() {
          //路由index.js设置参数id，GoodsListItem.vue传入具体id值并跳转到当前组件
          this.iid=this.$route.params.id

        getDetail(this.iid).then(res=>{
          // console.log(res);
        //  1、顶部轮播图数据
          const data=res.result
          this.topImages1=data.itemInfo.topImages

        //  2、获取商品信息
        // 调用detail.js中的类Goods,Goods进行了数据整合，例：传入data.itemInfo
          // 则this.title=itemInfo.title变成this.title=data.itemInfo.title，然后直接使用this.goods.title
          this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)

        //  3、创建店铺信息
          this.shop=new Shop(data.shopInfo)

        //  4、获取商品的详情数据
          this.detailInfo=data.detailInfo

        //  5、参数信息展示
          this.paramInfo=new GoodsParams(data.itemParams.info,data.itemParams.rule)

        //  6、评论信息
          if(data.rate.cRate!=0) {
            this.commentInfo=data.rate.list[0]
          }
        //  7、请求推荐数据
          getRecommend().then(res=>{
            this.recommends=res.data.list
          })

          this.getThemeTopY=debounce(()=>{
            this.themeTopYs=[]
            this.themeTopYs.push(0)
            this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44)
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
            //滚动内容显示对应标题在if语句中需要用到
            this.themeTopYs.push(Number.MAX_VALUE)
            // console.log(this.themeTopYs);
          },100)

        })
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#detail{
  position: relative;
  z-index: 1111;
  background-color: #ffffff;
  height: 100vh;
}
  .content{
    height: calc(100% - 44px - 49px);
  }
  .detail-nav{
    position: relative;
    z-index: 1111;
    background-color: #ffffff;
  }
.goods-list{
  margin-bottom: 50px;
}
</style>
