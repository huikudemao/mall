<template>
<!--  ref可以明确拿到某个子组件，普通元素也可以使用-->
    <div class="wrapper" ref="wrapper">
<!--  better-scroll写法要求，里面只能有一个元素，
      但这个元素里面可以有多个元素    -->
      <div class="content">
        <slot></slot>
      </div>
    </div>
</template>

<script>
  import BScroll from '@better-scroll/core'
  import PullUp from '@better-scroll/pull-up'
  import ObserveDOM from '@better-scroll/observe-dom'
  import ObserveImage from '@better-scroll/observe-image'

  BScroll.use(PullUp)
  BScroll.use(ObserveDOM)
  BScroll.use(ObserveImage)

    export default {
        name: 'Scroll',
        data() {
            return {
                scroll:null
            }
        },
      props:{
          probeType: {
            type:Number,
            default:0
          },
        pullUpLoad:{
            type: Boolean,
          default: false
        }
      },
      mounted(){
          this.scroll=new BScroll(this.$refs.wrapper,{
            observeDOM: true,
            click:true,
            probeType:this.probeType,
            //pullUpLoad触发上拉事件的阈值，只触发一次
            //this.scroll.finishPullUp()实现再次触发
            pullUpLoad: this.pullUpLoad,
            observeImage: true
          })

        if(this.probeType==2||this.probeType==3){
          //on作用：监听当前实例上的钩子函数。'scroll'监听滚动位置，需要将probeType设置为3或2才有用
          this.scroll.on('scroll',(position)=>{
            //传值，子传父，自定义scroll事件
            this.$emit('scroll',position)
          })
        }

       if(this.pullUpLoad){
         this.scroll.on('pullingUp',()=>{
           // console.log('上拉加载更多')
           this.$emit('pullingUp')
         })
       }
      },
      methods:{
          //time=500为设置一个默认值
          scrollTo(x,y,time=500){
            //先执行this.scroll会不会出错再执行this.scroll.scrollTo(x,y,time)
            this.scroll&&this.scroll.scrollTo(x,y,time)
          },
        //再次触发上拉事件
        //在getHomeGoods方法中有调用finishPullUp()
        finishPullUp(){
          this.scroll.finishPullUp()
        },
        getScrollY(){
            return this.scroll?this.scroll.y:0
        },
        refresh(){
            this.scroll.refresh()
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
