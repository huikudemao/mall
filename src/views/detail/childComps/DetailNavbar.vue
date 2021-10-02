<template>
    <div>
      <nav-bar>
        <div slot="left" class="back" @click="backClick">
          <img src="~assets/img/common/back.svg">
        </div>
        <div slot="center" class="titles">
          <div v-for="(item,index) in titles" :key="index"
               class="titles-item" :class="{active:index===currentIndex}" @click="titleClick(index)">
            {{item}}
          </div>
        </div>
      </nav-bar>
    </div>
</template>

<script>
  import NavBar from '@/components/common/navbar/NavBar'
    export default {
        name: 'DetailNavbar',
      components:{
        NavBar
      },
        data() {
            return {
              titles:['商品','参数','评论','推荐'],
              currentIndex:0
            }
        },
      methods:{
        titleClick(index){
          this.currentIndex=index
          this.$emit('titleClick',index)
        },
        backClick(){
          //this.$router.replace(/home)
          // this.$router.go(-1)
          this.$router.back()
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .titles{
    display: flex;
    flex-direction: row;
  }
  .titles-item{
    flex: 1;
  }
  .active{
    color: var(--color-high-text);
  }
  .back img{
    width: 17px;
    height: 17px;
    /*margin-top: 12px;*/
    /*position: relative;*/
    /*top:4px*/
    /*将此元素放在父元素的中间*/
    vertical-align:middle
  }
</style>
