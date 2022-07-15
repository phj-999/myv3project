<template>
  <div class="login-box">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <h2>后台管理系统</h2>
      <el-form-item label="账号" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off" />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
      </el-form-item>

      <el-form-item>
        <el-button class="loginBtn" type="primary" @click="submitForm(ruleFormRef)"
          >Login</el-button
        >
        <el-button class="loginBtn" @click="resetForm(ruleFormRef)">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import type { FormInstance } from 'element-plus'
  import { LoginFormInt } from '@/types/login/login'
  import useStore from '@/store'
  import { useRouter } from 'vue-router'

  const ruleFormRef = ref<FormInstance>()
  //用户名和密码
  const ruleForm = reactive<LoginFormInt>({
    username: '',
    password: ''
  })
  //校验规则
  const rules = reactive({
    username: [
      {
        required: true,
        message: '请输入用户名',
        trigger: 'blur'
      },
      {
        min: 3,
        max: 5,
        message: '用户名长度在3-5',
        trigger: 'blur'
      }
    ],
    password: [
      {
        required: true,
        message: '请输入密码',
        trigger: 'blur'
      },
      {
        min: 3,
        max: 10,
        message: '用户名密码在3-10',
        trigger: 'blur'
      }
    ]
  })

  const { user } = useStore()
  const router = useRouter()

  const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
      if (valid) {
        console.log('submit!')
        user.loginAction(ruleForm)
        router.push('/')
      } else {
        console.log('error submit!')
        return false
      }
    })
    console.log(formEl, 'formEl')
  }

  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';
  .login-box {
    width: 100%;
    height: 100%;
    /* background: url('@/assets/'); */
    padding: 1px;
    text-align: center;
    h2 {
      margin-bottom: 10px;
    }

    .demo-ruleForm {
      width: 500px;
      margin: 200px auto;
      background-color: $orange;
      padding: 40px;
      border-radius: 20px;
    }
    .loginBtn {
      width: 48%;
    }
  }
</style>
