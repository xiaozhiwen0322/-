<template>
  <div class="header">
    <div class="l-section">
      <el-button @click="handerMenu" class="el-btn" icon="el-icon-menu" size="mini"></el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="item in breadList"
          :key="item.name"
          :to="{ path: item.path }"
        >{{item.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-section">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <img src="../assets/tu1.jpg" alt />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item command="cancel">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Cookie from "js-cookie";
export default {
  name: "MyHeader",
  computed: {
    // breadList() {
    //   return this.$store.state.menuListData;
    // }
    ...mapState({ breadList: "menuListData" })
  },
  methods: {
    handerMenu() {
      this.$store.commit("changeMenu");
    },
    handleCommand(command) {
      if (command === "cancel") {
        Cookie.remove("token");
        Cookie.remove("menuData");
        this.$router.push("/login");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  height: 60px;
  background-color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .l-section {
    display: flex;
    align-items: center;
    /deep/.el-breadcrumb__item {
      .el-breadcrumb__inner {
        font-weight: normal;
        &.is-link {
          color: #666;
        }
      }
      &:last-child {
        .el-breadcrumb__inner {
          color: #fff;
        }
      }
    }
    .el-btn {
      margin: 0 20px;
    }
    span {
      color: #fff;
      font-size: 14px;
      font-weight: 400;
    }
  }
  .r-section {
    img {
      height: 40px;
      width: 40px;
      border-radius: 50%;
      margin-right: 20px;
    }
  }
}
</style>