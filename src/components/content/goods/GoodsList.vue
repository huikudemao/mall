<template>
    <div class="goods">
      <goods-list-item v-for="(item,index) in goods" :key="index" :goods-item="item"/>
    </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem'
    export default {
      name: 'GoodsList',
      components:{
        GoodsListItem
      },
      props:{
          goods: {
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
.goods{
  display: flex;
  /*根据宽度进行换行*/
  flex-wrap: wrap;
  justify-content: space-around;
  /*align-items: center;*/
}

</style>
