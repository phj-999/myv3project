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
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { ListInt } from '@/types/view/role'
  import useStore from '@/store'
  import { useRouter } from 'vue-router'

  const { rolesLists } = useStore()
  const { roleList } = storeToRefs(rolesLists)
  const router = useRouter()

  //添加角色
  const addRole = () => {
    ElMessageBox.prompt('请输入角色名称', '添加', {
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    })
      .then(({ value }) => {
        if (value) {
          rolesLists.$patch((state) => {
            state.roleList.push({
              roleId: state.roleList.length + 1,
              roleName: value,
              authority: []
            })
          })
        }
        ElMessage({
          type: 'success',
          message: `角色${value}添加成功`
        })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '操作取消'
        })
      })
  }
  // 修改权限
  const changeRoleauth = (row: ListInt) => {
    router.push({
      name: 'authority',
      params: {
        id: row.roleId,
        authority: row.authority
      }
    })
  }
  // 初始数据
  const initdata = () => {
    rolesLists.getroleListsAction()
  }

  onMounted(() => {
    initdata()
  })
</script>

<style lang="scss" scoped></style>
