<template>
  <div>
    <el-button v-permission="['admin']">admin</el-button>
    <el-button v-if="checkPermission(['admin'])">admin</el-button>
    <el-button v-if="checkPermission(['admin'])">{{
      zhangyue1 | zhangyue
    }}</el-button>
  </div>
</template>

<script>
import permission from '@/directives/permission/index.js' // 权限判断指令
import { checkPermission } from '@/utils/permission.js'
export default {
  directives: { permission },
  data() {
    return {
      zhangyue1: 'zhangyue'
    }
  },
  methods: {
    checkPermission
  }
}
</script>

<style lang="scss" scoped></style>
