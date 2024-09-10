<script setup>
import { useUserStore } from '@/stores'

// import { createRouter } from 'vue-router'

const userStore = useUserStore()
// const router = createRouter()
</script>

<template>
  <router-view></router-view>
  <div>
    <el-button @click="userStore.setToken('ghfxfxfx')">设置token</el-button>
    <el-button @click="userStore.clearToken()">清除token</el-button>
    <br />
    {{ userStore.token }}
  </div>
</template>

<style scoped></style>
