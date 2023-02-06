<template>
  <div class="tag-group">
    <el-tag
      v-for="(item,index) in menuTag"
      :key="item.label"
      :closable="item.name !== 'home'"
      :effect="item.name === $route.name ? 'dark' :'plain'"
      @click="changeTag(item)"
      @close="closeTag(item,index)"
      size="small"
    >{{ item.label }}</el-tag>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "MyTag",
  computed: {
    ...mapState({ menuTag: "menuListData" })
  },
  methods: {
    changeTag(item) {
      this.$router.push({ name: item.name });
    },
    closeTag(item, index) {
      this.$store.commit("delTag", item);
      const length = this.menuTag.length;
      if (item.name !== this.$route.name) {
        return;
      } else if (index == length) {
        this.$router.push({ name: this.menuTag[index - 1].name });
      } else {
        this.$router.push({ name: this.menuTag[index].name });
      }
      //   console.log(index, length);
    }
  }
};
</script>

<style lang="less" scoped>
.tag-group {
  padding: 20px;
  .el-tag {
    cursor: pointer;
    margin-right: 10px;
  }
}
</style>