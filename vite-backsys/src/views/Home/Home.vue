<template>
  <div class="home">
    <el-container>
      <el-header>
        <el-row :gutter="25">
          <el-col :span="4">
            <span>后台管理系统</span>
            <span>
              <!-- eslint-disable-next-line vue/attribute-hyphenation -->
              <svg-icon icon-name="icon-xiaoxiongmao" className="logo"> </svg-icon>
            </span>
          </el-col>
          <el-col :span="16"></el-col>
          <el-col :span="4"> <span class="logout" @click="logout">退出登录</span> </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            :default-active="localpath"
            text-color="#fff"
            router
          >
            <el-menu-item v-for="item in list" :key="item.path" :index="item.path">
              <span>{{ item.meta.title }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
  import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
  import { useRoute, useRouter } from 'vue-router'
  import localCache from '@/utils/cache'

  const router = useRouter()
  //过滤出有isshow的路由
  const list = router.getRoutes().filter((i) => i.meta.isShow)
  const localpath = useRoute()
  //退出登录
  const logout = () => {
    localCache.deleteCache('token')
    router.push('/login')
  }
</script>

<style lang="scss" scoped>
  .home {
    box-sizing: content-box;
    height: 100vh;
    width: 100vw;
    .el-header {
      height: 80px;
      background-color: #56766e;
      .el-row {
        box-sizing: content-box;
        height: 80px;
        width: 100vw;
        overflow: hidden;

        .logo {
          width: 100%;
          height: 80px;
        }

        .logout {
          text-align: center;
          height: 80px;
          line-height: 80px;
        }
      }
    }
    .el-aside {
      .el-menu {
        height: calc(100vh - 80px);
      }
    }
  }
</style>
