<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :title="dialogType === 'edit' ? 'Edit Role' : 'New Role'"
    @close="close"
    ref="dialog"
  >
    <el-form :model="role" label-width="80px" label-position="left">
      <el-form-item label="Name">
        <el-input v-model="role.name" placeholder="Role Name" />
      </el-form-item>
      <el-form-item label="Desc">
        <el-input
          v-model="role.description"
          :autosize="{ minRows: 2, maxRows: 4 }"
          type="textarea"
          placeholder="Role Description"
        />
      </el-form-item>
    </el-form>
    <div class="tree">
      <span class="tree_label">页面权限</span>
      <el-tree
        ref="tree"
        :check-strictly="checkStrictly"
        :data="routes"
        :props="defaultProps"
        show-checkbox
        node-key="path"
        :default-checked-keys="keyArr"
        :default-expanded-keys="keyArr"
        class="permission-tree"
      />
    </div>

    <div style="text-align:right;">
      <el-button type="danger" @click="dialogVisible = false">Cancel</el-button>
      <el-button type="primary" @click="confirmRole">Confirm</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { loading } from '@/utils/loading'
import { deepClone } from '@/utils'
import util from './mixins/util'
import { getRoutes, addRole, updateRole } from '@/api/role'

const defaultRole = {
  key: '',
  name: '',
  description: '',
  routes: []
}
export default {
  mixins: [util],
  props: {
    dialogType: {
      type: String,
      default: 'new'
    },
    editedRole: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      role: this.editedRole ? this.editedRole : Object.assign({}, defaultRole),
      routes: [],
      dialogVisible: false,
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      keyArr: []
    }
  },
  computed: {},
  created() {
    if (this.dialogType === 'edit') {
      this.keyArr = this.getKeyArr()
    }
    // Mock: get all routes and roles list from server
    // this.getRoles();
  },
  methods: {
    open() {
      // 优化，存一下，不用每次都发请求
      this.getRoutes().then(() => {
        this.dialogVisible = true
        // this.$nextTick(() => {
        //   // 这里为什么要用nextTick，因为当dialogVisible为true时，dialog进行第一次整个的dom更新，包括里面的树等，
        //   // 切记数据绑定(仅仅是将数据算出来了且绑定到对应组件)和(diff后的update)是不同时期的
        //   // 当dialog状态为编辑时，需要在dialog显示（第一次dom批量更新）之后的下一次循环将checkStrictly改为false
        //   this.dialogType === 'edit' ? (this.checkStrictly = false) : ''
        // })
      })
    },
    close() {
      this.remove()
    },
    //编辑状态下角色默认展开和选中的节点数组
    getKeyArr() {
      let { routes } = this.role
      if (routes.length) {
        return this.generateDefaultKey(routes)
      } else {
        return []
      }
    },
    getRoutes() {
      // 优化,可以将route存在store中
      return new Promise((resolve, reject) => {
        this.loading = loading({ fullscreen: true })
        getRoutes()
          .then(res => {
            this.serviceRoutes = res.routes
            this.routes = this.generateRoutes(res.routes)
            this.$nextTick(() => {
              // 以服务的方式调用的 Loading 需要异步关闭
              this.loading.close()
            })
            resolve()
          })
          .catch(_err => {
            console.log(_err)
          })
      })
    },
    // async confirmRole() {
    // }
    confirmRole() {
      //checkedKeys是复选框选中状态的节点，有对勾的，减号不是，减号仅仅是展开
      const checkedKeys = this.$refs.tree.getCheckedKeys()
      console.log(checkedKeys)
      this.role.routes = this.generateTree(
        deepClone(this.serviceRoutes),
        '/',
        checkedKeys
      )
      if (this.dialogType === 'new') {
        addRole(this.role)
          .then(res => {
            console.log(res)
          })
          .catch(_err => {
            console.log(_err)
          })
      } else {
        //这里是更新
        const { key: id } = this.role
        updateRole(id, this.role)
          .then(res => {
            console.log(res)
          })
          .catch(_err => {
            console.log(_err)
          })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
//因为放在form中会有抖动，所以我拿出来单独写的
.permission-tree {
  display: inline-block;
}
.tree_label {
  vertical-align: top;
  font-weight: 700;
}
</style>
