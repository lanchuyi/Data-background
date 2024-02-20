<template>
    <div class="login-page">
      <el-card class="el-card">
        <template #header>黑马面经运营后台</template>
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item label="用户名："  prop="username">
            <el-input placeholder="请输入用户名" v-model="form.username"/>
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-input placeholder="请输入密码：" v-model="form.password"/>
          </el-form-item>
          <el-form-item>
            <el-button @click="login" type="primary">登 录</el-button>
            <el-button @click="remove">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </template>

<script>
// import { loginAPI } from '@/api/user'
export default {
  name: 'login-page',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: ['blur', 'change'] },
          { min: 5, max: 11, message: '长度在 5 到 11 个字符', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
          { pattern: /^\w{5,11}$/, message: '请输入 5 到 10 位的密码', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.form.validate(async valid => {
        if (!valid) return
        await this.$store.dispatch('user/loginActions', this.form)
        this.$message.success('恭喜登录成功')
        this.$router.push('/')
      })
    },
    remove () {
      this.$refs.form.resetFields()
    }
  }
}
</script>
<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background: url(@/assets/login-bg.svg) no-repeat center / cover;
  display: flex;
  align-items: center;
  justify-content: center;
  .el-card {
    width: 420px;
    ::v-deep .el-card__header{
      height: 80px;
      background: rgba(114,124,245,1);
      text-align: center;
      line-height: 40px;
      color: #fff;
      font-size: 18px;
    }
  }
  .el-form {
    padding: 0 20px;
  }
}
</style>
