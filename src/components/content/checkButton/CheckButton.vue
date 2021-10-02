<template>
    <div class="check-button" :class="{check:isChecked}">
      <img src="~assets/img/cart/tick.svg">
    </div>
</template>

<script>
    export default {
        name: 'CheckButton',
        props:{
          isChecked:{
            type:Boolean,
            default:false
          }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .check-button{
    border-radius: 50%;
    border: 2px solid #aaa;
  }
  .check{
    border-color: red;
    background-color: #ff5777;
  }
</style>
