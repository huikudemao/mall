<template>
    <div id="tab-bar">
      <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'TabBar',
        data() {
            return {
                msg: ''
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #tab-bar{
    display: flex;
    background-color: #f6f6f6;
    /*生成绝对定位的元素，相对于浏览器窗口进行定位。*/
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    /*阴影  阴影水平偏移值（可取正负值）；阴影垂直偏移值（可取正负值）；阴影边框；阴影模糊值；阴影颜色*/
    box-shadow: 0px -3px 1px -2px rgba(100,100,100,0.1);
  }

</style>
