<template>
  <div>
    <el-form :inline="true" :model="userdata.selectedData" class="demo-form-inline">
      <!-- 姓名 -->
      <el-form-item label="姓名">
        <el-input v-model="userdata.selectedData.nickName" placeholder="请输入姓名" />
      </el-form-item>
      <!-- 角色 -->
      <el-form-item label="角色">
        <el-select
          v-model="userdata.selectedData.role"
          class="m-2"
          placeholder="请选择"
          size="large"
        >
          <!-- <el-option 
            
          /> -->
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 数据展示的table -->
    <!-- <el-table :data="formList.comList" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="title" label="标题" width="180" />
      <el-table-column prop="introduce" label="详情" />
    </el-table> -->
  </div>
</template>

<script setup lang="ts">
  import { onMounted, reactive } from 'vue'
  import { storeToRefs } from 'pinia'
  import { InitData } from '@/types/view/userstype'
  import useStore from '@/store'

  const userdata = reactive(new InitData())
  const { user } = useStore()
  const { userList } = storeToRefs(user)

  onMounted(() => {
    user.getuserListAction()
    console.log(userList, 'userlist')
  })
</script>

<style lang="scss" scoped></style>
