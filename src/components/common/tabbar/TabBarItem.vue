<template>
    <div class="tab-bar-item" @click="itemClick">
      <!--      直接在slot上绑定类，无效-->
      <div v-if="!isActive"><slot name="item-icon"></slot></div>
      <div v-else><slot name="item-icon-action"></slot></div>
      <div :style="activeStyle"><slot name="item-text"></slot></div>
    </div>
</template>

<script>
    export default {
        name: 'TabBarItem',
      props:{
        path:String,
        activeColor:{
          type:String,
          //默认值为黄色
          default:'yellow'
        }
      },
        data() {
            return {
                // isActive:true
            }
        },
      computed:{
        isActive(){
          // return this.$router.path.indexOf(this.path)!== -1
          return this.$route.path.includes(this.path)
        },
        activeStyle(){
          return this.isActive?{color:this.activeColor}:{}
        }
      },
      methods:{
        itemClick(){
          //路由跳转
          //返回按钮有效
          //this.$router.push()
          //replace返回按钮无效
          this.$router.replace(this.path)
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    /*tabbar高度一般都为49px*/
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
</style>
