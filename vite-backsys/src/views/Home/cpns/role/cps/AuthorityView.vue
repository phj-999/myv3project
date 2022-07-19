<template>
  <div>
    <el-tree
      ref="treeRef"
      :data="authoritydata.authorityList"
      show-checkbox
      node-key="roleId"
      :check-strictly="true"
      :default-checked-keys="authoritydata.authority"
      :props="{
        children: 'roleList',
        label: 'name'
      }"
    />
    <el-button @click="changeAuthority">确认修改</el-button>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, reactive, ref } from 'vue'
  import { authorityListRequest } from '@/request/api'
  import { InitAuthorityData } from '@/types/view/authority'
  import { ElTree } from 'element-plus'
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const treeRef = ref<InstanceType<typeof ElTree>>()
  const params: any = route.params
  const authoritydata = reactive(new InitAuthorityData(params.id, params.authority))

  const changeAuthority = () => {
    // console.log(treeRef.props.getCheckedKeys())
  }

  onMounted(() => {
    authorityListRequest().then((res) => {
      authoritydata.authorityList = res.data
    })
  })
</script>

<style lang="scss" scoped></style>
