<template>
  <div class="main">
    <div class="spaceBet">
      <div style="margin-bottom: 20px">
        <el-button
          size="medium"
          v-for="(item, index) in menus"
          :key="item.name"
          :class="[defaulst == index ? active : '']"
          @click="goUrl(item, index)"
          >{{ item.name }}</el-button
        >
      </div>
      <div><a href="#" @click="loginOut" style="padding:5px 10px">退出</a></div>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: "active",
      defaulst: 0,
      menus: [
        {
          name: "用户",
          path: "/home",
          component: "@/views/Home",
        },
        {
          name: "地区",
          path: "/area",
          component: "@/views/Area",
        },
      ],
    };
  },
  methods: {
    goUrl(item, index) {
      this.defaulst = index;
      this.$router.push({
        path: item.path,
      });
    },
    loginOut(){
      console.log('退出');
      this.$router.push({
        name:'login'
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  box-sizing: border-box;
  margin: 20px;
}
.active {
  background-color: #409eff;
  color: #fff;
}
.spaceBet{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>