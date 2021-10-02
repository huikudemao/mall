<template>
    <div class="cate-right">
      <div v-for="(item,index) in cateRight1" :key="index" class="content">
        <a :href="item.link">
          <img :src="item.image"><br/>
          <span>{{item.title}}</span>
        </a>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'CateRight',
      props:{
        cateRight1:{
          type:Array,
          default(){
            return []
          }
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .cate-right{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .content{
     flex: 1;
    text-align: center;
     margin: 10px 10px;
  }
  .content img{
    height: 59px;
  }
  .content span{
    display: inline-block;
    font-size: 14px;
    width: 60px;
  }
</style>
