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
      <div style="display:flex;">
        <div @click="loginOut" style="padding: 5px 10px; cursor: pointer">
          退出
        </div>
        <div @click="goBlog" style="padding: 5px 10px; cursor: pointer">
          博客
        </div>
      </div>
    </div>
    <div>
      123
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
        },
        {
          name: "地区",
          path: "/area",
        },
      ],
    };
  },
  methods: {
    goUrl(item, index) {
      this.defaulst = index;
      console.log(item.path);
      this.$router.push({
        path: item.path,
      });
    },
    loginOut() {
      console.log("退出");
      this.$router.push({
        name: "login",
      });
    },
    goBlog() {
      console.log("博客");
      this.$router.push({
        name: "blog",
      });
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
.spaceBet {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>