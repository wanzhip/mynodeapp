<template>
  <div >
    <div class="center">
      <div>
        <label for="姓名"></label>
        <el-input v-model="name" placeholder="请输入姓名"></el-input>
        <el-input v-model="num" placeholder="请输入学号"></el-input>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name:'',
      num:''
    }
  }
}
</script>

<style lang="scss" scoped>
.center{
  width: 600px;
  height: 500px;
  background: rgba(f, f, f,0.5);
}
  
</style>