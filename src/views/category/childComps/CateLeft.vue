<template>
    <div class="cate-left">
        <div v-for="(item,index) in cateData" :key="index"
             class="cate-item" @click="itemClick(item.maitKey,index)" :class="{active:index===itemIndex}">
          {{item.title}}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'CateLeft',
        data() {
            return {
                title:[],
              itemIndex:0
            }
        },
      props:{
        cateData:{
          type:Array,
          default(){
            return []
          }
        }
      },
      // created() {
      //   console.log(this.cateData);
      // },
      methods:{
        itemClick(maitKey,index){
          this.itemIndex=index
          //子传父
          this.$emit('leftClick',maitKey)
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .cate-left{
    display: flex;
    flex-direction: column;
  }
  .cate-item{
    height: 37px;
    text-align: center;
    line-height: 37px;
  }
  .active{
    border-left: 3px solid var(--color-tint);
    background-color: #ffffff;
    color: var(--color-tint);
  }

</style>
