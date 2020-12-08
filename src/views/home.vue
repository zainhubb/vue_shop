<template>
  <el-container class="home-container">
    <!-- 侧边栏 -->
    <el-aside :width="iscollapse ? '60px' : '200px'">
      <div class="logo">
        <router-link to="home">
          <img src="../assets/logo/logo2.png" />
          <span
            :style="
              iscollapse ? { display: 'none' } : { display: 'inline-block' }
            "
            >Vue-Shop</span
          >
        </router-link>
      </div>
      <el-menu
        class="el-menu-vertical-demo"
        text-color="black"
        active-text-color="#409EFF"
        :unique-opened="true"
        :collapse="iscollapse"
        :collapse-transition="false"
        :router="true"
        :default-active="$route.path"
      >
        <!-- 一级菜单 -->
        <el-submenu
          v-for="item in menulist"
          :key="item.id"
          :index="item.id + ''"
        >
          <!-- 一级菜单的模板区域 -->
          <template slot="title">
            <!-- 图像 -->
            <i :class="iconObj[item.id]" class="iconfont"></i>
            <!-- 文字 -->
            <span>{{ item.authName }}</span>
          </template>
          <!-- 二级菜单 -->
          <el-menu-item
            v-for="subitem in item.children"
            :key="subitem.id"
            :index="'/' + subitem.path"
          >
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图像 -->
              <i class="el-icon-menu"></i>
              <!-- 文字 -->
              <span>{{ subitem.authName }}</span>
            </template>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div class="toggle-btn" @click="collapse">
          <i
            :class="iscollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
            style="line-height: 60px"
          ></i>
        </div>
        <div style="float: right">
          <el-button type="info" round @click="logout">退出登录</el-button>
        </div>
      </el-header>
      <el-main>
        <!-- 显示子组件 -->
        <transition name="fade-transform" mode="out-in">
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getmenulist_api } from "../api/home_api";
export default {
  data() {
    return {
      menulist: [],
      // 侧边栏数据
      iconObj: {
        125: "iconfont icon-users",
        103: "iconfont icon-tijikongjian",
        101: "iconfont icon-shangpin",
        102: "iconfont icon-danju",
        145: "iconfont icon-baobiao",
      },
      iscollapse: false,
    };
  },
  created() {
    this.getMenulist();
  },
  methods: {
    logout() {
      window.localStorage.removeItem("token"); //清除token
      this.$router.push("/login"); //跳转至登录页面
    },
    // async getMenulist() {

    //   const { data: res } = await this.$http("menus");

    //   console.log(res);

    //   if (res.meta.status !== 200)
    //     return this.$message.error(res.meta.msg);
    //   this.menulist = res.data;
    // },
    getMenulist() {
      getmenulist_api().then((res) => {
        if (res.data.meta.status !== 200) {
          this.$router.push("/login");
          return this.$message.error(res.data.meta.msg);
        }
        this.menulist = res.data.data;
        this.$notify({
          title: "登录成功!",
          message: "欢迎来到本后台管理系统",
          type: "success",
          offset: 80,
          position: "bottom-right",
          duration: 2000,
        });
      });
    },
    collapse() {
      this.iscollapse = !this.iscollapse;
    },
  },
};
</script>

<style lang="less" scoped>
.el-header {
  color: #333;
  line-height: 60px;
  box-shadow: 0 2px 4px rgba(0, 21, 41, 0.08);
  z-index: 10;
}

.el-aside {
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.15);
  z-index: 10;
  .el-menu {
    border-top: 2px solid #f8f8f8;
    border-right: 5px;
  }
}

.el-main {
  background-color: rgb(245, 246, 247);
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}

.home-container {
  height: 100%;
}
.logo {
  text-align: center;
  height: 60px;
  line-height: 60px;
  img {
    height: 65%;
    display: inline-block;
    margin-top: 10px;
    vertical-align: -10px;
  }
  span {
    font-size: 22px;
    font-family: serif;
    color: #333;
    margin-left: 15px;
  }
}
.iconfont {
  margin-right: 10px;
}
.toggle-btn {
  float: left;
  cursor: pointer;
  margin-right: 30px;
  i {
    font-size: 20px;
    color: #909399;
  }
}
.collapse {
  color: white;
  text-align: center;
}

/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>