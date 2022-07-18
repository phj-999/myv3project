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
          <el-option :key="0" label="全部" :value="0" />
          <el-option
            v-for="item in userdata.roleList"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 用户数据展示的table -->
    <el-table :data="userdata.list" style="width: 100%">
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="nickName" label="姓名" width="180" />
      <el-table-column prop="role" label="用户角色">
        <template #default="scope">
          <el-button
            v-for="item in scope.row.role"
            :key="item.role"
            link
            size="small"
            @click="deleteRow(scope.row)"
          >
            {{ item.roleName }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="role" label="操作">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="edit(scope.row)"> 编辑 </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <!-- 编辑用户的弹出窗-->
  <el-dialog v-model="userdata.isShow" title="编辑用户信息">
    <el-form :model="userdata.active">
      <el-form-item label="用户昵称" label-width="120px">
        <el-input v-model="userdata.active.nickName" autocomplete="off" />
      </el-form-item>

      <el-form-item label="用户角色" label-width="120px">
        <el-select
          v-model="userdata.active.role"
          multiple
          class="m-2"
          size="large"
          placeholder="请选择角色"
        >
          <el-option
            v-for="item in userdata.roleList"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="updateUser">修改</el-button>
        <el-button @click="dialogFormVisible = false">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { onMounted, reactive, ref, watch } from 'vue'
  import { storeToRefs } from 'pinia'
  import { InitData } from '@/types/view/userstype'
  import useStore from '@/store'
  import { userListInit } from '@/types/view/userstype'

  const userdata = reactive(new InitData())
  const { user } = useStore()
  const { userList, roleList } = storeToRefs(user)
  const dialogFormVisible = ref(false)

  const onSubmit = () => {
    let searchRes: userListInit[] = [] //用来接收查询后展示的数据
    if (userdata.selectedData.nickName || userdata.selectedData.role) {
      //过滤
      if (userdata.selectedData.nickName) {
        // 将过滤出的数组赋值给arr
        searchRes = userdata.list.filter((v) => {
          return v.nickName.indexOf(userdata.selectedData.nickName) !== -1
        })
      }
      if (userdata.selectedData.role) {
        // 将过滤出的数组赋值给arr
        searchRes = userdata.selectedData.nickName ? searchRes : userdata.list
        searchRes = searchRes.filter((v) => {
          return v.role.find((item) => {
            item.role === userdata.selectedData.role
          })
        })
      }
    } else {
      searchRes = userdata.list
    }
    userdata.list = searchRes
  }

  // 编辑
  const edit = (row: userListInit) => {
    console.log(row)
    userdata.isShow = true
    userdata.active = {
      id: row.id,
      nickName: row.nickName,
      userName: row.userName,
      role: row.role.map((v) => v.role)
    }
  }

  //弹出框的修改
  const updateUser = () => {
    let obj: any = userdata.list.find((v) => {
      v.id = userdata.active.id
    })
    obj.nickName = userdata.active.nickName
    obj.role = userdata.roleList.filter((item) => {
      userdata.active.role.indexOf(item.roleId) !== -1
    })
    userdata.list.forEach((item, index) => {
      if (item.id == obj.id) {
        userdata.list[index] = obj
      }
    })
    userdata.isShow = false
  }

  const deleteRow = (row: any) => {
    console.log(row)
  }

  //网络请求拿到数
  onMounted(() => {
    user.getuserListAction()
    user.getroleListAction()
    userdata.list = userList.value
    userdata.roleList = roleList.value
    console.log(userdata.list, 'userdata.list')
  })

  watch([() => userdata.selectedData.nickName, () => userdata.selectedData.role], () => {
    if (userdata.selectedData.nickName == '' || userdata.selectedData.role == 0) {
      user.getuserListAction()
      user.getroleListAction()
      userdata.list = userList.value
      userdata.roleList = roleList.value
    }
  })
</script>

<style lang="scss" scoped></style>
