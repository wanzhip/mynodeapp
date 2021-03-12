<template>
  <div class="login" v-loading="loading">
    <div class="main">
      <div class="top spaceBet">
        <div class="left ml_2"></div>
        <div class="flex_row">
          <div class="back mr_2">没有账号，前去注册</div>
          <!-- <div class="back mr_2">|</div> -->
          <!-- <div class="back mr_2">
            <a
              href="#"
              style="color: #fff; text-decoration: none"
              >返回网站首页</a
            >
          </div> -->
        </div>
      </div>
      <div class="flex_row">
        <div class="logo"></div>
        <div class="stu">
          <div class="stuLogin">登录</div>
          <div>
            <el-input
              placeholder="请输入学号"
              v-model="num"
              style="width: 340px"
              class="mt_2"
            ></el-input>
            <el-input
              placeholder="请输入姓名"
              v-model="name"
              style="width: 340px"
              class="mt_2"
            ></el-input>
          </div>
          <div style="margin-top:10px">
            <el-checkbox v-model="checked">记住密码</el-checkbox>
          </div>
          <div>
            <el-button
              type="primary"
              size="medium"
              style="width: 340px"
              class="mt_2"
              @click="login"
              >登录</el-button
            >
          </div>
        </div>
      </div>
    </div>
    <div class="myRight">
      <div style="text-align: center">
        <span>2021</span>
        <span class="ml_2">All Rights Reserved</span>
      </div>
    </div>
  </div>
</template>


<script>
import { _axios } from "@/api/index";
export default {
  data() {
    return {
      loading: false,
      num: "",
      name: "",
      checked: false,
    };
  },
  methods: {
    login() {
      this.loading = true;
      _axios('/login',{
            name:this.name,
            num:this.num,
          },'post').then(res=>{
            console.log(res,'111');
            if(res.code == 0){
              this.$message.success(res.msg)
              this.$router.push({
                name:'Home'
              })
            }else{
              this.$message.error(res.msg)
            }
            this.loading = false;
          })
    },
  },
};
</script>


<style lang="scss" scoped>
.mr_2{
  margin-right: 20px;
}
.flex_row {
  display: flex;
  flex-direction: row;
}
.spaceBet {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.validateCode {
  width: 1150px;
  height: 390px;
  margin-left: 5px;
  display: block;
  width: 1px solid;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid #f40;
}
.myRight {
  width: 450px;
  top: 50%;
  left: 50%;
  position: relative;
  margin-left: -220px;
  margin-top: 40px;
}
.logo {
  width: 500px;
  height: 260px;
  margin: 100px 0 0 20px;
  background: url(../assets/logo.png) no-repeat;
}
.forget {
  margin-right: 40px;
  cursor: pointer;
  &:hover {
    color: #409eff;
  }
}
.stu {
  width: 449px;
  box-sizing: border-box;
  padding: 20px;
}
.stuLogin {
  font-size: 30px;
  font-weight: bold;
  margin: 30px 0;
}
.back {
  color: #fff;
  &:last-child {
    cursor: pointer;
  }
}
.login {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: #f4f4f4 url(../assets/loginbg.png) no-repeat;
  background-size: 100% 100%;
  .main {
    width: 900px;
    height: 540px;
    // border: 1px solid #ccc;
    border-radius: 15px;
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.3);
    top: 50%;
    left: 50%;
    margin-left: -450px;
    margin-top: -270px;
    position: relative;
    .top {
      height: 90px;
      line-height: 90px;
      background-color: #4281ff;
      .left {
        font-size: 30px;
        font-weight: bold;
        color: #fff;
      }
    }
  }
}
.mt_2{
  margin-top: 20px;
}
</style>