<template>
  <div class="home">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">Processing Center</el-menu-item>
      <el-sub-menu index="2">
        <template #title>Workspace</template>
        <el-menu-item index="2-1">item one</el-menu-item>
        <el-menu-item index="2-2">item two</el-menu-item>
        <el-menu-item index="2-3">item three</el-menu-item>
        <el-sub-menu index="2-4">
          <template #title>item four</template>
          <el-menu-item index="2-4-1">item one</el-menu-item>
          <el-menu-item index="2-4-2">item two</el-menu-item>
          <el-menu-item index="2-4-3">item three</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="3" disabled>Info</el-menu-item>
      <el-menu-item index="4">Orders</el-menu-item>
    </el-menu>
    <div>
      <el-col :span="12">
        <img alt="welcome" :src="imgUrl" width="700" />
      </el-col>
      <el-col :span="12">
        <div style="font-size: 100px; margin-top: 175px; margin-left: 175px">
          欢迎来到<br />少儿编程
        </div>
        <el-button
          round
          @click="change()"
          size="large"
          style="margin-top: 30px; margin-left: 150px"
          >切换</el-button
        >
      </el-col>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      activeIndex: "1",
      flag: true,
      imgUrl: "/1.png",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    change() {
      axios
        .get("/change", {
          params: {
            flag: this.flag,
          },
        })
        .then((resp) => {
          this.imgUrl = resp.data;
          this.flag = !this.flag;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
