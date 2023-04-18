<script>
export default {
  name: "welcome",
  props: ["msg"],
};
</script>

<template>
  <h1>欢迎来到主界面{{ msg }}</h1>
  <!-- <el-button>去登录</el-button> -->
  <router-link to="/login">去登录</router-link>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
