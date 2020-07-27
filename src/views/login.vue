<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo/logo1.png" alt />
      </div>
      <!-- 登录框 -->
      <el-form class="login_form" :model="loginForm" :rules="loginRules" ref="loginFormRef">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="账号" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="密码"
            prefix-icon="iconfont icon-3702mima"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login" round>登录</el-button>
          <el-button type="warning" @click="resetForm" round>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123456",
      },
      loginRules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    resetForm() {
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.$refs.loginFormRef.validate(async (res) => {
        if (!res) return;
        const { data: result } = await this.$http.post("login", this.loginForm);
        //把取得的对象中data对象给result
        if (result.meta.status !== 200)
          return this.$notify({
            title:'登录失败!',
            message:'请检查用户名和密码',
            type:'error',
            offset: 80,
            position: 'bottom-right',
            duration: 2000
          })
        this.$notify({
          title: '登录成功!',
          message: '欢迎来到本后台管理系统',
          type: 'success',
          offset: 80,
          position: 'bottom-right',
          duration: 2000
        });
        window.sessionStorage.setItem("token", result.data.token);
        //登录成功,存放token
        this.$router.push("/home");
        //登录后跳转到home页面
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login_container {
  background: white;
  background-size: cover;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
    background: rgba(255, 255, 255, 0.212);
  border-radius: 15px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  // background: inherit;
  box-shadow: inset 0 0 0 150px rgba(255, 255, 255, 0.25);
}
.avatar_box {
  height: 100px;
  width: 100px;
  border-radius: 50%;
  padding: 5px;
  background-color: #eee;
  // border: 1px solid #eee;
  box-shadow: 0 0 8px #eee;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    background-color: rgb(206, 206, 206);
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 30px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: space-between;
}
</style>