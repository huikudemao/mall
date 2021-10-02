<template>
    <div class="toast" v-show="isShow">
      <div >{{message}}</div>
    </div>
</template>

<script>
    export default {
        name: 'Toast',
        props:{
          // message:{
          //   type:String,
          //   default:''
          // },
          // isShow:{
          //   type: Boolean,
          //   default: false
          // }
        },
      data(){
          return{
             message:'',
             isShow:false
          }
      },
      methods:{
          show(message,duration=1500){
            this.isShow=true;
            this.message=message

            setTimeout(()=>{
              this.isShow=false
              this.message=''
            },duration)
          }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.toast{
  position: fixed;
  top: 50%;
  left: 50%;
  /* translate(-50%,-50%) 作用是，
  往上（x轴）,左（y轴）移动自身长宽的 50%，以使其居于中心位置。*/
  transform: translate(-50%,-50%);
  padding: 8px 10px;

  z-index: 99999;

  color: #ffffff;
  background-color: rgba(0,0,0,0.8);
  border-bottom-left-radius: 20px;
  border-top-left-radius: 20px;
  border-bottom-right-radius: 20px;
  border-top-right-radius: 20px;
}
</style>
