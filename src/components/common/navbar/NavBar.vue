<template>
    <div class="nav-bar">
      <div class="left"><slot name="left"></slot></div>
      <div class="center"><slot name="center"></slot></div>
      <div class="right"><slot name="right"></slot></div>
    </div>
</template>

<script>
    export default {
        name: 'NavBar',
        data() {
            return {
                msg: ''
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav-bar{
  display: flex;
  line-height: 44px;
  text-align: center;
/*  阴影*/
  box-shadow: 0 1px 1px rgba(100,100,100,0.1);
}
  .left,.right{
    width: 60px;
    /*border:1px solid #ff5777;*/
  }
  .center{
    flex: 1;
    /*border: 1px solid yellow;*/
  }
</style>
