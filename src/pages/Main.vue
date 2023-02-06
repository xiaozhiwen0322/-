<template>
  <div>
    <el-container>
      <el-aside width="auto">
        <Menu></Menu>
      </el-aside>
      <el-container>
        <el-header>
          <common-header />
        </el-header>
        <tag />
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Menu from "../component/Menu";
import CommonHeader from "../component/Header";
import Tag from "../component/Tag";
export default {
  name: "MyMain",
  components: { Menu, CommonHeader, Tag }
};
</script>
<style lang="less" scoped>
.el-header {
  padding: 0;
}
</style>