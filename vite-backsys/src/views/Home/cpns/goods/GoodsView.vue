<template>
  <div class="select-box">
    <!-- 搜索表单 -->
    <el-form :inline="true" :model="formdata.selectData" class="demo-form-inline">
      <el-form-item label="标题">
        <el-input v-model="formdata.selectData.title" placeholder="输入搜索关键字" />
      </el-form-item>
      <el-form-item label="详情">
        <el-input v-model="formdata.selectData.introduce" placeholder="输入搜索关键字" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 数据展示的table -->
    <el-table :data="formList.comList" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="title" label="标题" width="180" />
      <el-table-column prop="introduce" label="详情" />
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :total="formdata.selectData.count * 2"
      @current-change="currentChange"
      @size-change="sizeChange"
    />
  </div>
</template>

<script setup lang="ts">
  import { onMounted, reactive, computed, watch } from 'vue'
  import { InitData, ListInt } from '@/types/view/goodstype'
  import useStore from '@/store'
  import { storeToRefs } from 'pinia'

  const formdata = reactive(new InitData())
  const { goodsLists } = useStore()
  const { goodsdata } = storeToRefs(goodsLists)

  const currentChange = (page: number) => {
    formdata.selectData.page = page //所在页
  }
  const sizeChange = (pagesize: number) => {
    formdata.selectData.pagesize = pagesize //每页默认显示条数
  }
  //切割分页数据
  const formList = reactive({
    comList: computed(() => {
      //截取分页数据
      return formdata.list.slice(
        (formdata.selectData.page - 1) * formdata.selectData.pagesize,
        formdata.selectData.page * formdata.selectData.pagesize
      )
    })
  })
  /**搜索查询功能 */
  const onSubmit = () => {
    let arr: ListInt[] = [] //用来接收查询后展示的数据
    if (formdata.selectData.title || formdata.selectData.introduce) {
      //过滤
      if (formdata.selectData.title) {
        // 将过滤出的数组赋值给arr
        arr = formdata.list.filter((v) => {
          return v.title.indexOf(formdata.selectData.title) !== -1
        })
      }
      if (formdata.selectData.introduce) {
        // 将过滤出的数组赋值给arr
        arr = formdata.list.filter((v) => {
          return v.introduce.indexOf(formdata.selectData.introduce) !== -1
        })
      }
    } else {
      arr = formdata.list
    }
    formdata.selectData.count = arr.length
    formdata.list = arr
  }
  //监听输入框内容，如果没有，就返回初次加载的原始内容
  watch([() => formdata.selectData.title, () => formdata.selectData.introduce], () => {
    if (formdata.selectData.title == '' && formdata.selectData.introduce == '') {
      goodsLists.getgoodsLists() //执行获取数据函数
      formdata.list = goodsdata.value
      formdata.selectData.count = goodsdata.value.length //总条数为数据的长度
    }
  })

  onMounted(() => {
    goodsLists.getgoodsLists() //执行获取数据函数
    formdata.list = goodsdata.value
    formdata.selectData.count = goodsdata.value.length //总条数为数据的长度
    console.log(goodsdata)
    console.log('formdata.list', formdata.list)
    console.log(formdata.selectData.count)
  })
</script>

<style lang="scss" scoped></style>
