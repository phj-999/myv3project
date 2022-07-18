<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" @click="addRole">添加角色</el-button>
      </el-form-item>
    </el-form>
    <!-- 用户数据展示的table -->
    <el-table :data="roleList" style="width: 100%">
      <el-table-column prop="roleId" label="ID" width="180" />
      <el-table-column prop="roleName" label="角色姓名" width="180" />
      <el-table-column prop="authority" label="角色权限操作">
        <template #default="scope">
          <el-button link size="small" @click="changeRoleauth(scope.row)"> 修改权限 </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue'
  import { storeToRefs } from 'pinia'
  // import { InitRoleData } from '@/types/view/role'
  import useStore from '@/store'

  const { rolesLists } = useStore()
  const { roleList } = storeToRefs(rolesLists)
  //添加角色
  const addRole = () => {}
  // 修改权限
  const changeRoleauth = (row: any) => {}
  // 初始数据
  const initdata = () => {
    rolesLists.getroleListsAction()
  }

  onMounted(() => {
    initdata()
  })
</script>

<style lang="scss" scoped></style>
