<template>
  <div class="login_container">
    <div class="login_box">
      <div class="login_logo">
        <img src="@/assets/logo.png" alt />
      </div>
      <el-form  ref="loginRef" :rules="rules" class="login_form" :label-position="labelPosition" label-width="0px" :model="user">
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user-solid" v-model="user.username" ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-lock" v-model="user.password" show-password></el-input>
        </el-form-item>
        <el-form-item class="login_action">
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
      <div class="login_forget">
        <el-button type="text">忘记密码?</el-button>
        <el-button type="text" @click="resetForm">注册</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { login } from '@/api/user.js'
  import { TOKEN } from "@/constant/Constant";

  export default {
  data(){
    return {
      labelPosition: 'right',
      user: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入账户名', trigger: 'blur' },
          { min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    //重置表单数据
    resetForm(){
      //表单重置
      this.$refs.loginRef.resetFields()
    },
    //登录时表单验证
    login(){
      this.$refs.loginRef.validate(async valid => {
          if(valid){
            //验证通过可以登录
            login(this.user)
            .then(val => {
              let data = val.data
              if(data.data){
                //说明登录成功

                //保存到sessionStorage
                let token = data.data.token
                sessionStorage.setItem(TOKEN,token)
                this.$message.success("登陆成功")
                this.$router.push("/home")
              }else{
                alert(data.meta.msg)
              }
            })
            .catch(error => {
              console.log(error)
            })
          }else{

          }
      })
    }
  }
};
</script>
<style lang="less" scoped>

.login_container {
  background-color: @main;
  height: 100%;
  width: 100%;

  .login_box {
    margin-top: 150px;
    background-color: @white;
    width: 450px;
    height: auto;
    padding-bottom: 10px;
    .borderRadius(@radius: 5px);
    .ch;

    .login_form {
      margin-top: 150px;
      margin-right: 30px;
      margin-left: 30px;
      .login_action {
        margin-top: 20px;
        display: flex;
        justify-content: flex-end;
        margin-bottom: 10px;
      }
    }

    .login_forget {
      display: flex;
      justify-content: center;
    }

    .login_logo {
      padding: 20px;
      width: 100px;
      height: 100px;
      background-color: @white;
      box-shadow: 0 0 10px #aaa;
      .borderRadius(@radius: 50%);
      .ch;
      margin-top: -65px;

      img {
        width: 100%;
        height: 100%;
        background-color: #eee;
        .borderRadius(@radius: 50%);
      }
    }
  }
}
</style>
